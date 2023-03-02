document.addEventListener("DOMContentLoaded", async function () {
  var playerQuality = "360P";
  function getQuality(url) {
    const pattern = /\/([^/]+)$/; // regular expression to match the last segment of the URL
    const match = url.match(pattern);

    if (match) {
      return match[1]; // extract the matched quality segment
    } else {
      return playerQuality;
    }
  }
  // Extract the id from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (!id || /[';"]/g.test(id)) {
    window.location.replace("index.html");
  }
  // Fetch the detail data from the server
  const response = await fetch(`${BACKEND_URL}/v1/season2/${id}`);
  const json_data = await response.json();
  try {
    if (
      !json_data.data.sections.section ||
      json_data.data.sections.section.length < 1
    ) {
      window.location.href = "index.html";
    }
  } catch (error) {
    window.location.href = "index.html";
  }
  document.title = json_data.data.title + " - WIBU TV";
  // Update the page content with the detail data
  function getGenres() {
    const styles = json_data.data.details.styles;
    if (styles && styles.style && Array.isArray(styles.style)) {
      return styles.style.map((genre) => genre.title);
    } else if (json_data.data.details.union_info) {
      return json_data.data.details.union_info.slice(0, 3);
    } else {
      return [];
    }
  }

  const detailsContainer = document.getElementById("anime_detail");

  detailsContainer.innerHTML = `
    <div class="col-md-3">
      <img src="${BACKEND_URL}/image/${json_data.data.horizon_cover}" alt="${
    json_data.data.title
  }" class="img-fluid">
    </div>
    <div class="col-md-9">
      <h6 class="mb-3 text-light text-truncate">${json_data.data.title}</h6>
      ${getGenres()
        .map(
          (genre) => `<span class="badge bg-success mb-3 me-2">${genre}</span>`
        )
        .join("")}
        <span class="badge bg-danger mb-3 me-2"><i class="fa fa-eye me-2"></i>${
          json_data.data.stat.views
        }</span>
    </div>
    <div class="col-md-12">
      <p class="more-content text-secondary-emphasis text-truncate mt-3">
        <small>${json_data.data.details.desc.value}</small>
      </p>
      <a href="javascript:void(0)" class="show-more">Selengkapnya</a>
    </div>
  `;

  const buttonContainer = document.getElementById("episodes");
  const sectionData = json_data.data.sections.section;
  const maxButtonsPerPage = 30;
  let currentPage = 1;
  let totalEpisodes = 0;

  sectionData.forEach((section) => {
    if (section.ep_details && section.ep_details.length > 0) {
      totalEpisodes += section.ep_details.length;
    }
  });

  let totalPages = Math.ceil(totalEpisodes / maxButtonsPerPage);

  function updateButtons() {
    buttonContainer.innerHTML = "";
    let startIndex = (currentPage - 1) * maxButtonsPerPage;
    let endIndex = startIndex + maxButtonsPerPage;
    let currentButtonIndex = 0;

    for (let i = 0; i < sectionData.length; i++) {
      const section = sectionData[i];
      if (section.ep_details && section.ep_details.length > 0) {
        for (let j = 0; j < section.ep_details.length; j++) {
          if (
            currentButtonIndex >= startIndex &&
            currentButtonIndex < endIndex
          ) {
            const episode = section.ep_details[j];
            const button = document.createElement("button");
            button.classList.add(
              "btn",
              "btn-light",
              "btn-sm",
              "me-2",
              "mb-2",
              "d-flex"
            );
            button.setAttribute("data-episode", episode.episode_id);
            button.setAttribute("data-poster", episode.horizontal_cover);
            button.setAttribute("title", episode.long_title_display);
            button.textContent = episode.title;
            buttonContainer.appendChild(button);
          }
          currentButtonIndex++;
        }
      }
    }

    updatePagination();
  }

  function updatePagination() {
    const paginationContainer = document.getElementById("episodes_pagination");
    paginationContainer.innerHTML = "";

    const paginationCol = document.createElement("div");
    paginationCol.classList.add("col", "mx-auto", "text-center", "mt-3");
    paginationContainer.appendChild(paginationCol);

    const prevButton = document.createElement("button");
    prevButton.classList.add(
      "btn",
      "btn-primary",
      "btn-pagination",
      "btn-sm",
      "me-2"
    );
    prevButton.innerHTML = "Prev";
    if (currentPage === 1) {
      prevButton.style.display = "none";
    }
    prevButton.addEventListener("click", () => {
      currentPage--;
      updateButtons();
    });
    paginationCol.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.classList.add(
      "btn",
      "btn-primary",
      "btn-pagination",
      "btn-sm",
      "ms-2"
    );
    nextButton.innerHTML = "Next";
    if (currentPage === totalPages) {
      nextButton.style.display = "none";
    }
    nextButton.addEventListener("click", () => {
      currentPage++;
      updateButtons();
    });
    paginationCol.appendChild(nextButton);
  }

  updateButtons();

  const episodesContainer = document.getElementById("episodes");

  // get the first button element in the episodes list
  const firstButton = episodesContainer.querySelector("button");

  // get the episode_id value from the first button's data-episode attribute
  const defaultEpId = firstButton.getAttribute("data-episode");
  const defaultPoster = firstButton.getAttribute("data-poster");
  const getSubtitleType = async (episodeId) => {
    const response = await fetch(`${BACKEND_URL}/v1/subtitle/${episodeId}`);
    const text = await response.text();
    if (text.includes("WEBVTT")) {
      return "vtt";
    } else if (text.includes("WibuTv")) {
      return "ass";
    }
    return "vtt";
  };

  const updateMediaUrls = async (episodeId, episodePoster) => {
    const subtitleType = await getSubtitleType(episodeId);
    player.poster = `${BACKEND_URL}/image/${episodePoster}@720w_405h_1e_1c_90q.webp`;
    player.switchUrl(`${BACKEND_URL}/v1/video/${episodeId}/${playerQuality}`);
    player.subtitle.url = `${BACKEND_URL}/v1/subtitle/${episodeId}`;
    player.subtitle.type = subtitleType;
    console.log(episodePoster);
    audio.src = `${BACKEND_URL}/v1/audio/${episodeId}${playerQuality}`;
    audio.load();
  };

  const defaultSubType = await getSubtitleType(defaultEpId);
  const player = new Artplayer({
    container: ".artplayer-app",
    url: `${BACKEND_URL}/v1/video/${defaultEpId}/360P`,
    type: "m4s",
    poster: `${BACKEND_URL}/image/${defaultPoster}@720w_405h_1e_1c_90q.webp`,
    title: json_data.data.title,
    fullscreen: true,
    fullscreenWeb: true,
    miniProgressBar: true,
    mutex: true,
    autoPlayback: true,
    setting: true,
    playbackRate: true,
    aspectRatio: true,
    subtitleOffset: true,
    backdrop: true,
    playsInline: true,
    airplay: true,
    theme: "#ff0057",
    screenshot: true,
    lang: navigator.language.toLowerCase(),
    whitelist: ["*"],
    moreVideoAttr: {
      crossOrigin: "anonymous",
    },
    quality: [
      {
        html: "1080P (FHD)",
        url: `${BACKEND_URL}/v1/video/${defaultEpId}/1080FHD`,
      },
      {
        html: "1080P (HD)",
        url: `${BACKEND_URL}/v1/video/${defaultEpId}/1080HD`,
      },
      {
        html: "720P (HD)",
        url: `${BACKEND_URL}/v1/video/${defaultEpId}/720P`,
      },
      {
        html: "480P",
        url: `${BACKEND_URL}/v1/video/${defaultEpId}/480P`,
      },
      {
        default: true,
        html: "360P",
        url: `${BACKEND_URL}/v1/video/${defaultEpId}/360P`,
      },
    ],
    subtitle: {
      url: `${BACKEND_URL}/v1/subtitle/${defaultEpId}`,
      type: defaultSubType,
      style: {
        color: "#ffff",
        fontSize: "18px",
      },
      encoding: "utf-8",
    },
    layers: [
      {
        html: '<img width="150" src="/assets/img/logo2.png">',
        click: function () {
          window.open("https://github.com/namdevel");
          console.info("You clicked on the custom layer");
        },
        style: {
          position: "absolute",
          top: "20px",
          right: "20px",
          opacity: ".7",
        },
      },
    ],
    icons: {
      loading: '<img src="/assets/img/wibuload.gif">',
      state: '<img width="150" heigth="150" src="/assets/img/state.svg">',
      indicator: '<img width="16" heigth="16" src="/assets/img/indicator.svg">',
    },
  });
  const defaultAudio = "360P";
  const audio = new Audio(
    `${BACKEND_URL}/v1/audio/${defaultEpId}/${defaultAudio}`
  );

  player.on("video:loadeddata", () => {
    const audioURL = player.url.replace("video", "audio");
    playerQuality = getQuality(player.url);
    audio.src = audioURL;
  });

  player.on("play", () => {
    audio.play();
  });
  player.on("pause", () => {
    audio.pause();
  });
  player.on("seek", () => {
    audio.currentTime = player.currentTime;
  });

  player.on("video:timeupdate", () => {
    audio.currentTime = player.currentTime;
  });

  player.on("video:durationchange", () => {
    audio.currentTime = player.currentTime;
  });

  player.on("video:volumechange", () => {
    audio.volume = player.volume;
  });

  player.on("fullscreen", () => {
    player.subtitle.style({
      fontSize: "3vw",
      "margin-bottom": "30px",
    });
  });

  player.on("fullscreenWeb", () => {
    player.subtitle.style({
      fontSize: "3vw",
      "margin-bottom": "30px",
    });
  });

  episodesContainer.addEventListener("click", async (event) => {
    if (event.target.tagName === "BUTTON") {
      player.pause;
      player.poster = "/assets/img/default.jpg";
      player.loading.show = true;
      const episodeId = event.target.getAttribute("data-episode");
      const episodePoster = event.target.getAttribute("data-poster");
      await updateMediaUrls(episodeId, episodePoster);
      player.loading.show = false;
    }
  });
});

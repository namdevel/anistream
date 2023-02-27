document.addEventListener("DOMContentLoaded", async function () {
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
    player.poster = `${BACKEND_URL}/image/${episodePoster}`;
    player.switchUrl(`${BACKEND_URL}/v1/video/${episodeId}`);
    player.subtitle.url = `${BACKEND_URL}/v1/subtitle/${episodeId}`;
    player.subtitle.type = subtitleType;
    player.subtitle.encoding = "utf-8";
    console.log(subtitleType);
    audio.src = `${BACKEND_URL}/v1/audio/${episodeId}`;
    audio.load();
  };

  const defaultSubType = await getSubtitleType(defaultEpId);

  // Instantiate the video player
  const player = new Artplayer({
    container: ".artplayer-app",
    fullscreen: true,
    fullscreenWeb: true,
    pip: true,
    autoSize: true,
    autoMini: true,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    playsInline: true,
    poster: `${BACKEND_URL}/image/${json_data.data.horizon_cover}`,
    airplay: true,
    theme: "#23ade5",
    screenshot: true,
    whitelist: ["*"],
    subtitle: {
      url: `${BACKEND_URL}/v1/subtitle/${defaultEpId}`,
      type: defaultSubType,
      style: {
        color: "#ffff",
        fontSize: "18px",
      },
      encoding: "utf-8",
    },
    url: `${BACKEND_URL}/v1/video/${defaultEpId}`,
  });

  // Instantiate the audio player
  const audio = new Audio(`${BACKEND_URL}/v1/audio/${defaultEpId}`);

  // Synchronize the audio playback with the video playback
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

  // Add an event listener to the episodes container
  episodesContainer.addEventListener("click", async (event) => {
    // Check if the clicked element is a button
    if (event.target.tagName === "BUTTON") {
      // Get the episode ID from the data-episode attribute
      const episodeId = event.target.getAttribute("data-episode");
      const episodePoster = event.target.getAttribute("data-poster");
      await updateMediaUrls(episodeId, episodePoster);
    }
  });
});

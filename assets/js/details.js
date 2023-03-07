document.addEventListener("DOMContentLoaded", async function () {
  var playerQuality = "360P";
  var switchEpisodeId = "";
  var playURLnow = "";
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id || /[';"]/g.test(id)) {
    window.location.replace("index.html");
  }

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
  const detailsContainer = document.getElementById("anime_detail");
  var np,
    na,
    tt,
    tg,
    ts = "";

  if (
    typeof json_data !== "undefined" &&
    json_data !== null &&
    typeof json_data.data !== "undefined" &&
    json_data.data !== null &&
    typeof json_data.data.details !== "undefined" &&
    json_data.data.details !== null &&
    typeof json_data.data.details.information !== "undefined" &&
    json_data.data.details.information !== null &&
    typeof json_data.data.details.information[0] !== "undefined" &&
    json_data.data.details.information[0] !== null &&
    typeof json_data.data.details.information[0].value !== "undefined" &&
    json_data.data.details.information[0].value !== null
  ) {
    np = `<span class="text-secondary-emphasis">${json_data.data.details.information[0].field} : <em class="text-info">${json_data.data.details.information[0].value}</em></span><br>`;
  } else {
    np = "";
  }
  if (
    typeof json_data !== "undefined" &&
    json_data !== null &&
    typeof json_data.data !== "undefined" &&
    json_data.data !== null &&
    typeof json_data.data.details !== "undefined" &&
    json_data.data.details !== null &&
    typeof json_data.data.details.information !== "undefined" &&
    json_data.data.details.information !== null &&
    typeof json_data.data.details.information[1] !== "undefined" &&
    json_data.data.details.information[1] !== null &&
    typeof json_data.data.details.information[1].value !== "undefined" &&
    json_data.data.details.information[1].value !== null
  ) {
    na = `<span class="text-secondary-emphasis">${json_data.data.details.information[1].field} : <em class="text-info">${json_data.data.details.information[1].value}</em></span><br>`;
  } else {
    na = "";
  }
  if (
    typeof json_data !== "undefined" &&
    json_data !== null &&
    typeof json_data.data !== "undefined" &&
    json_data.data !== null &&
    typeof json_data.data.details !== "undefined" &&
    json_data.data.details !== null &&
    typeof json_data.data.details.union_info !== "undefined" &&
    json_data.data.details.union_info !== null &&
    typeof json_data.data.details.union_info[0] !== "undefined" &&
    json_data.data.details.union_info[0] !== null
  ) {
    let ttparse = json_data.data.details.union_info[0].split("|");
    ttparse = `${ttparse[0]} - ${ttparse[1]}`;
    tt = `<span class="text-secondary-emphasis">Kategori :<em class="text-info"> ${ttparse}</em></span>
    <br>`;
  } else {
    tt = "";
  }
  if (
    typeof json_data !== "undefined" &&
    json_data !== null &&
    typeof json_data.data !== "undefined" &&
    json_data.data !== null &&
    typeof json_data.data.details !== "undefined" &&
    json_data.data.details !== null &&
    typeof json_data.data.details.union_info !== "undefined" &&
    json_data.data.details.union_info !== null &&
    typeof json_data.data.details.union_info[1] !== "undefined" &&
    json_data.data.details.union_info[1] !== null
  ) {
    tg = `<span class="text-secondary-emphasis">Tanggal : <em class="text-info">${json_data.data.details.union_info[1]}</em></span>
    <br>`;
  } else {
    tg = "";
  }

  if (
    typeof json_data !== "undefined" &&
    json_data !== null &&
    typeof json_data.data !== "undefined" &&
    json_data.data !== null &&
    typeof json_data.data.details !== "undefined" &&
    json_data.data.details !== null &&
    typeof json_data.data.details.union_info !== "undefined" &&
    json_data.data.details.union_info !== null &&
    typeof json_data.data.details.union_info[2] !== "undefined" &&
    json_data.data.details.union_info[2] !== null
  ) {
    ts = `<span class="text-secondary-emphasis">Status : <em class="text-info">${json_data.data.details.union_info[2]}</em></span>
    <br>`;
  } else {
    ts = "";
  }

  detailsContainer.innerHTML = `
  <div class="col-md-3">
    <img src="${BACKEND_URL}/image/${
    json_data.data.horizon_cover
  }@720w_405h_1e_1c_90q.webp" alt="${json_data.data.title}" class="img-fluid">
  </div>
  <div class="col-md-9 gy-2">
    <h5 class="mb-1  text-truncate">${json_data.data.title}</h5>
    <p>
    ${np}
    ${na}
    ${tt}
    ${tg}
    ${ts}
    </p>
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

  updateButtons();

  const episodesContainer = document.getElementById("episodes");
  const currentPlayButton = episodesContainer.querySelector(".currentPlay");
  const episodeId = currentPlayButton.getAttribute("data-episode");
  const episodePoster = currentPlayButton.getAttribute("data-poster");

  if (switchEpisodeId !== "") {
    switchEpisodeId = switchEpisodeId;
  } else {
    switchEpisodeId = episodeId;
  }

  playURLnow = `${BACKEND_URL}/v1/video/${switchEpisodeId}/360P`;

  const defaultPoster = episodePoster;
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

  const defaultSubType = await getSubtitleType(switchEpisodeId);
  const defaultAudio = "360P";
  const audio = new Audio(
    `${BACKEND_URL}/v1/audio/${switchEpisodeId}/${defaultAudio}`
  );

  const player = new Artplayer({
    container: ".artplayer-app",
    url: playURLnow,
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
        url: `${BACKEND_URL}/v1/video/${switchEpisodeId}/1080FHD`,
      },
      {
        html: "1080P (HD)",
        url: `${BACKEND_URL}/v1/video/${switchEpisodeId}/1080HD`,
      },
      {
        html: "720P (HD)",
        url: `${BACKEND_URL}/v1/video/${switchEpisodeId}/720P`,
      },
      {
        html: "480P (SD)",
        url: `${BACKEND_URL}/v1/video/${switchEpisodeId}/480P`,
      },
      {
        default: true,
        html: "360P (SD)",
        url: `${BACKEND_URL}/v1/video/${switchEpisodeId}/360P`,
      },
    ],
    subtitle: {
      url: `${BACKEND_URL}/v1/subtitle/${switchEpisodeId}`,
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
          console.info("Go to https://github.com/namdevel");
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

  player.on("video:volumechange", () => {
    if (player.muted) {
      audio.muted = true;
    } else {
      audio.muted = false;
      audio.volume = player.volume;
    }
  });

  player.on("play", () => {
    if (playerQuality !== "360P") {
      audio.currentTime = player.currentTime;
      audio.play();
    }
  });

  player.on("pause", () => {
    if (playerQuality !== "360P" && !audio.paused) {
      audio.pause();
    }
  });

  player.on("video:pause", () => {
    if (playerQuality !== "360P" && !audio.paused) {
      audio.pause();
    }
  });

  player.on("seek", () => {
    if (playerQuality !== "360P") {
      audio.currentTime = player.currentTime;
    }
  });

  player.on("video:timeupdate", () => {
    if (playerQuality !== "360P") {
      audio.currentTime = player.currentTime;
    }
  });

  player.on("video:durationchange", () => {
    if (playerQuality !== "360P") {
      audio.currentTime = player.currentTime;
    }
  });

  player.on("video:volumechange", () => {
    if (playerQuality !== "360P") {
      audio.volume = player.volume;
    }
  });

  player.on("fullscreen", () => {
    if (player.fullscreen) {
      player.subtitle.style({
        fontSize: "3vw",
        "margin-bottom": "30px",
      });
    } else {
      player.subtitle.style({
        fontSize: "18px",
        "margin-bottom": "0px",
      });
    }
  });

  player.on("fullscreenWeb", () => {
    if (player.fullscreenWeb) {
      player.subtitle.style({
        fontSize: "3vw",
        "margin-bottom": "30px",
      });
    } else {
      player.subtitle.style({
        fontSize: "18px",
        "margin-bottom": "0px",
      });
    }
  });

  player.on("video:loadstart", () => {
    playerQuality = getQuality(player.url);
    playURLnow = `${BACKEND_URL}/v1/video/${switchEpisodeId}/${playerQuality}`;
    player.switchUrl(playURLnow);
    if (playerQuality == "360P") {
      const fullscreenControlX = document.querySelector(
        ".art-control-fullscreen"
      );

      if (fullscreenControlX) {
        var fullscreenControl = document.querySelector(
          ".art-control-fullscreen"
        );
        fullscreenControl.style.display = "none";
      } else {
        const artControlsRight = document.querySelector(".art-controls-right");
        const fullscreenControl = document.createElement("div");
        fullscreenControl.classList.add(
          "art-control",
          "art-control-fullscreen",
          "hint--rounded",
          "hint--top"
        );
        fullscreenControl.setAttribute("data-index", "70");
        fullscreenControl.setAttribute("aria-label", "Fullscreen");
        fullscreenControl.setAttribute("style", "display: none;");
        fullscreenControl.innerHTML =
          '<i class="art-icon art-icon-fullscreenOn" style="display: inline-flex;"><svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M625.778 256H768v142.222h113.778v-256h-256V256zM256 398.222V256h142.222V142.222h-256v256H256zm512 227.556V768H625.778v113.778h256v-256H768zM398.222 768H256V625.778H142.222v256h256V768z"></path></svg></i><i class="art-icon art-icon-fullscreenOff" style="display: none;"><svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M768 298.667h170.667V384h-256V128H768v170.667zM341.333 384h-256v-85.333H256V128h85.333v256zM768 725.333V896h-85.333V640h256v85.333H768zM341.333 640v256H256V725.333H85.333V640h256z"></path></svg></i>';
        artControlsRight.appendChild(fullscreenControl);
      }
    } else {
      var fullscreenControl = document.querySelector(".art-control-fullscreen");
      fullscreenControl.style.display = "block";
    }
    if (playerQuality !== "360P") {
      const audioURL = playURLnow.replace("video", "audio");
      audio.src = audioURL;
    }
  });

  const updateMediaUrls = async (episodeId, episodePoster) => {
    const subtitleType = await getSubtitleType(episodeId);
    player.poster = `${BACKEND_URL}/image/${episodePoster}@720w_405h_1e_1c_90q.webp`;
    player.switchUrl(
      `${BACKEND_URL}/v1/video/${switchEpisodeId}/${playerQuality}`
    );
    player.subtitle.url = `${BACKEND_URL}/v1/subtitle/${episodeId}`;
    player.subtitle.type = subtitleType;
    audio.src = `${BACKEND_URL}/v1/audio/${episodeId}/${playerQuality}`;
    audio.load();
  };

  episodesContainer.addEventListener("click", async (event) => {
    if (event.target.tagName === "BUTTON") {
      const currentPlayButton = document.querySelector(".currentPlay");
      if (currentPlayButton) {
        currentPlayButton.classList.remove("currentPlay");
        currentPlayButton.classList.remove("bg-success");
        currentPlayButton.classList.remove("text-white");
      }
      event.target.classList.add("currentPlay");
      event.target.classList.add("bg-success");
      event.target.classList.add("text-white");
      player.pause;
      player.poster = "/assets/img/default.jpg";
      player.loading.show = true;
      const episodeId = event.target.getAttribute("data-episode");
      const episodePoster = event.target.getAttribute("data-poster");
      switchEpisodeId = episodeId;
      playURLnow = `${BACKEND_URL}/v1/video/${switchEpisodeId}/${playerQuality}`;
      await updateMediaUrls(switchEpisodeId, episodePoster);
      player.loading.show = false;
    }
  });

  function getQuality(url) {
    const pattern = /\/([^/]+)$/;
    const match = url.match(pattern);

    if (match) {
      return match[1];
    } else {
      return playerQuality;
    }
  }

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
            if (currentButtonIndex === 0) {
              button.classList.add("currentPlay");
              button.classList.add("bg-success");
              button.classList.add("text-white");
            }
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

  /* eslint-disable no-unused-vars */
  /* 2023 - WibuTV */
});

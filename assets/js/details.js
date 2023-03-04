document.addEventListener("DOMContentLoaded", async function () {
  var t = "360P";
  const e = new URLSearchParams(window.location.search).get("id");
  (e && !/[';"]/g.test(e)) || window.location.replace("index.html");
  const n = await fetch(`${BACKEND_URL}/v1/season2/${e}`),
    a = await n.json();
  try {
    (!a.data.sections.section || a.data.sections.section.length < 1) &&
      (window.location.href = "index.html");
  } catch (t) {
    window.location.href = "index.html";
  }
  (document.title = a.data.title + " - WIBU TV"),
    (document.getElementById(
      "anime_detail"
    ).innerHTML = `\n    <div class="col-md-3">\n      <img src="${BACKEND_URL}/image/${
      a.data.horizon_cover
    }" alt="${
      a.data.title
    }" class="img-fluid">\n    </div>\n    <div class="col-md-9">\n      <h6 class="mb-3 text-truncate">${
      a.data.title
    }</h6>\n      ${(function () {
      const t = a.data.details.styles;
      return t && t.style && Array.isArray(t.style)
        ? t.style.map((t) => t.title)
        : a.data.details.union_info
        ? a.data.details.union_info.slice(0, 3)
        : [];
    })()
      .map((t) => `<span class="badge bg-success mb-3 me-2">${t}</span>`)
      .join(
        ""
      )}\n        <span class="badge bg-danger mb-3 me-2"><i class="fa fa-eye me-2"></i>${
      a.data.stat.views
    }</span>\n    </div>\n    <div class="col-md-12">\n      <p class="more-content text-secondary-emphasis text-truncate mt-3">\n        <small>${
      a.data.details.desc.value
    }</small>\n      </p>\n      <a href="javascript:void(0)" class="show-more">Selengkapnya</a>\n    </div>\n  `);
  const i = document.getElementById("episodes"),
    s = a.data.sections.section,
    l = 30;
  let o = 1,
    c = 0;
  s.forEach((t) => {
    t.ep_details && t.ep_details.length > 0 && (c += t.ep_details.length);
  });
  let d = Math.ceil(c / l);
  function r() {
    i.innerHTML = "";
    let t = (o - 1) * l,
      e = t + l,
      n = 0;
    for (let a = 0; a < s.length; a++) {
      const l = s[a];
      if (l.ep_details && l.ep_details.length > 0)
        for (let a = 0; a < l.ep_details.length; a++) {
          if (n >= t && n < e) {
            const t = l.ep_details[a],
              e = document.createElement("button");
            e.classList.add(
              "btn",
              "btn-light",
              "btn-sm",
              "me-2",
              "mb-2",
              "d-flex"
            ),
              e.setAttribute("data-episode", t.episode_id),
              e.setAttribute("data-poster", t.horizontal_cover),
              e.setAttribute("title", t.long_title_display),
              (e.textContent = t.title),
              i.appendChild(e);
          }
          n++;
        }
    }
    !(function () {
      const t = document.getElementById("episodes_pagination");
      t.innerHTML = "";
      const e = document.createElement("div");
      e.classList.add("col", "mx-auto", "text-center", "mt-3"),
        t.appendChild(e);
      const n = document.createElement("button");
      n.classList.add("btn", "btn-primary", "btn-pagination", "btn-sm", "me-2"),
        (n.innerHTML = "Prev"),
        1 === o && (n.style.display = "none");
      n.addEventListener("click", () => {
        o--, r();
      }),
        e.appendChild(n);
      const a = document.createElement("button");
      a.classList.add("btn", "btn-primary", "btn-pagination", "btn-sm", "ms-2"),
        (a.innerHTML = "Next"),
        o === d && (a.style.display = "none");
      a.addEventListener("click", () => {
        o++, r();
      }),
        e.appendChild(a);
    })();
  }
  r();
  const u = document.getElementById("episodes"),
    m = u.querySelector("button"),
    p = m.getAttribute("data-episode"),
    h = m.getAttribute("data-poster"),
    g = async (t) => {
      const e = await fetch(`${BACKEND_URL}/v1/subtitle/${t}`),
        n = await e.text();
      return n.includes("WEBVTT")
        ? "vtt"
        : n.includes("WibuTv")
        ? "ass"
        : "vtt";
    },
    v = await g(p),
    f = new Artplayer({
      container: ".artplayer-app",
      url: `${BACKEND_URL}/v1/video/${p}/360P`,
      type: "m4s",
      poster: `${BACKEND_URL}/image/${h}@720w_405h_1e_1c_90q.webp`,
      title: a.data.title,
      fullscreen: !0,
      fullscreenWeb: !0,
      miniProgressBar: !0,
      mutex: !0,
      autoPlayback: !0,
      setting: !0,
      playbackRate: !0,
      aspectRatio: !0,
      subtitleOffset: !0,
      backdrop: !0,
      playsInline: !0,
      airplay: !0,
      theme: "#ff0057",
      screenshot: !0,
      lang: navigator.language.toLowerCase(),
      whitelist: ["*"],
      moreVideoAttr: { crossOrigin: "anonymous" },
      quality: [
        { html: "1080P (FHD)", url: `${BACKEND_URL}/v1/video/${p}/1080FHD` },
        { html: "1080P (HD)", url: `${BACKEND_URL}/v1/video/${p}/1080HD` },
        { html: "720P (HD)", url: `${BACKEND_URL}/v1/video/${p}/720P` },
        { html: "480P (SD)", url: `${BACKEND_URL}/v1/video/${p}/480P` },
        {
          default: !0,
          html: "360P (SD)",
          url: `${BACKEND_URL}/v1/video/${p}/360P`,
        },
      ],
      subtitle: {
        url: `${BACKEND_URL}/v1/subtitle/${p}`,
        type: v,
        style: { color: "#ffff", fontSize: "18px" },
        encoding: "utf-8",
      },
      layers: [
        {
          html: '<img width="150" src="/assets/img/logo2.png">',
          click: function () {
            window.open("https://github.com/namdevel"),
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
        indicator:
          '<img width="16" heigth="16" src="/assets/img/indicator.svg">',
      },
    }),
    y = new Audio(`${BACKEND_URL}/v1/audio/${p}/360P`);
  f.on("video:loadeddata", () => {
    const e = f.url.replace("video", "audio");
    if (
      "360P" ==
      (t = (function (e) {
        const n = e.match(/\/([^/]+)$/);
        return n ? n[1] : t;
      })(f.url))
    ) {
      if (document.querySelector(".art-control-fullscreen")) {
        document.querySelector(".art-control-fullscreen").style.display =
          "none";
      } else {
        const t = document.querySelector(".art-controls-right"),
          e = document.createElement("div");
        e.classList.add(
          "art-control",
          "art-control-fullscreen",
          "hint--rounded",
          "hint--top"
        ),
          e.setAttribute("data-index", "70"),
          e.setAttribute("aria-label", "Fullscreen"),
          e.setAttribute("style", "display: none;"),
          (e.innerHTML =
            '<i class="art-icon art-icon-fullscreenOn" style="display: inline-flex;"><svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M625.778 256H768v142.222h113.778v-256h-256V256zM256 398.222V256h142.222V142.222h-256v256H256zm512 227.556V768H625.778v113.778h256v-256H768zM398.222 768H256V625.778H142.222v256h256V768z"></path></svg></i><i class="art-icon art-icon-fullscreenOff" style="display: none;"><svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M768 298.667h170.667V384h-256V128H768v170.667zM341.333 384h-256v-85.333H256V128h85.333v256zM768 725.333V896h-85.333V640h256v85.333H768zM341.333 640v256H256V725.333H85.333V640h256z"></path></svg></i>'),
          t.appendChild(e);
      }
    } else {
      document.querySelector(".art-control-fullscreen").style.display = "block";
    }
    y.src = e;
  }),
    f.on("play", () => {
      "360P" !== t && y.play();
    }),
    f.on("pause", () => {
      "360P" !== t && y.pause();
    }),
    f.on("seek", () => {
      "360P" !== t && (y.currentTime = f.currentTime);
    }),
    f.on("video:timeupdate", () => {
      "360P" !== t && (y.currentTime = f.currentTime);
    }),
    f.on("video:durationchange", () => {
      "360P" !== t && (y.currentTime = f.currentTime);
    }),
    f.on("video:volumechange", () => {
      "360P" !== t && (y.volume = f.volume);
    }),
    f.on("fullscreen", () => {
      f.subtitle.style({ fontSize: "3vw", "margin-bottom": "30px" });
    }),
    f.on("fullscreenWeb", () => {
      f.subtitle.style({ fontSize: "3vw", "margin-bottom": "30px" });
    }),
    u.addEventListener("click", async (e) => {
      if ("BUTTON" === e.target.tagName) {
        f.pause, (f.poster = "/assets/img/default.jpg"), (f.loading.show = !0);
        const n = e.target.getAttribute("data-episode"),
          a = e.target.getAttribute("data-poster");
        await (async (e, n) => {
          const a = await g(e);
          (f.poster = `${BACKEND_URL}/image/${n}@720w_405h_1e_1c_90q.webp`),
            f.switchUrl(`${BACKEND_URL}/v1/video/${e}/${t}`),
            (f.subtitle.url = `${BACKEND_URL}/v1/subtitle/${e}`),
            (f.subtitle.type = a),
            console.log(n),
            (y.src = `${BACKEND_URL}/v1/audio/${e}${t}`),
            y.load();
        })(n, a),
          (f.loading.show = !1);
      }
    });
});

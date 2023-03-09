document.addEventListener("DOMContentLoaded", async function () {
  var t = "360P",
    e = "",
    a = "";
  let i = new URLSearchParams(window.location.search),
    l = i.get("id");
  (!l || /[';"]/g.test(l)) && window.location.replace("index.html");
  let n = await fetch(`${BACKEND_URL}/v1/season2/${l}`),
    s = await n.json();
  try {
    (!s.data.sections.section || s.data.sections.section.length < 1) &&
      (window.location.href = "index.html");
  } catch (o) {
    window.location.href = "index.html";
  }
  document.title = s.data.title + " - WIBU TV";
  let d = document.getElementById("anime_detail");
  var r,
    c,
    u,
    m,
    $,
    p = "";
  if (
    ((r =
      null != s &&
      void 0 !== s.data &&
      null !== s.data &&
      void 0 !== s.data.details &&
      null !== s.data.details &&
      void 0 !== s.data.details.information &&
      null !== s.data.details.information &&
      void 0 !== s.data.details.information[0] &&
      null !== s.data.details.information[0] &&
      void 0 !== s.data.details.information[0].value &&
      null !== s.data.details.information[0].value
        ? `<span class="text-secondary-emphasis">${s.data.details.information[0].field} : <em class="text-info">${s.data.details.information[0].value}</em></span><br>`
        : ""),
    (c =
      null != s &&
      void 0 !== s.data &&
      null !== s.data &&
      void 0 !== s.data.details &&
      null !== s.data.details &&
      void 0 !== s.data.details.information &&
      null !== s.data.details.information &&
      void 0 !== s.data.details.information[1] &&
      null !== s.data.details.information[1] &&
      void 0 !== s.data.details.information[1].value &&
      null !== s.data.details.information[1].value
        ? `<span class="text-secondary-emphasis">${s.data.details.information[1].field} : <em class="text-info">${s.data.details.information[1].value}</em></span><br>`
        : ""),
    null != s &&
      void 0 !== s.data &&
      null !== s.data &&
      void 0 !== s.data.details &&
      null !== s.data.details &&
      void 0 !== s.data.details.union_info &&
      null !== s.data.details.union_info &&
      void 0 !== s.data.details.union_info[0] &&
      null !== s.data.details.union_info[0])
  ) {
    let v = s.data.details.union_info[0].split("|");
    u = `<span class="text-secondary-emphasis">Kategori :<em class="text-info"> ${(v = `${v[0]} - ${v[1]}`)}</em></span>
    <br>`;
  } else u = "";
  (m =
    null != s &&
    void 0 !== s.data &&
    null !== s.data &&
    void 0 !== s.data.details &&
    null !== s.data.details &&
    void 0 !== s.data.details.union_info &&
    null !== s.data.details.union_info &&
    void 0 !== s.data.details.union_info[1] &&
    null !== s.data.details.union_info[1]
      ? `<span class="text-secondary-emphasis">Tanggal : <em class="text-info">${s.data.details.union_info[1]}</em></span>
    <br>`
      : ""),
    ($ =
      null != s &&
      void 0 !== s.data &&
      null !== s.data &&
      void 0 !== s.data.details &&
      null !== s.data.details &&
      void 0 !== s.data.details.union_info &&
      null !== s.data.details.union_info &&
      void 0 !== s.data.details.union_info[2] &&
      null !== s.data.details.union_info[2]
        ? `<span class="text-secondary-emphasis">Status : <em class="text-info">${s.data.details.union_info[2]}</em></span>
    <br>`
        : ""),
    (p =
      null != s &&
      void 0 !== s.data &&
      null !== s.data &&
      void 0 !== s.data.info &&
      null !== s.data.info &&
      void 0 !== s.data.info.union_info &&
      null !== s.data.info.union_info &&
      void 0 !== s.data.info.union_info
        ? `<span class="badge bg-primary text-white mb-1">
    ${s.data.info.union_info.replace(" \xb7 ", " - ")}
    </span>
    <br>`
        : ""),
    (d.innerHTML = `
  <div class="col-md-3">
    <img src="${BACKEND_URL}/image/${
      s.data.horizon_cover
    }@720w_405h_1e_1c_90q.webp" alt="${s.data.title}" class="img-fluid">
  </div>
  <div class="col-md-9 gy-2">
    <h5 class="mb-1  text-truncate">${s.data.title}</h5>
    ${p}
    <p>
    ${r}
    ${c}
    ${u}
    ${m}
    ${$}
    </p>
    ${(function t() {
      let e = s.data.details.styles;
      return e && e.style && Array.isArray(e.style)
        ? e.style.map((t) => t.title)
        : [];
    })()
      .map((t) => `<span class="badge bg-success mb-3 me-2">${t}</span>`)
      .join("")}
  </div>
  <div class="col-md-12">
    <p class="more-content text-secondary-emphasis text-truncate mt-3">
      <small>${s.data.details.desc.value}</small>
    </p>
    <a href="javascript:void(0)" class="show-more">Selengkapnya</a>
  </div>
`);
  let f = document.getElementById("episodes"),
    h = s.data.sections.section,
    g = 1,
    b = 0;
  h.forEach((t) => {
    t.ep_details && t.ep_details.length > 0 && (b += t.ep_details.length);
  });
  let _ = Math.ceil(b / 30);
  (function t() {
    f.innerHTML = "";
    let e = (g - 1) * 30,
      a = e + 30,
      i = 0;
    for (let l = 0; l < h.length; l++) {
      let n = h[l];
      if (n.ep_details && n.ep_details.length > 0)
        for (let s = 0; s < n.ep_details.length; s++) {
          if (i >= e && i < a) {
            let o = n.ep_details[s],
              d = document.createElement("button");
            d.classList.add(
              "btn",
              "btn-light",
              "btn-sm",
              "me-2",
              "mb-2",
              "d-flex"
            ),
              d.setAttribute("data-episode", o.episode_id),
              d.setAttribute("data-poster", o.horizontal_cover),
              d.setAttribute("title", o.long_title_display),
              (d.textContent = o.title),
              f.appendChild(d),
              0 === i &&
                (d.classList.add("currentPlay"),
                d.classList.add("bg-success"),
                d.classList.add("text-white"));
          }
          i++;
        }
    }
    !(function e() {
      let a = document.getElementById("episodes_pagination");
      a.innerHTML = "";
      let i = document.createElement("div");
      i.classList.add("col", "mx-auto", "text-center", "mt-3"),
        a.appendChild(i);
      let l = document.createElement("button");
      l.classList.add("btn", "btn-primary", "btn-pagination", "btn-sm", "me-2"),
        (l.innerHTML = "Prev"),
        1 === g && (l.style.display = "none"),
        l.addEventListener("click", () => {
          g--, t();
        }),
        i.appendChild(l);
      let n = document.createElement("button");
      n.classList.add("btn", "btn-primary", "btn-pagination", "btn-sm", "ms-2"),
        (n.innerHTML = "Next"),
        g === _ && (n.style.display = "none"),
        n.addEventListener("click", () => {
          g++, t();
        }),
        i.appendChild(n);
    })();
  })();
  let y = document.getElementById("episodes"),
    w = y.querySelector(".currentPlay"),
    x = w.getAttribute("data-episode"),
    L = w.getAttribute("data-poster");
  "" !== e || (e = x), (a = `${BACKEND_URL}/v1/video/${e}/360P`);
  let P = async (t) => {
      let e = await fetch(`${BACKEND_URL}/v1/subtitle/${t}`),
        a = await e.text();
      if (a.includes("WEBVTT"));
      else if (a.includes("WibuTv")) return "ass";
      return "vtt";
    },
    H = await P(e),
    T = new Audio(`${BACKEND_URL}/v1/audio/${e}/360P`),
    V = new Artplayer({
      container: ".artplayer-app",
      url: a,
      type: "m4s",
      poster: `${BACKEND_URL}/image/${L}@720w_405h_1e_1c_90q.webp`,
      title: s.data.title,
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
        { html: "1080P (FHD)", url: `${BACKEND_URL}/v1/video/${e}/1080FHD` },
        { html: "1080P (HD)", url: `${BACKEND_URL}/v1/video/${e}/1080HD` },
        { html: "720P (HD)", url: `${BACKEND_URL}/v1/video/${e}/720P` },
        { html: "480P (SD)", url: `${BACKEND_URL}/v1/video/${e}/480P` },
        {
          default: !0,
          html: "360P (SD)",
          url: `${BACKEND_URL}/v1/video/${e}/360P`,
        },
      ],
      subtitle: {
        url: `${BACKEND_URL}/v1/subtitle/${e}`,
        type: H,
        style: { color: "#ffff", fontSize: "18px" },
        encoding: "utf-8",
      },
      layers: [
        {
          html: '<img width="150" src="/assets/img/logo2.png">',
          click: function () {
            window.open("https://github.com/namdevel"),
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
        indicator:
          '<img width="16" heigth="16" src="/assets/img/indicator.svg">',
      },
    });
  V.on("video:volumechange", () => {
    V.muted ? (T.muted = !0) : ((T.muted = !1), (T.volume = V.volume));
  }),
    V.on("play", () => {
      "360P" !== t && ((T.currentTime = V.currentTime), T.play());
    }),
    V.on("pause", () => {
      "360P" === t || T.paused || T.pause();
    }),
    V.on("video:pause", () => {
      "360P" === t || T.paused || T.pause();
    }),
    V.on("video:timeupdate", () => {
      "360P" !== t && (T.currentTime = V.currentTime);
    }),
    V.on("fullscreen", () => {
      V.fullscreen
        ? V.subtitle.style({ fontSize: "3vw", "margin-bottom": "30px" })
        : V.subtitle.style({ fontSize: "18px", "margin-bottom": "0px" });
    }),
    V.on("fullscreenWeb", () => {
      V.fullscreenWeb
        ? V.subtitle.style({ fontSize: "3vw", "margin-bottom": "30px" })
        : V.subtitle.style({ fontSize: "18px", "margin-bottom": "0px" });
    }),
    V.on("video:loadstart", () => {
      if (
        ((a = `${BACKEND_URL}/v1/video/${e}/${(t = (function e(a) {
          let i = a.match(/\/([^/]+)$/);
          return i ? i[1] : t;
        })(V.url))}`),
        V.switchUrl(a),
        "360P" == t)
      ) {
        let i = document.querySelector(".art-control-fullscreen");
        if (i) {
          var l = document.querySelector(".art-control-fullscreen");
          l.style.display = "none";
        } else {
          let n = document.querySelector(".art-controls-right"),
            s = document.createElement("div");
          s.classList.add(
            "art-control",
            "art-control-fullscreen",
            "hint--rounded",
            "hint--top"
          ),
            s.setAttribute("data-index", "70"),
            s.setAttribute("aria-label", "Fullscreen"),
            s.setAttribute("style", "display: none;"),
            (s.innerHTML =
              '<i class="art-icon art-icon-fullscreenOn" style="display: inline-flex;"><svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M625.778 256H768v142.222h113.778v-256h-256V256zM256 398.222V256h142.222V142.222h-256v256H256zm512 227.556V768H625.778v113.778h256v-256H768zM398.222 768H256V625.778H142.222v256h256V768z"></path></svg></i><i class="art-icon art-icon-fullscreenOff" style="display: none;"><svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M768 298.667h170.667V384h-256V128H768v170.667zM341.333 384h-256v-85.333H256V128h85.333v256zM768 725.333V896h-85.333V640h256v85.333H768zM341.333 640v256H256V725.333H85.333V640h256z"></path></svg></i>'),
            n.appendChild(s);
        }
      } else {
        var l = document.querySelector(".art-control-fullscreen");
        l.style.display = "block";
      }
      if ("360P" !== t) {
        let o = a.replace("video", "audio");
        T.src = o;
      }
    });
  let z = async (a, i) => {
    let l = await P(a);
    (V.poster = `${BACKEND_URL}/image/${i}@720w_405h_1e_1c_90q.webp`),
      V.switchUrl(`${BACKEND_URL}/v1/video/${e}/${t}`),
      (V.subtitle.url = `${BACKEND_URL}/v1/subtitle/${a}`),
      (V.subtitle.type = l),
      (T.src = `${BACKEND_URL}/v1/audio/${a}/${t}`),
      T.load();
  };
  y.addEventListener("click", async (i) => {
    if ("BUTTON" === i.target.tagName) {
      let l = document.querySelector(".currentPlay");
      l &&
        (l.classList.remove("currentPlay"),
        l.classList.remove("bg-success"),
        l.classList.remove("text-white")),
        i.target.classList.add("currentPlay"),
        i.target.classList.add("bg-success"),
        i.target.classList.add("text-white"),
        V.pause,
        (V.poster = "/assets/img/default.jpg"),
        (V.loading.show = !0);
      let n = i.target.getAttribute("data-episode"),
        s = i.target.getAttribute("data-poster");
      (a = `${BACKEND_URL}/v1/video/${(e = n)}/${t}`),
        await z(e, s),
        (V.loading.show = !1);
    }
  });
});

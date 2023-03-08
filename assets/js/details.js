document.addEventListener("DOMContentLoaded", async function () {
  var t = "360P",
    e = "",
    a = "";
  let i = new URLSearchParams(window.location.search),
    l = i.get("id");
  (!l || /[';"]/g.test(l)) && window.location.replace("index.html");
  let s = await fetch(`${BACKEND_URL}/v1/season2/${l}`),
    n = await s.json();
  try {
    (!n.data.sections.section || n.data.sections.section.length < 1) &&
      (window.location.href = "index.html");
  } catch (d) {
    window.location.href = "index.html";
  }
  document.title = n.data.title + " - WIBU TV";
  let o = document.getElementById("anime_detail");
  var r,
    c,
    u,
    m,
    $ = "";
  if (
    ((r =
      null != n &&
      void 0 !== n.data &&
      null !== n.data &&
      void 0 !== n.data.details &&
      null !== n.data.details &&
      void 0 !== n.data.details.information &&
      null !== n.data.details.information &&
      void 0 !== n.data.details.information[0] &&
      null !== n.data.details.information[0] &&
      void 0 !== n.data.details.information[0].value &&
      null !== n.data.details.information[0].value
        ? `<span class="text-secondary-emphasis">${n.data.details.information[0].field} : <em class="text-info">${n.data.details.information[0].value}</em></span><br>`
        : ""),
    (c =
      null != n &&
      void 0 !== n.data &&
      null !== n.data &&
      void 0 !== n.data.details &&
      null !== n.data.details &&
      void 0 !== n.data.details.information &&
      null !== n.data.details.information &&
      void 0 !== n.data.details.information[1] &&
      null !== n.data.details.information[1] &&
      void 0 !== n.data.details.information[1].value &&
      null !== n.data.details.information[1].value
        ? `<span class="text-secondary-emphasis">${n.data.details.information[1].field} : <em class="text-info">${n.data.details.information[1].value}</em></span><br>`
        : ""),
    null != n &&
      void 0 !== n.data &&
      null !== n.data &&
      void 0 !== n.data.details &&
      null !== n.data.details &&
      void 0 !== n.data.details.union_info &&
      null !== n.data.details.union_info &&
      void 0 !== n.data.details.union_info[0] &&
      null !== n.data.details.union_info[0])
  ) {
    let p = n.data.details.union_info[0].split("|");
    u = `<span class="text-secondary-emphasis">Kategori :<em class="text-info"> ${(p = `${p[0]} - ${p[1]}`)}</em></span>
    <br>`;
  } else u = "";
  (m =
    null != n &&
    void 0 !== n.data &&
    null !== n.data &&
    void 0 !== n.data.details &&
    null !== n.data.details &&
    void 0 !== n.data.details.union_info &&
    null !== n.data.details.union_info &&
    void 0 !== n.data.details.union_info[1] &&
    null !== n.data.details.union_info[1]
      ? `<span class="text-secondary-emphasis">Tanggal : <em class="text-info">${n.data.details.union_info[1]}</em></span>
    <br>`
      : ""),
    ($ =
      null != n &&
      void 0 !== n.data &&
      null !== n.data &&
      void 0 !== n.data.details &&
      null !== n.data.details &&
      void 0 !== n.data.details.union_info &&
      null !== n.data.details.union_info &&
      void 0 !== n.data.details.union_info[2] &&
      null !== n.data.details.union_info[2]
        ? `<span class="text-secondary-emphasis">Status : <em class="text-info">${n.data.details.union_info[2]}</em></span>
    <br>`
        : ""),
    (o.innerHTML = `
  <div class="col-md-3">
    <img src="${BACKEND_URL}/image/${
      n.data.horizon_cover
    }@720w_405h_1e_1c_90q.webp" alt="${n.data.title}" class="img-fluid">
  </div>
  <div class="col-md-9 gy-2">
    <h5 class="mb-1  text-truncate">${n.data.title}</h5>
    <p>
    ${r}
    ${c}
    ${u}
    ${m}
    ${$}
    </p>
    ${(function t() {
      let e = n.data.details.styles;
      return e && e.style && Array.isArray(e.style)
        ? e.style.map((t) => t.title)
        : n.data.details.union_info
        ? n.data.details.union_info.slice(0, 3)
        : [];
    })()
      .map((t) => `<span class="badge bg-success mb-3 me-2">${t}</span>`)
      .join("")}
      <span class="badge bg-danger mb-3 me-2"><i class="fa fa-eye me-2"></i>${
        n.data.stat.views
      }</span>
  </div>
  <div class="col-md-12">
    <p class="more-content text-secondary-emphasis text-truncate mt-3">
      <small>${n.data.details.desc.value}</small>
    </p>
    <a href="javascript:void(0)" class="show-more">Selengkapnya</a>
  </div>
`);
  let v = document.getElementById("episodes"),
    f = n.data.sections.section,
    h = 1,
    g = 0;
  f.forEach((t) => {
    t.ep_details && t.ep_details.length > 0 && (g += t.ep_details.length);
  });
  let b = Math.ceil(g / 30);
  (function t() {
    v.innerHTML = "";
    let e = (h - 1) * 30,
      a = e + 30,
      i = 0;
    for (let l = 0; l < f.length; l++) {
      let s = f[l];
      if (s.ep_details && s.ep_details.length > 0)
        for (let n = 0; n < s.ep_details.length; n++) {
          if (i >= e && i < a) {
            let d = s.ep_details[n],
              o = document.createElement("button");
            o.classList.add(
              "btn",
              "btn-light",
              "btn-sm",
              "me-2",
              "mb-2",
              "d-flex"
            ),
              o.setAttribute("data-episode", d.episode_id),
              o.setAttribute("data-poster", d.horizontal_cover),
              o.setAttribute("title", d.long_title_display),
              (o.textContent = d.title),
              v.appendChild(o),
              0 === i &&
                (o.classList.add("currentPlay"),
                o.classList.add("bg-success"),
                o.classList.add("text-white"));
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
        1 === h && (l.style.display = "none"),
        l.addEventListener("click", () => {
          h--, t();
        }),
        i.appendChild(l);
      let s = document.createElement("button");
      s.classList.add("btn", "btn-primary", "btn-pagination", "btn-sm", "ms-2"),
        (s.innerHTML = "Next"),
        h === b && (s.style.display = "none"),
        s.addEventListener("click", () => {
          h++, t();
        }),
        i.appendChild(s);
    })();
  })();
  let y = document.getElementById("episodes"),
    _ = y.querySelector(".currentPlay"),
    w = _.getAttribute("data-episode"),
    x = _.getAttribute("data-poster");
  "" !== e || (e = w), (a = `${BACKEND_URL}/v1/video/${e}/360P`);
  let L = async (t) => {
      let e = await fetch(`${BACKEND_URL}/v1/subtitle/${t}`),
        a = await e.text();
      if (a.includes("WEBVTT"));
      else if (a.includes("WibuTv")) return "ass";
      return "vtt";
    },
    P = await L(e),
    H = new Audio(`${BACKEND_URL}/v1/audio/${e}/360P`),
    T = new Artplayer({
      container: ".artplayer-app",
      url: a,
      type: "m4s",
      poster: `${BACKEND_URL}/image/${x}@720w_405h_1e_1c_90q.webp`,
      title: n.data.title,
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
        type: P,
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
  T.on("video:volumechange", () => {
    T.muted ? (H.muted = !0) : ((H.muted = !1), (H.volume = T.volume));
  }),
    T.on("play", () => {
      "360P" !== t && ((H.currentTime = T.currentTime), H.play());
    }),
    T.on("pause", () => {
      "360P" === t || H.paused || H.pause();
    }),
    T.on("video:pause", () => {
      "360P" === t || H.paused || H.pause();
    }),
    T.on("video:timeupdate", () => {
      "360P" !== t && (H.currentTime = T.currentTime);
    }),
    T.on("fullscreen", () => {
      T.fullscreen
        ? T.subtitle.style({ fontSize: "3vw", "margin-bottom": "30px" })
        : T.subtitle.style({ fontSize: "18px", "margin-bottom": "0px" });
    }),
    T.on("fullscreenWeb", () => {
      T.fullscreenWeb
        ? T.subtitle.style({ fontSize: "3vw", "margin-bottom": "30px" })
        : T.subtitle.style({ fontSize: "18px", "margin-bottom": "0px" });
    }),
    T.on("video:loadstart", () => {
      if (
        ((a = `${BACKEND_URL}/v1/video/${e}/${(t = (function e(a) {
          let i = a.match(/\/([^/]+)$/);
          return i ? i[1] : t;
        })(T.url))}`),
        T.switchUrl(a),
        "360P" == t)
      ) {
        let i = document.querySelector(".art-control-fullscreen");
        if (i) {
          var l = document.querySelector(".art-control-fullscreen");
          l.style.display = "none";
        } else {
          let s = document.querySelector(".art-controls-right"),
            n = document.createElement("div");
          n.classList.add(
            "art-control",
            "art-control-fullscreen",
            "hint--rounded",
            "hint--top"
          ),
            n.setAttribute("data-index", "70"),
            n.setAttribute("aria-label", "Fullscreen"),
            n.setAttribute("style", "display: none;"),
            (n.innerHTML =
              '<i class="art-icon art-icon-fullscreenOn" style="display: inline-flex;"><svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M625.778 256H768v142.222h113.778v-256h-256V256zM256 398.222V256h142.222V142.222h-256v256H256zm512 227.556V768H625.778v113.778h256v-256H768zM398.222 768H256V625.778H142.222v256h256V768z"></path></svg></i><i class="art-icon art-icon-fullscreenOff" style="display: none;"><svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M768 298.667h170.667V384h-256V128H768v170.667zM341.333 384h-256v-85.333H256V128h85.333v256zM768 725.333V896h-85.333V640h256v85.333H768zM341.333 640v256H256V725.333H85.333V640h256z"></path></svg></i>'),
            s.appendChild(n);
        }
      } else {
        var l = document.querySelector(".art-control-fullscreen");
        l.style.display = "block";
      }
      if ("360P" !== t) {
        let d = a.replace("video", "audio");
        H.src = d;
      }
    });
  let V = async (a, i) => {
    let l = await L(a);
    (T.poster = `${BACKEND_URL}/image/${i}@720w_405h_1e_1c_90q.webp`),
      T.switchUrl(`${BACKEND_URL}/v1/video/${e}/${t}`),
      (T.subtitle.url = `${BACKEND_URL}/v1/subtitle/${a}`),
      (T.subtitle.type = l),
      (H.src = `${BACKEND_URL}/v1/audio/${a}/${t}`),
      H.load();
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
        T.pause,
        (T.poster = "/assets/img/default.jpg"),
        (T.loading.show = !0);
      let s = i.target.getAttribute("data-episode"),
        n = i.target.getAttribute("data-poster");
      (a = `${BACKEND_URL}/v1/video/${(e = s)}/${t}`),
        await V(e, n),
        (T.loading.show = !1);
    }
  });
});

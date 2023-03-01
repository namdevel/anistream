document.addEventListener("DOMContentLoaded", async function () {
  const t = new URLSearchParams(window.location.search).get("id");
  (t && !/[';"]/g.test(t)) || window.location.replace("index.html");
  const e = await fetch(`${BACKEND_URL}/v1/season2/${t}`),
    n = await e.json();
  try {
    (!n.data.sections.section || n.data.sections.section.length < 1) &&
      (window.location.href = "index.html");
  } catch (t) {
    window.location.href = "index.html";
  }
  (document.title = n.data.title + " - WIBU TV"),
    (document.getElementById(
      "anime_detail"
    ).innerHTML = `\n    <div class="col-md-3">\n      <img src="${BACKEND_URL}/image/${
      n.data.horizon_cover
    }" alt="${
      n.data.title
    }" class="img-fluid">\n    </div>\n    <div class="col-md-9">\n      <h6 class="mb-3 text-light text-truncate">${
      n.data.title
    }</h6>\n      ${(function () {
      const t = n.data.details.styles;
      return t && t.style && Array.isArray(t.style)
        ? t.style.map((t) => t.title)
        : n.data.details.union_info
        ? n.data.details.union_info.slice(0, 3)
        : [];
    })()
      .map((t) => `<span class="badge bg-success mb-3 me-2">${t}</span>`)
      .join(
        ""
      )}\n        <span class="badge bg-danger mb-3 me-2"><i class="fa fa-eye me-2"></i>${
      n.data.stat.views
    }</span>\n    </div>\n    <div class="col-md-12">\n      <p class="more-content text-secondary-emphasis text-truncate mt-3">\n        <small>${
      n.data.details.desc.value
    }</small>\n      </p>\n      <a href="javascript:void(0)" class="show-more">Selengkapnya</a>\n    </div>\n  `);
  const a = document.getElementById("episodes"),
    i = n.data.sections.section,
    s = 30;
  let o = 1,
    l = 0;
  i.forEach((t) => {
    t.ep_details && t.ep_details.length > 0 && (l += t.ep_details.length);
  });
  let c = Math.ceil(l / s);
  function d() {
    a.innerHTML = "";
    let t = (o - 1) * s,
      e = t + s,
      n = 0;
    for (let s = 0; s < i.length; s++) {
      const o = i[s];
      if (o.ep_details && o.ep_details.length > 0)
        for (let i = 0; i < o.ep_details.length; i++) {
          if (n >= t && n < e) {
            const t = o.ep_details[i],
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
              a.appendChild(e);
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
        o--, d();
      }),
        e.appendChild(n);
      const a = document.createElement("button");
      a.classList.add("btn", "btn-primary", "btn-pagination", "btn-sm", "ms-2"),
        (a.innerHTML = "Next"),
        o === c && (a.style.display = "none");
      a.addEventListener("click", () => {
        o++, d();
      }),
        e.appendChild(a);
    })();
  }
  d();
  const r = document.getElementById("episodes"),
    m = r.querySelector("button"),
    u = m.getAttribute("data-episode"),
    p = m.getAttribute("data-poster"),
    g = async (t) => {
      const e = await fetch(`${BACKEND_URL}/v1/subtitle/${t}`),
        n = await e.text();
      return n.includes("WEBVTT")
        ? "vtt"
        : n.includes("WibuTv")
        ? "ass"
        : "vtt";
    },
    h = await g(u),
    b = new Artplayer({
      container: ".artplayer-app",
      url: `${BACKEND_URL}/v1/video/${u}`,
      type: "m4s",
      poster: `${BACKEND_URL}/image/${p}@720w_405h_1e_1c_90q.webp`,
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
      subtitle: {
        url: `${BACKEND_URL}/v1/subtitle/${u}`,
        type: h,
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
    y = new Audio(`${BACKEND_URL}/v1/audio/${u}`);
  b.on("play", () => {
    y.play();
  }),
    b.on("pause", () => {
      y.pause();
    }),
    b.on("seek", () => {
      y.currentTime = b.currentTime;
    }),
    b.on("video:timeupdate", () => {
      y.currentTime = b.currentTime;
    }),
    b.on("video:durationchange", () => {
      y.currentTime = b.currentTime;
    }),
    b.on("video:volumechange", () => {
      y.volume = b.volume;
    }),
    b.on("fullscreen", () => {
      b.subtitle.style({ fontSize: "3vw", "margin-bottom": "30px" });
    }),
    b.on("fullscreenWeb", () => {
      b.subtitle.style({ fontSize: "3vw", "margin-bottom": "30px" });
    }),
    r.addEventListener("click", async (t) => {
      if ("BUTTON" === t.target.tagName) {
        (b.loading.show = !0), (b.poster = "");
        const e = t.target.getAttribute("data-episode"),
          n = t.target.getAttribute("data-poster");
        await (async (t, e) => {
          const n = await g(t);
          (b.poster = `${BACKEND_URL}/image/${e}@720w_405h_1e_1c_90q.webp`),
            b.switchUrl(`${BACKEND_URL}/v1/video/${t}`),
            (b.subtitle.url = `${BACKEND_URL}/v1/subtitle/${t}`),
            (b.subtitle.type = n),
            console.log(e),
            (y.src = `${BACKEND_URL}/v1/audio/${t}`),
            y.load();
        })(e, n),
          (b.loading.show = !1);
      }
    });
});

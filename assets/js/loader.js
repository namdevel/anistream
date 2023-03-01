function render(e, t, n = "@405w_645h_1e_1c_90q.webp") {
  const a = document.querySelector(`#${e}`);
  let c;
  function i() {
    ((c = document.createElement("div")).className = "col mx-auto text-center"),
      (c.innerHTML =
        '\n        <div class="spinner-border" role="status">\n          <span class="visually-hidden">Loading...</span>\n        </div>\n      '),
      a.appendChild(c);
  }
  function l() {
    c && c.remove();
  }
  i(),
    (async function e() {
      try {
        const c = await fetch(`${BACKEND_URL}/v1/${t}`),
          s = await c.json();
        l();
        const o = s.items.map((e) => {
          const t = document.createElement("div");
          t.className = "col";
          const c = document.createElement("a");
          (c.href = `/details.html?id=${e.season_id}`),
            (c.className = "card h-100 d-flex");
          const i = document.createElement("div");
          i.className = "position-relative";
          const l = document.createElement("img");
          (l.src = `${BACKEND_URL}/image/${e.cover}${n}`),
            (l.className = "card-img-top"),
            (l.alt = e.title),
            (l.title = e.title),
            (l.loading = "lazy"),
            (l.style.cssText =
              "height: 100%; width: 100%; object-fit: cover; transition: opacity 0.2s ease-in-out;");
          const s = document.createElement("div");
          s.className = "position-absolute top-0 end-0 m-0";
          const o = document.createElement("div");
          (o.className = "badge rounded-pill bg-primary"),
            (o.style.transform = "scale(0.8)"),
            (o.innerText = e.subtitle);
          const d = document.createElement("div");
          d.className = "text-box";
          const r = document.createElement("p");
          (r.className = "title"), (r.title = e.title), (r.innerText = e.title);
          const m = document.createElement("p");
          return (
            (m.className = "hot-update-info"),
            (m.innerText = e.tag.text),
            a.appendChild(t),
            t.appendChild(c),
            c.appendChild(i),
            i.appendChild(l),
            i.appendChild(s),
            s.appendChild(o),
            c.appendChild(d),
            d.appendChild(r),
            d.appendChild(m),
            t
          );
        });
        (a.innerHTML = ""), a.append(...o);
      } catch (t) {
        l(),
          (function (t) {
            const n = document.createElement("div");
            (n.className = "col mx-auto text-center"),
              (n.innerHTML =
                '\n        <button type="button" class="btn btn-primary btn-reload">\n          <i class="fas fa-redo"></i> Click to reload.\n        </button>\n      '),
              a.appendChild(n),
              n.querySelector(".btn-reload").addEventListener("click", () => {
                (a.innerHTML = ""), i(), e();
              });
          })();
      }
    })();
}

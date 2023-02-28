function renderPaginated(e, t, n = 1) {
  const a = document.querySelector(`#${e}`);
  let c;
  function i() {
    ((c = document.createElement("div")).className = "col mx-auto text-center"),
      (c.innerHTML =
        '\n      <div class="spinner-border" role="status">\n        <span class="visually-hidden">Loading...</span>\n      </div>\n    '),
      a.appendChild(c);
  }
  function o() {
    c && c.remove();
  }
  async function d() {
    try {
      const c = await fetch(`${BACKEND_URL}/v1/season/${t}/${n}`),
        s = await c.json();
      o();
      const l = s.list.map((e) => {
        const t = document.createElement("div");
        t.className = "col";
        const n = document.createElement("a");
        (n.href = `/details.html?id=${e.season_id}`),
          (n.className = "card h-100 d-flex");
        const c = document.createElement("div");
        c.className = "position-relative";
        const i = document.createElement("img");
        (i.src = `${BACKEND_URL}/image/${e.cover}@720w_405h_1e_1c_90q.webp`),
          (i.className = "card-img-top"),
          (i.alt = e.title),
          (i.title = e.title),
          (i.loading = "lazy"),
          (i.style.cssText =
            "height: 100%; width: 100%; object-fit: cover; transition: opacity 0.2s ease-in-out;");
        const o = document.createElement("div");
        o.className = "position-absolute top-0 end-0 m-0";
        const d = document.createElement("div");
        (d.className = "badge rounded-pill bg-primary"),
          (d.style.transform = "scale(0.8)"),
          (d.innerText = e.index_show);
        const s = document.createElement("div");
        s.className = "text-box";
        const l = document.createElement("p");
        (l.className = "title"), (l.title = e.title), (l.innerText = e.title);
        const r = document.createElement("p");
        return (
          (r.className = "hot-update-info"),
          (r.innerText = e.order_type),
          a.appendChild(t),
          t.appendChild(n),
          n.appendChild(c),
          c.appendChild(i),
          c.appendChild(o),
          o.appendChild(d),
          n.appendChild(s),
          s.appendChild(l),
          s.appendChild(r),
          t
        );
      });
      (a.innerHTML = ""), a.append(...l);
      const r = document.createElement("div");
      if (((r.className = "col mx-auto text-center mt-3"), n > 1)) {
        const c = document.createElement("button");
        (c.type = "button"),
          (c.className = "btn btn-primary btn-pagination btn-sm me-2"),
          (c.innerText = "Prev"),
          c.addEventListener("click", () => {
            (a.innerHTML = ""), renderPaginated(e, t, n - 1);
          }),
          r.appendChild(c);
      }
      if (s.has_next) {
        const c = document.createElement("button");
        (c.type = "button"),
          (c.className = "btn btn-primary btn-pagination btn-sm ms-2"),
          (c.innerText = "Next"),
          c.addEventListener("click", () => {
            (a.innerHTML = ""), renderPaginated(e, t, n + 1);
          }),
          r.appendChild(c);
      } else {
        const e = document.createElement("p");
        (e.className = "text-muted"),
          (e.innerText = "No more data"),
          r.appendChild(e);
      }
      const m = document.querySelector("#index_pagination");
      (m.innerHTML = ""), m.appendChild(r);
    } catch (e) {
      o(),
        (function (e) {
          const t = document.createElement("div");
          (t.className = "row mt-3 ps-2 pe-2"),
            (t.innerHTML = `\n      <div class="col mx-auto text-center">\n        <button type="button" class="btn btn-primary btn-reload btn-sm">\n          <i class="fas fa-redo"></i> ${e}\n        </button>\n      </div>\n    `);
          const n = document.querySelector("#reload_container");
          (n.innerHTML = ""),
            n.appendChild(t),
            t.querySelector(".btn-reload").addEventListener("click", () => {
              (a.innerHTML = ""), i(), d();
            });
        })("Click to reload.");
    }
  }
  i(), d();
}

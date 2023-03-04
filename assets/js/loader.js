function render(e, t, n = "@405w_645h_1e_1c_90q.webp") {
  const a = document.querySelector(`#${e}`);
  let c;
  function i() {
    ((c = document.createElement("div")).className = "col mx-auto text-center"),
      (c.innerHTML =
        '\n        <div class="spinner-border" role="status">\n          <span class="visually-hidden">Loading...</span>\n        </div>\n      '),
      a.appendChild(c);
  }
  function o() {
    c && c.remove();
  }
  async function l() {
    try {
      const e = await fetch(`${BACKEND_URL}/${t}`),
        c = await e.json();
      o();
      const s = c.list.map((e) => {
        const t = document.createElement("div");
        t.className = "col";
        const c = document.createElement("a");
        (c.href = `/details.html?id=${e.season_id}`),
          (c.className = "card h-100 d-flex");
        const i = document.createElement("div");
        i.className = "position-relative";
        const o = document.createElement("img");
        (o.src = `${BACKEND_URL}/image/${e.cover}${n}`),
          (o.className = "card-img-top"),
          (o.alt = e.title),
          (o.title = e.title),
          (o.loading = "lazy"),
          (o.onerror = () => {
            o.src = `${BACKEND_URL}/image/${e.cover}@405w_645h_1e_1c_90q.webp`;
          }),
          (o.style.cssText =
            "height: 100%; width: 100%; object-fit: cover; transition: opacity 0.2s ease-in-out;");
        const l = document.createElement("div");
        l.className = "position-absolute top-0 end-0 m-0";
        const s = document.createElement("div");
        (s.className = "badge rounded-pill bg-primary"),
          (s.style.transform = "scale(0.8)"),
          (s.innerText = e.index_show ? e.index_show : e.subtitle);
        const d = document.createElement("div");
        d.className = "text-box";
        const r = document.createElement("p");
        return (
          (r.className = "title"),
          (r.title = e.title),
          (r.innerText = e.title),
          a.appendChild(t),
          t.appendChild(c),
          c.appendChild(i),
          i.appendChild(o),
          i.appendChild(l),
          l.appendChild(s),
          c.appendChild(d),
          d.appendChild(r),
          t
        );
      });
      (a.innerHTML = ""), a.append(...s);
    } catch (e) {
      console.error(`Failed to fetch anime list from ${t}`, e),
        o(),
        (function (e) {
          const t = document.createElement("div");
          (t.className = "col mx-auto text-center"),
            (t.innerHTML = `\n        <button type="button" class="btn btn-primary btn-reload">\n          <i class="fas fa-redo"></i> ${e}\n        </button>\n      `),
            a.appendChild(t),
            t.querySelector(".btn-reload").addEventListener("click", () => {
              (a.innerHTML = ""), i(), l();
            });
        })("Click to reload.");
    }
  }
  i(), l();
}

function render(e, t, n = "@405w_645h_1e_1c_90q.webp") {
  let l = document.querySelector(`#${e}`),
    a;
  function i() {
    ((a = document.createElement("div")).className = "col mx-auto text-center"),
      (a.innerHTML = `
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `),
      l.appendChild(a);
  }
  function r() {
    a && a.remove();
  }
  i(),
    (function e() {
      fetch(`${BACKEND_URL}/${t}`)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          r();
          let t = e.list.map((e) => {
            let t = document.createElement("div");
            t.className = "col";
            let a = document.createElement("a");
            (a.href = `/details.html?id=${e.season_id}`),
              (a.className = "card h-100 d-flex");
            let i = document.createElement("div");
            i.className = "position-relative";
            let r = document.createElement("img");
            (r.src = `${BACKEND_URL}/image/${e.cover}${n}`),
              (r.className = "card-img-top"),
              (r.alt = e.title),
              (r.title = e.title),
              (r.loading = "lazy"),
              (r.onerror = () => {
                r.src = `${BACKEND_URL}/image/${e.cover}@405w_645h_1e_1c_90q.webp`;
              }),
              (r.style.cssText =
                "height: 100%; width: 100%; object-fit: cover; transition: opacity 0.2s ease-in-out;");
            let c = document.createElement("div");
            c.className = "position-absolute top-0 end-0 m-0";
            let s = document.createElement("div");
            (s.className = "badge rounded-pill bg-primary"),
              (s.style.transform = "scale(0.8)"),
              (s.innerText = e.index_show ?? e.subtitle);
            let d = document.createElement("div");
            d.className = "text-box";
            let o = document.createElement("p");
            return (
              (o.className = "title"),
              (o.title = e.title),
              (o.innerText = e.title),
              l.appendChild(t),
              t.appendChild(a),
              a.appendChild(i),
              i.appendChild(r),
              i.appendChild(c),
              c.appendChild(s),
              a.appendChild(d),
              d.appendChild(o),
              t
            );
          });
          (l.innerHTML = ""), l.append(...t);
        })
        .catch(function (n) {
          console.error(`Failed to fetch anime list from ${t}`, n),
            r(),
            (function t(n) {
              let a = document.createElement("div");
              (a.className = "col mx-auto text-center"),
                (a.innerHTML = `
        <button type="button" class="btn btn-primary btn-reload">
          <i class="fas fa-redo"></i> ${n}
        </button>
      `),
                l.appendChild(a);
              let r = a.querySelector(".btn-reload");
              r.addEventListener("click", () => {
                (l.innerHTML = ""), i(), e();
              });
            })("Click to reload.");
        });
    })();
}

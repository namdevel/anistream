function renderPaginated(e, t, n = 1) {
  let a = document.querySelector(`#${e}`),
    i;
  function l() {
    ((i = document.createElement("div")).className = "col mx-auto text-center"),
      (i.innerHTML = `
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `),
      a.appendChild(i);
  }
  function r() {
    i && i.remove();
  }
  l(),
    (function i() {
      fetch(`${BACKEND_URL}/${t}/semua/hot/${n}`)
        .then(function (e) {
          return e.json();
        })
        .then(function (i) {
          r();
          let l = i.list.map((e) => {
            let t = document.createElement("div");
            t.className = "col";
            let n = document.createElement("a");
            (n.href = `/details.html?id=${e.season_id}`),
              (n.className = "card h-100 d-flex");
            let i = document.createElement("div");
            i.className = "position-relative";
            let l = document.createElement("img");
            (l.src = `${BACKEND_URL}/image/${e.cover}@720w_405h_1e_1c_90q.webp`),
              (l.className = "card-img-top"),
              (l.alt = e.title),
              (l.title = e.title),
              (l.loading = "lazy"),
              (l.onerror = () => {
                l.src = `${BACKEND_URL}/image/${e.cover}@405w_645h_1e_1c_90q.webp`;
              }),
              (l.style.cssText =
                "height: 100%; width: 100%; object-fit: cover; transition: opacity 0.2s ease-in-out;");
            let r = document.createElement("div");
            r.className = "position-absolute top-0 end-0 m-0";
            let d = document.createElement("div");
            (d.className = "badge rounded-pill bg-primary"),
              (d.style.transform = "scale(0.8)"),
              (d.innerText = e.index_show);
            let s = document.createElement("div");
            s.className = "text-box";
            let c = document.createElement("p");
            (c.className = "title"),
              (c.title = e.title),
              (c.innerText = e.title);
            let o = document.createElement("p");
            return (
              (o.className = "hot-update-info"),
              (o.innerText = e.order_type),
              a.appendChild(t),
              t.appendChild(n),
              n.appendChild(i),
              i.appendChild(l),
              i.appendChild(r),
              r.appendChild(d),
              n.appendChild(s),
              s.appendChild(c),
              s.appendChild(o),
              t
            );
          });
          (a.innerHTML = ""), a.append(...l);
          let d = document.createElement("div");
          if (((d.className = "col mx-auto text-center mt-3"), n > 1)) {
            let s = document.createElement("button");
            (s.type = "button"),
              (s.className = "btn btn-primary btn-pagination btn-sm me-2"),
              (s.innerText = "Prev"),
              s.addEventListener("click", () => {
                (a.innerHTML = ""), renderPaginated(e, t, n - 1);
              }),
              d.appendChild(s);
          }
          if (i.has_next) {
            let c = document.createElement("button");
            (c.type = "button"),
              (c.className = "btn btn-primary btn-pagination btn-sm ms-2"),
              (c.innerText = "Next"),
              c.addEventListener("click", () => {
                (a.innerHTML = ""), renderPaginated(e, t, n + 1);
              }),
              d.appendChild(c);
          } else {
            let o = document.createElement("p");
            (o.className = "text-muted"),
              (o.innerText = "No more data"),
              d.appendChild(o);
          }
          let p = document.querySelector("#index_pagination");
          (p.innerHTML = ""), p.appendChild(d);
        })
        .catch(function (e) {
          r(),
            (function e(t) {
              let n = document.createElement("div");
              (n.className = "row mt-3 ps-2 pe-2"),
                (n.innerHTML = `
      <div class="col mx-auto text-center">
        <button type="button" class="btn btn-primary btn-reload btn-sm">
          <i class="fas fa-redo"></i> ${t}
        </button>
      </div>
    `);
              let r = document.querySelector("#reload_container");
              (r.innerHTML = ""), r.appendChild(n);
              let d = n.querySelector(".btn-reload");
              d.addEventListener("click", () => {
                (a.innerHTML = ""), l(), i();
              });
            })("Click to reload.");
        });
    })();
}

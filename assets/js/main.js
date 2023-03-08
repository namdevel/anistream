$(function () {
  render("rekomendasi_anime", "rekomendasi"),
    render("anime_terbaru", "terbaru", "@720w_405h_1e_1c_90q.webp"),
    renderPaginated("index_anime", "index");
});

const animeLinks = document.querySelectorAll("#index_anime a");
animeLinks.forEach((e) => {
  e.addEventListener("click", (t) => {
    t.preventDefault();
    let a = e.dataset.animeId,
      s = e.dataset.animeTitle,
      l = `WibuTV - ${s}`;
    e.setAttribute("href", `/detail.html?id=${a}`),
      e.setAttribute("data-anime-title", l);
  });
});
const toggle = document.querySelector("#theme-toggle"),
  link = document.querySelector("#data-theme"),
  table_tayang = document.querySelector("#table_tayang"),
  theme = localStorage.getItem("theme"),
  table_search = document.querySelector("#table_cok");
"dark" === theme &&
  (toggle.classList.add("active"),
  (link.href = "/assets/css/dark.css"),
  document.body.classList.add("dark-mode"),
  table_tayang.classList.remove("table-light"),
  table_tayang.classList.add("table-dark"),
  table_search.classList.remove("table-light"),
  table_search.classList.add("table-dark")),
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active"),
      toggle.classList.contains("active")
        ? ((link.href = "/assets/css/dark.css"),
          document.body.classList.add("dark-mode"),
          table_tayang.classList.remove("table-light"),
          table_tayang.classList.add("table-dark"),
          table_search.classList.remove("table-light"),
          table_search.classList.add("table-dark"),
          localStorage.setItem("theme", "dark"))
        : ((link.href = "/assets/css/light.css"),
          document.body.classList.remove("dark-mode"),
          table_tayang.classList.remove("table-dark"),
          table_tayang.classList.add("table-light"),
          table_search.classList.remove("table-dark"),
          table_search.classList.add("table-light"),
          localStorage.setItem("theme", "light"));
  });

const commitUrlElement = document.getElementById("commitUrl"),
  commitShaElement = document.getElementById("commitSha");
fetch("https://api.github.com/repos/namdevel/anistream/commits/main")
  .then((e) => e.json())
  .then((e) => {
    let t = e.sha,
      a = `https://github.com/namdevel/anistream/commit/${t}`;
    (commitUrlElement.href = a),
      (commitShaElement.innerHTML =
        '<i class="fa-solid fa-code-branch me-1"></i>' + t);
  })
  .catch((e) => console.error(e));

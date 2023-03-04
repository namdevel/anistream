$(function () {
  render("rekomendasi_anime", "rekomendasi"),
    render("anime_terbaru", "terbaru", "@720w_405h_1e_1c_90q.webp"),
    renderPaginated("index_anime", "index");
});
const animeLinks = document.querySelectorAll("#index_anime a");
animeLinks.forEach((e) => {
  e.addEventListener("click", (t) => {
    t.preventDefault();
    const a = e.dataset.animeId,
      s = `WibuTV - ${e.dataset.animeTitle}`;
    e.setAttribute("href", `/detail.html?id=${a}`),
      e.setAttribute("data-anime-title", s);
  });
});
const toggle = document.querySelector("#theme-toggle"),
  link = document.querySelector("#data-theme"),
  table_tayang = document.querySelector("#table_tayang"),
  theme = localStorage.getItem("theme");
"dark" === theme &&
  (toggle.classList.add("active"),
  (link.href = "/assets/css/dark.css"),
  document.body.classList.add("dark-mode"),
  table_tayang.classList.remove("table-light"),
  table_tayang.classList.add("table-dark")),
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active"),
      toggle.classList.contains("active")
        ? ((link.href = "/assets/css/dark.css"),
          document.body.classList.add("dark-mode"),
          table_tayang.classList.remove("table-light"),
          table_tayang.classList.add("table-dark"),
          localStorage.setItem("theme", "dark"))
        : ((link.href = "/assets/css/light.css"),
          document.body.classList.remove("dark-mode"),
          table_tayang.classList.remove("table-dark"),
          table_tayang.classList.add("table-light"),
          localStorage.setItem("theme", "light"));
  });

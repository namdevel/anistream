$(function () {
  render("rekomendasi_anime", "rekomendasi");
  render("anime_terbaru", "terbaru", "@720w_405h_1e_1c_90q.webp");
  renderPaginated("index_anime", "index");
});

const animeLinks = document.querySelectorAll("#index_anime a");

animeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const animeId = link.dataset.animeId;
    const animeTitle = link.dataset.animeTitle;
    const pageTitle = `WibuTV - ${animeTitle}`;
    link.setAttribute("href", `/detail.html?id=${animeId}`);
    link.setAttribute("data-anime-title", pageTitle);
  });
});

const toggle = document.querySelector("#theme-toggle");
const link = document.querySelector("#data-theme");
const table_tayang = document.querySelector("#table_tayang");
const theme = localStorage.getItem("theme");
const table_search = document.querySelector("#table_cok");

if (theme === "dark") {
  toggle.classList.add("active");
  link.href = "/assets/css/dark.css";
  document.body.classList.add("dark-mode");
  table_tayang.classList.remove("table-light");
  table_tayang.classList.add("table-dark");
  table_search.classList.remove("table-light");
  table_search.classList.add("table-dark");
}

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  if (toggle.classList.contains("active")) {
    link.href = "/assets/css/dark.css";
    document.body.classList.add("dark-mode");
    table_tayang.classList.remove("table-light");
    table_tayang.classList.add("table-dark");
    table_search.classList.remove("table-light");
    table_search.classList.add("table-dark");
    localStorage.setItem("theme", "dark");
  } else {
    link.href = "/assets/css/light.css";
    document.body.classList.remove("dark-mode");
    table_tayang.classList.remove("table-dark");
    table_tayang.classList.add("table-light");
    table_search.classList.remove("table-dark");
    table_search.classList.add("table-light");
    localStorage.setItem("theme", "light");
  }
});

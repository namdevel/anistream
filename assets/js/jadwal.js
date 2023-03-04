fetch(`${BACKEND_URL}/jadwal`)
  .then((e) => e.json())
  .then((e) => {
    const t = document.querySelector("#release-dates"),
      a = document.querySelector("#datajadwal tbody"),
      n = new Date(),
      r = `${
        [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ][n.getMonth()]
      } ${n.getFullYear()}`;
    let s = null;
    e.data.slice(6).forEach((e, n) => {
      const d = e.date,
        i = e.day_of_week,
        o = e.episodes,
        c = document.createElement("button");
      e.is_today && 1 === e.is_today
        ? c.classList.add(
            "btn",
            "btn-success",
            "btn-sm",
            "btn-no-caret",
            "index-jadwal"
          )
        : c.classList.add("btn", "btn-light", "btn-sm", "btn-no-caret"),
        c.setAttribute("type", "button"),
        c.setAttribute("data-date", d),
        c.setAttribute("data-day-of-week", i),
        (c.innerText = `${getDayOfWeekString(i)}, ${d} ${r}`),
        t.appendChild(c),
        0 === n && (s = c),
        c.addEventListener("click", () => {
          (a.innerHTML = ""),
            o &&
              o.length > 0 &&
              o.forEach((e) => {
                const { pub_time: t, pub_index: n, title: r, season_id: s } = e,
                  d = document.createElement("tr"),
                  i = document.createElement("td");
                (i.innerHTML =
                  "<span class='badge rounded-pill bg-primary'>" +
                  t +
                  " WIB</span>"),
                  d.appendChild(i);
                const o = document.createElement("td"),
                  c = r.length > 30 ? r.substring(0, 30) + "..." : r;
                (o.innerHTML =
                  "<a href='/details.html?id=" + s + "'>" + c + "</a>"),
                  d.appendChild(o);
                const l = document.createElement("td");
                l.classList.add("text-center"),
                  (l.innerHTML =
                    "<span class='badge rounded-pill bg-danger'>" +
                    n +
                    "</span>"),
                  d.appendChild(l),
                  a.appendChild(d);
              });
        });
    }),
      s && s.click();
  });
const releaseDatesContainer = document.querySelector(
  "#release-dates-container"
);
let startX,
  scrollLeft,
  isDragging = !1;
function getDayOfWeekString(e) {
  switch (e) {
    case 1:
      return "Senin";
    case 2:
      return "Selasa";
    case 3:
      return "Rabu";
    case 4:
      return "Kamis";
    case 5:
      return "Jumat";
    case 6:
      return "Sabtu";
    case 7:
      return "Minggu";
    default:
      return "";
  }
}
function updateClock() {
  const e = new Date(),
    t = `${e.getHours().toString().padStart(2, "0")}:${e
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${e.getSeconds().toString().padStart(2, "0")}`;
  document.querySelector("#jam").innerHTML =
    "<i class='fa fa-clock'></i> Waktu sekarang: " + t;
}
document.addEventListener("mousedown", (e) => {
  e.target.closest("#release-dates-container") &&
    (e.preventDefault(),
    (isDragging = !0),
    (startX = e.pageX - releaseDatesContainer.offsetLeft),
    (scrollLeft = releaseDatesContainer.scrollLeft));
}),
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const t = 1.5 * (e.pageX - releaseDatesContainer.offsetLeft - startX);
    releaseDatesContainer.scrollLeft = scrollLeft - t;
  }),
  document.addEventListener("mouseup", () => {
    isDragging = !1;
  }),
  setInterval(updateClock, 1e3);

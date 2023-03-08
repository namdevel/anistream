fetch(`${BACKEND_URL}/jadwal`)
  .then((e) => e.json())
  .then((e) => {
    let t = document.querySelector("#release-dates"),
      a = document.querySelector("#datajadwal tbody"),
      n = new Date(),
      r = [
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
      ],
      s = r[n.getMonth()],
      l = n.getFullYear(),
      i = `${s} ${l}`,
      d = null;
    e.data.slice(6).forEach((e, n) => {
      let r = e.date,
        s = e.day_of_week,
        l = e.episodes,
        o = document.createElement("button");
      e.is_today && 1 === e.is_today
        ? o.classList.add(
            "btn",
            "btn-success",
            "btn-sm",
            "btn-no-caret",
            "index-jadwal"
          )
        : o.classList.add("btn", "btn-light", "btn-sm", "btn-no-caret"),
        o.setAttribute("type", "button"),
        o.setAttribute("data-date", r),
        o.setAttribute("data-day-of-week", s),
        (o.innerText = `${getDayOfWeekString(s)}, ${r} ${i}`),
        t.appendChild(o),
        0 === n && (d = o),
        o.addEventListener("click", () => {
          (a.innerHTML = ""),
            l &&
              l.length > 0 &&
              l.forEach((e) => {
                let { pub_time: t, pub_index: n, title: r, season_id: s } = e,
                  l = document.createElement("tr"),
                  i = document.createElement("td");
                (i.innerHTML =
                  "<span class='badge rounded-pill bg-primary'>" +
                  t +
                  " WIB</span>"),
                  l.appendChild(i);
                let d = document.createElement("td"),
                  o = r.length > 30 ? r.substring(0, 30) + "..." : r;
                (d.innerHTML =
                  "<a href='/details.html?id=" + s + "'>" + o + "</a>"),
                  l.appendChild(d);
                let c = document.createElement("td");
                c.classList.add("text-center"),
                  (c.innerHTML =
                    "<span class='badge rounded-pill bg-danger'>" +
                    n +
                    "</span>"),
                  l.appendChild(c),
                  a.appendChild(l);
              });
        });
    }),
      d && d.click();
  });
const releaseDatesContainer = document.querySelector(
  "#release-dates-container"
);
let isDragging = !1,
  startX,
  scrollLeft;
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
  let e = new Date(),
    t = e.getHours().toString().padStart(2, "0"),
    a = e.getMinutes().toString().padStart(2, "0"),
    n = e.getSeconds().toString().padStart(2, "0"),
    r = `${t}:${a}:${n}`;
  document.querySelector("#jam").innerHTML =
    "<i class='fa fa-clock'></i> Waktu sekarang: " + r;
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
    let t = e.pageX - releaseDatesContainer.offsetLeft,
      a = (t - startX) * 1.5;
    releaseDatesContainer.scrollLeft = scrollLeft - a;
  }),
  document.addEventListener("mouseup", () => {
    isDragging = !1;
  }),
  setInterval(updateClock, 1e3);

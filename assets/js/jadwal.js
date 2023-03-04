fetch(`${BACKEND_URL}/jadwal`)
  .then((response) => response.json())
  .then((result) => {
    // Get the release dates container
    const releaseDatesGroup = document.querySelector("#release-dates");
    const dataJadwalTbody = document.querySelector("#datajadwal tbody");
    const today = new Date(); // get current date
    const monthNames = [
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
    ];
    const month = monthNames[today.getMonth()]; // get month name from array
    const year = today.getFullYear(); // get year
    const todayMonth = `${month} ${year}`; // concatenate month and year
    let firstButton = null;
    // Loop through the data array and create a button for each date
    result.data.slice(6).forEach((item, index) => {
      // Extract the date and day_of_week values
      const date = item.date;
      const dayOfWeek = item.day_of_week;
      const episodes = item.episodes;

      // Create a button element
      const button = document.createElement("button");
      if (item.is_today && item.is_today === 1) {
        button.classList.add(
          "btn",
          "btn-success",
          "btn-sm",
          "btn-no-caret",
          "index-jadwal"
        );
      } else {
        button.classList.add("btn", "btn-light", "btn-sm", "btn-no-caret");
      }
      // Add classes and attributes to the button

      button.setAttribute("type", "button");
      button.setAttribute("data-date", date);
      button.setAttribute("data-day-of-week", dayOfWeek);

      // Set the button text to the date and day_of_week values
      button.innerText = `${getDayOfWeekString(
        dayOfWeek
      )}, ${date} ${todayMonth}`;

      // Append the button to the release dates container
      releaseDatesGroup.appendChild(button);

      // Save the reference to the first button
      if (index === 0) {
        firstButton = button;
      }

      // Add click event listener to the button
      button.addEventListener("click", () => {
        dataJadwalTbody.innerHTML = "";
        if (episodes && episodes.length > 0) {
          episodes.forEach((episode) => {
            const { pub_time, pub_index, title, season_id } = episode;
            const tr = document.createElement("tr");
            const tdPubTime = document.createElement("td");
            tdPubTime.innerHTML =
              "<span class='badge rounded-pill bg-primary'>" +
              pub_time +
              " WIB</span>";
            tr.appendChild(tdPubTime);

            const tdTitle = document.createElement("td");
            const truncatedTitle =
              title.length > 30 ? title.substring(0, 30) + "..." : title;
            tdTitle.innerHTML =
              "<a href='/details.html?id=" +
              season_id +
              "'>" +
              truncatedTitle +
              "</a>";
            tr.appendChild(tdTitle);

            const tdPubIndex = document.createElement("td");
            tdPubIndex.classList.add("text-center");
            tdPubIndex.innerHTML =
              "<span class='badge rounded-pill bg-danger'>" +
              pub_index +
              "</span>";
            tr.appendChild(tdPubIndex);
            dataJadwalTbody.appendChild(tr);
          });
        }
      });
    });

    // Trigger click event on the first button
    if (firstButton) {
      firstButton.click();
    }
  });

const releaseDatesContainer = document.querySelector(
  "#release-dates-container"
);
let isDragging = false;
let startX, scrollLeft;

// handle mousedown event
document.addEventListener("mousedown", (e) => {
  if (!e.target.closest("#release-dates-container")) return;
  e.preventDefault();
  isDragging = true;
  startX = e.pageX - releaseDatesContainer.offsetLeft;
  scrollLeft = releaseDatesContainer.scrollLeft;
});

// handle mousemove event
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - releaseDatesContainer.offsetLeft;
  const walk = (x - startX) * 1.5;
  releaseDatesContainer.scrollLeft = scrollLeft - walk;
});

// handle mouseup event
document.addEventListener("mouseup", () => {
  isDragging = false;
});

function getDayOfWeekString(dayOfWeek) {
  switch (dayOfWeek) {
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
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;
  document.querySelector("#jam").innerHTML =
    "<i class='fa fa-clock'></i> Waktu sekarang: " + time;
}
setInterval(updateClock, 1000);

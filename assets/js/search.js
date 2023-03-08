document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("search-button").disabled = !1;
}),
  document
    .getElementById("search-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      var t = document.getElementById("search-input").value;
      $.ajax({
        method: "GET",
        url: `${BACKEND_URL}/v1/search/` + t,
        beforeSend: function () {
          document.getElementById("spinner").style.display = "block";
        },
        success: function (e) {
          if (e.items && Array.isArray(e.items) && e.items.length > 0) {
            var t = document.getElementById("table_cok");
            $("#pagination").pagination({
              dataSource: e.items,
              locator: "items",
              pageSize: 5,
              callback: function (e) {
                for (var n = "", l = 0; l < e.length; l++)
                  (n += "<tr>"),
                    (n +=
                      "<td class='text-center'><span class='badge rounded-pill bg-primary'>" +
                      e[l].styles.split("|")[1].trim() +
                      "</span></td>"),
                    (n +=
                      "<td><a href='/details.html?id=" +
                      e[l].season_id +
                      "'>" +
                      e[l].title +
                      "</a></td>"),
                    (n +=
                      "<td><span class='badge bg-primary float-end'>" +
                      e[l].statics.view.replace("Ditonton", "") +
                      "<i class='fa-solid fa-signal-bars ms-2 text-success'></i> </span></td>"),
                    (n += "</tr>");
                (t.getElementsByTagName("tbody")[0].innerHTML = n),
                  (document.getElementById("spinner").style.display = "none");
              },
            }),
              (document.getElementById("hasil").style.display = "block"),
              (document.getElementById("pagination").style.display = "block"),
              (document.getElementById("alert").style.display = "none");
          } else
            (document.getElementById("alert").style.display = "block"),
              (document.getElementById("hasil").style.display = "none"),
              (document.getElementById("pagination").style.display = "none"),
              (document.getElementById("spinner").style.display = "none");
        },
        error: function () {
          (document.getElementById("alert").style.display = "block"),
            (document.getElementById("hasil").style.display = "none"),
            (document.getElementById("pagination").style.display = "none"),
            (document.getElementById("spinner").style.display = "none");
        },
      });
    });

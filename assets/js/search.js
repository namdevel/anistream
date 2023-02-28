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
            var t = document.getElementById("search-results");
            $("#pagination").pagination({
              dataSource: e.items,
              locator: "items",
              pageSize: 5,
              callback: function (e, n) {
                for (var l = "", a = 0; a < e.length; a++) {
                  (l += "<tr>"),
                    (l +=
                      "<td><span class='badge bg-danger'>" +
                      e[a].styles.split("|")[1].trim() +
                      "</span></td>"),
                    (l +=
                      "<td><a href='/details.html?id=" +
                      e[a].season_id +
                      "'>" +
                      e[a].title +
                      "</a></td>"),
                    (l +=
                      "<td><span class='badge bg-primary float-end'><i class='fas fa-eye'></i> " +
                      e[a].statics.view +
                      "</span></td>"),
                    (l += "</tr>");
                }
                (t.getElementsByTagName("tbody")[0].innerHTML = l),
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
        error: function (e, t, n) {
          (document.getElementById("alert").style.display = "block"),
            (document.getElementById("hasil").style.display = "none"),
            (document.getElementById("pagination").style.display = "none"),
            (document.getElementById("spinner").style.display = "none");
        },
      });
    });

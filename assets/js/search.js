document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.getElementById("search-button");
  searchButton.disabled = false;
});

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var query = document.getElementById("search-input").value;
    $.ajax({
      method: "GET",
      url: `${BACKEND_URL}/v1/search/` + query,
      beforeSend: function () {
        document.getElementById("spinner").style.display = "block";
      },
      success: function (response) {
        if (
          response.items &&
          Array.isArray(response.items) &&
          response.items.length > 0
        ) {
          var table = document.getElementById("search-results");
          $("#pagination").pagination({
            dataSource: response.items,
            locator: "items",
            pageSize: 5, // Set the number of rows to display per page
            callback: function (data, pagination) {
              var html = "";
              for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                var stylesArray = data[i].styles.split("|");
                html +=
                  "<td><span class='badge bg-danger'>" +
                  stylesArray[1].trim() +
                  "</span></td>";
                html +=
                  "<td><a href='/details.html?id=" +
                  data[i].season_id +
                  "'>" +
                  data[i].title +
                  "</a></td>";
                html +=
                  "<td><span class='badge bg-primary float-end'><i class='fas fa-eye'></i> " +
                  data[i].statics.view +
                  "</span></td>";
                html += "</tr>";
              }
              table.getElementsByTagName("tbody")[0].innerHTML = html;
              document.getElementById("spinner").style.display = "none";
            },
          });
          document.getElementById("hasil").style.display = "block";
          document.getElementById("pagination").style.display = "block";
          document.getElementById("alert").style.display = "none";
        } else {
          document.getElementById("alert").style.display = "block";
          document.getElementById("hasil").style.display = "none";
          document.getElementById("pagination").style.display = "none";
          document.getElementById("spinner").style.display = "none";
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        document.getElementById("alert").style.display = "block";
        document.getElementById("hasil").style.display = "none";
        document.getElementById("pagination").style.display = "none";
        document.getElementById("spinner").style.display = "none";
      },
    });
  });

function renderPaginated(elementId, endpoint, page = 1) {
  const animeListContainer = document.querySelector(`#${elementId}`);
  let loaderElement;

  function showLoader() {
    loaderElement = document.createElement("div");
    loaderElement.className = "col mx-auto text-center";
    loaderElement.innerHTML = `
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `;
    animeListContainer.appendChild(loaderElement);
  }

  function hideLoader() {
    if (loaderElement) {
      loaderElement.remove();
    }
  }

  function showError(message) {
    const errorElement = document.createElement("div");
    errorElement.className = "row mt-3 ps-2 pe-2";
    errorElement.innerHTML = `
      <div class="col mx-auto text-center">
        <button type="button" class="btn btn-primary btn-reload btn-sm">
          <i class="fas fa-redo"></i> ${message}
        </button>
      </div>
    `;
    const reloadContainer = document.querySelector("#reload_container");
    reloadContainer.innerHTML = "";
    reloadContainer.appendChild(errorElement);

    const reloadButton = errorElement.querySelector(".btn-reload");
    reloadButton.addEventListener("click", () => {
      animeListContainer.innerHTML = "";
      showLoader();
      fetchAnimeList();
    });
  }

  async function fetchAnimeList() {
    try {
      const response = await fetch(
        `${BACKEND_URL}/v1/season/${endpoint}/${page}`
      );
      const data = await response.json();
      hideLoader();

      const animeList = data.list.map((item) => {
        const animeItem = document.createElement("div");
        animeItem.className = "col";

        const animeLink = document.createElement("a");
        animeLink.href = `/details.html?id=${item.season_id}`;
        animeLink.className = "card h-100 d-flex";

        const animeImageContainer = document.createElement("div");
        animeImageContainer.className = "position-relative";

        const animeImage = document.createElement("img");
        animeImage.src = `${BACKEND_URL}/image/${item.cover}@720w_405h_1e_1c_90q.webp`;
        animeImage.className = "card-img-top";
        animeImage.alt = item.title;
        animeImage.title = item.title;
        animeImage.loading = "lazy";
        animeImage.style.cssText =
          "height: 100%; width: 100%; object-fit: cover; transition: opacity 0.2s ease-in-out;";

        const animeBadgeContainer = document.createElement("div");
        animeBadgeContainer.className = "position-absolute top-0 end-0 m-0";

        const animeBadge = document.createElement("div");
        animeBadge.className = "badge rounded-pill bg-primary";
        animeBadge.style.transform = "scale(0.8)";
        animeBadge.innerText = item.index_show;

        const animeTextBox = document.createElement("div");
        animeTextBox.className = "text-box";

        const animeTitle = document.createElement("p");
        animeTitle.className = "title";
        animeTitle.title = item.title;
        animeTitle.innerText = item.title;

        const animeHotUpdateInfo = document.createElement("p");
        animeHotUpdateInfo.className = "hot-update-info";
        animeHotUpdateInfo.innerText = item.order_type;

        animeListContainer.appendChild(animeItem);
        animeItem.appendChild(animeLink);
        animeLink.appendChild(animeImageContainer);
        animeImageContainer.appendChild(animeImage);
        animeImageContainer.appendChild(animeBadgeContainer);
        animeBadgeContainer.appendChild(animeBadge);
        animeLink.appendChild(animeTextBox);
        animeTextBox.appendChild(animeTitle);
        animeTextBox.appendChild(animeHotUpdateInfo);

        return animeItem;
      });

      animeListContainer.innerHTML = "";
      animeListContainer.append(...animeList);

      // Add pagination buttons
      const paginationElement = document.createElement("div");
      paginationElement.className = "col mx-auto text-center mt-3";

      if (page > 1) {
        const prevButton = document.createElement("button");
        prevButton.type = "button";
        prevButton.className = "btn btn-primary btn-pagination btn-sm me-2";
        prevButton.innerText = "Prev";
        prevButton.addEventListener("click", () => {
          animeListContainer.innerHTML = "";
          //showLoader();
          renderPaginated(elementId, endpoint, page - 1);
        });
        paginationElement.appendChild(prevButton);
      }

      if (data.has_next) {
        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.className = "btn btn-primary btn-pagination btn-sm ms-2";
        nextButton.innerText = "Next";
        nextButton.addEventListener("click", () => {
          animeListContainer.innerHTML = "";
          //showLoader();
          renderPaginated(elementId, endpoint, page + 1);
        });
        paginationElement.appendChild(nextButton);
      } else {
        const endMessage = document.createElement("p");
        endMessage.className = "text-muted";
        endMessage.innerText = "No more data";
        paginationElement.appendChild(endMessage);
      }

      const indexPaginationElement =
        document.querySelector("#index_pagination");
      indexPaginationElement.innerHTML = "";
      indexPaginationElement.appendChild(paginationElement);
    } catch (error) {
      //console.error(`Failed to fetch anime list from ${endpoint}`, error);
      hideLoader();
      showError(`Click to reload.`);
    }
  }
  showLoader();
  fetchAnimeList();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("serviceWorker.js")
    .then((r) => {
      console.log(r, "Worker registered");
    })
    .catch((e) => {
      console.log(e, "Worker failed to register");
    });
} else {
  console.log("Error, serviceWorker not supported");
}

const commitUrlElement = document.getElementById("commitUrl");
const commitShaElement = document.getElementById("commitSha");
fetch("https://api.github.com/repos/namdevel/anistream/commits/main")
  .then((response) => response.json())
  .then((data) => {
    const latestCommitSha = data.sha;
    const latestCommitUrl = `https://github.com/namdevel/anistream/commit/${latestCommitSha}`;
    commitUrlElement.href = latestCommitUrl;
    commitShaElement.innerHTML =
      `<i class="fa-solid fa-code-branch me-1"></i>` + latestCommitSha;
  })
  .catch((error) => console.error(error));

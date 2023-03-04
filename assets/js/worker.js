if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceWorker.js")
      .then(r => {
        console.log(r, "Worker registered");
      }).catch(e => {
        console.log(e, "Worker failed to register");
      });
  } else {
    console.log("Error, serviceWorker not supported");
  }
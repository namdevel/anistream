let isLightMode = localStorage.getItem("light-mode");
if (isLightMode) {
    document.body.classList.add("light-mode");
} else {
    document.body.classList.remove("light-mode");
}

function switchLight() {
    var element = document.body;
    element.classList.toggle("light-mode");

    if (!isLightMode) {
        localStorage.setItem("light-mode", true);
    } else {
        localStorage.removeItem("light-mode");
    }

}
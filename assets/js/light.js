let isLightMode = localStorage.getItem("light-mode");
if (isLightMode) {
    document.body.classList.add("light-mode");
    console.log("light-mode");
} else {
    document.body.classList.remove("light-mode");
    console.log("dark-mode");
}

function switchLight() {
    var element = document.body;
    element.classList.toggle("light-mode");

    if (!localStorage.getItem("light-mode")) {
        localStorage.setItem("light-mode", true);
    } else {
        localStorage.removeItem("light-mode");
    }

}
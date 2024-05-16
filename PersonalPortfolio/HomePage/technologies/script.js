let DarkModeToggle = document.querySelector(".darkModeToggle");
let body = document.body;

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    function applyMode(isDarkMode) {
        if (isDarkMode) {
            body.classList.add("DarkMode");
        } else {
            body.classList.remove("DarkMode");
        }
    }

    const storedMode = localStorage.getItem("colorMode");

    if (storedMode) {
        applyMode(storedMode === "dark");
    } else {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyMode(prefersDarkScheme);
    }

    DarkModeToggle.addEventListener("click", function () {
        const isDarkMode = body.classList.contains("DarkMode");
        const newMode = !isDarkMode;
        applyMode(newMode);
        localStorage.setItem("colorMode", newMode ? "dark" : "light");
    });
});
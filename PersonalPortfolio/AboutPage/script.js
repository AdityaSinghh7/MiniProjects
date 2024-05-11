let darkModeToggle = document.querySelector(".darkModeToggle");
let body = document.body


darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("DarkMode");
});
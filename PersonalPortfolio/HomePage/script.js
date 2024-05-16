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


let typingEffect = new Typed("#MovingText", {
    strings:["Aditya Dev Singh", "a programmer", "a student", "curious", "a fast-learner"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000
})

let ContactButtons = document.querySelectorAll(".ContactButtons");

ContactButtons.forEach(button => {
    button.addEventListener("click", function() {
        if(this.innerText === "LinkedIn"){
            window.open('https://www.linkedin.com/in/aditya-singh-0a3805214/', '_blank');
        }
        else{
            window.open('https://github.com/AdityaSinghh7', '_blank');
        }
    })
})
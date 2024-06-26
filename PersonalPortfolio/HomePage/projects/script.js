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


let p1Effect = new Typed("#p1_span", {
    strings: ["Python", "Flask", "NLTK (Natural Language Toolkit)", "BeautifulSoup"],
    loop: true,
    typeSpeed: 30,
    backSpeed: 30,
    backDelay: 900
})
let p2Effect = new Typed("#p2_span", {
    strings: ["HTML", "CSS", "JavaScript", "TypeScript"],
    loop: true,
    typeSpeed: 30,
    backSpeed: 30,
    backDelay: 900
})
let p3Effect = new Typed("#p3_span", {
    strings: ["C++", "Object-Oriented Programming", "Caching Mechanism"],
    loop: true,
    typeSpeed: 30,
    backSpeed: 30,
    backDelay: 900
})
let p4Effect = new Typed("#p4_span", {
    strings: ["C", "UNIX System Calls", "POSIX Signals", "I/O Management", "Sync Job Control"], 
    loop: true,
    typeSpeed: 30,
    backSpeed: 30,
    backDelay: 900
})
let p5Effect = new Typed("#p5_span", {
    strings: ["HTML", "CSS", "JavaScript", "GitHub"],
    loop: true,
    typeSpeed: 30,
    backSpeed: 30,
    backDelay: 900
})


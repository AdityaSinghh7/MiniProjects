let DarkModeToggle = document.querySelector(".darkModeToggle");
let banner = document.querySelector(".banner");

DarkModeToggle.addEventListener("click", ()=>{
    banner.classList.toggle("DarkMode");
})

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
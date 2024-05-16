document.addEventListener('DOMContentLoaded', (event) => {
    let darkModeToggle = document.querySelector(".darkModeToggle");
    let body = document.body;

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

    darkModeToggle.addEventListener("click", function () {
        const isDarkMode = body.classList.contains("DarkMode");
        const newMode = !isDarkMode;
        applyMode(newMode);
        localStorage.setItem("colorMode", newMode ? "dark" : "light");
    });

    const popup = document.getElementById("popup-container");
    const closeButton = document.getElementById('popup-close-button');

    function showPopup() {
        popup.style.display = 'flex';
    }

    function hidePopup() {
        popup.style.display = 'none';
    }

    closeButton.addEventListener('click', hidePopup);

    const textarea = document.getElementById('email-body-text');

    textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = window.getSelection().getRangeAt(0).startOffset;
            const end = window.getSelection().getRangeAt(0).endOffset;
            const textContent = this.innerText;

            const beforeTab = textContent.substring(0, start);
            const afterTab = textContent.substring(end);
            this.innerText = beforeTab + '\t' + afterTab;

            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(this.childNodes[0], start + 1);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    function execCommand(command) {
        document.execCommand(command, false, null);
    }

    function changeAlignment(value) {
        execCommand(value);
    }

    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var params = {
            sender_name: document.getElementById("name-text-email").value,
            subject_value: document.getElementById("subject-text-email").value,
            message: document.getElementById("email-body-text").innerHTML
        };

        emailjs.send('service_adityads', 'templatePortAdityads', params)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                showPopup();
            }, function (error) {
                console.log('FAILED...', error);
            });

        document.getElementById("name-text-email").value = "";
        document.getElementById("subject-text-email").value = "";
        document.getElementById("email-body-text").innerHTML = "";
    });
});

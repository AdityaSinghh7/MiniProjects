document.addEventListener('DOMContentLoaded', (event) => {
    let darkModeToggle = document.querySelector(".darkModeToggle");
    let body = document.body;

    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("DarkMode");
    });

    const popup = document.getElementById("popup");
    const closeButton = document.getElementById('popup-close-button');

    function showPopup() {
        popup.style.display = 'block';
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

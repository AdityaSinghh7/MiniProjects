window.onload = function () {
    var downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Resume';
    downloadButton.onclick = function () {
        window.location.href = 'Resume_Aditya.pdf';
    };

    document.body.appendChild(downloadButton);
};
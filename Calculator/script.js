let mainField = document.getElementById("input");

// for clicking of Darkgrey buttons
document.querySelectorAll(".DarkGrey").forEach(button => {
    button.addEventListener('click', function(){
        console.log(this.innerText);
        mainField.innerText += this.innerText;
    })
})
// for clicking LightGrey buttons
document.querySelectorAll(".Lgrey").forEach(button => {
    button.addEventListener('click', function() {
        if(this.innerText === "C")
        {
            mainField.innerText = "";
        }
        else if (this.innerText === "+/-")
        {
            mainField.innerText = -Number(mainField.innerText);
        }
        else if(this.innerText === "%")
        {
            mainField.innerText = Number(mainField.innerText)/100;
        }
    })
})
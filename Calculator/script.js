let mainField = document.getElementById("input");
var equationBuilder = "";

// for clicking of Darkgrey buttons
document.querySelectorAll(".DarkGrey").forEach(button => {
    button.addEventListener('click', function(){
        mainField.innerText += this.innerText;
        equationBuilder += this.innerText;
        console.log(equationBuilder);
        document.querySelectorAll(".orange").forEach(btn => btn.classList.remove("clicked"));
    })
})
// for clicking LightGrey buttons
document.querySelectorAll(".Lgrey").forEach(button => {
    button.addEventListener('click', function() {
        if(this.innerText === "C")
        {
            mainField.innerText = "";
            equationBuilder = "";
            document.querySelectorAll(".orange").forEach(btn => btn.classList.remove("clicked"));
            console.log(equationBuilder);
        }
        else if (this.innerText === "+/-")
        {
            mainField.innerText = -Number(mainField.innerText);
            equationBuilder = -Number(equationBuilder);
            console.log(equationBuilder);
        }
        else if(this.innerText === "%")
        {
            mainField.innerText = Number(mainField.innerText)/100;
            equationBuilder = Number(equationBuilder)/100;
            console.log(equationBuilder);
        }
    })
})

// for orange buttons
document.querySelectorAll(".orange").forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll(".orange").forEach(btn => btn.classList.remove("clicked"));
        this.classList.add("clicked");
        equationBuilder += this.innerText;
        if(this.innerText === "+" || this.innerText === "-" || this.innerText === "*" || this.innerText === "/")
        {
            mainField.innerText = "";
        }
        else if(this.innerText === "=")
        {
            equationBuilder = evaluate_equation(equationBuilder);
            mainField.innerText = equationBuilder;
            setTimeout(() => {
                document.querySelectorAll(".orange").forEach(btn => btn.classList.remove("clicked"));                
            }, 500);
        }
        console.log(equationBuilder);
    })
})

function isDigit(character) {
    return /^\d$/.test(character);
}

function evaluate_equation(toBeEvaluated)
{
    const tokens = tokenize(toBeEvaluated);
    const postfix = toPostfix(tokens);
    return evaluatePostfix(postfix);
}

function tokenize(expression) {
    expression = expression.replace(/\s+/g, ''); 
    expression = expression.replace(/(^|[\+\-\*\/\(\^])\-(\d+)/g, '$1~$2'); 
    const tokens = expression.match(/[\+\-\*\/\(\)]|\d*\.\d+|\d+|~/g);

    return tokens.map(token => {
        if (token === '~') { 
            return token;
        } else if (!isNaN(token)) {
            return Number(token);
        } else {
            return token;
        }
    });
}

function toPostfix(tokens) {
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '~': 3 }; 
    const stack = [];
    const output = [];
    let lastTokenOperator = true; 

    tokens.forEach(token => {
        if (typeof token === 'number') {
            output.push(token);
            lastTokenOperator = false;
        } else if (token === '(') {
            stack.push(token);
            lastTokenOperator = true;
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop(); 
            lastTokenOperator = false;
        } else { 
            while (stack.length > 0 && precedence[token] <= precedence[stack[stack.length - 1]] && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.push(token);
            lastTokenOperator = true;
        }
    });

    
    while (stack.length > 0) {
        output.push(stack.pop());
    }

    return output;
}

function evaluatePostfix(postfix) {
    const stack = [];

    postfix.forEach(token => {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            if (token === '~') { 
                const operand = stack.pop();
                stack.push(-operand);
            } else {
                const right = stack.pop();
                const left = stack.pop();
                switch (token) {
                    case '+': stack.push(left + right); break;
                    case '-': stack.push(left - right); break;
                    case '*': stack.push(left * right); break;
                    case '/': stack.push(left / right); break;
                }
            }
        }
    });

    return stack.pop();
}
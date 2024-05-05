function operate(operator, x, y) {
    if (operator === 'add') {
        add(x, y);
    }
    if (operator === 'subtract') {
        subtract(x, y);
    }
    if (operator === 'multiply') {
        multiply(x, y);
    }
    if (operator === 'divide') {
        divide(x, y);
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function runCalculator() {
    const display = document.querySelector(".display");
    let displayValue = ["0"];
    let operatorCount = 0; //keep track of how many operators have been selected
    let lastDigitOperator = false; //keep track of last digit
    display.textContent = displayValue;

    //number buttons [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const numButtons = [];

    for (let i = 0; i <= 9; i++) {
        numButtons[i] = document.querySelector("#btn"+i);
    }

    for (let i = 0; i < numButtons.length; i++) {
        numButtons[i].addEventListener("click", () => {
            if (i === 0 && !arrayEquals(displayValue, ["0"])) {
                displayValue.push(i.toString());
            } else {
                if (arrayEquals(displayValue, ["0"])) {
                    displayValue = [i.toString()];
                } else {
                    displayValue.push(i.toString());
                }
            } 
            display.textContent = displayValue.join("");
            lastDigitOperator = false;
        });
    }

    //operator buttons [+, -, x, /, =, clear]
    const opButtons = [];

    for (let i = 0; i < 6; i++) {
        opButtons[i] = document.querySelector("#opBtn"+i);
    }

    for (let i = 0; i < opButtons.length; i++) {
        opButtons[i].addEventListener("click", () => {
            if (!lastDigitOperator) {
                operatorCount++;
                lastDigitOperator = true;
                switch(i) {
                    case 0: //add
                        displayValue.push("+");
                        break;
                    case 1: //subtract
                        displayValue.push("-");
                        break;
                    case 2: //multiply
                        displayValue.push("×");
                        break;
                    case 3: //divide
                        displayValue.push("/");
                        break;
                    case 4: //equal
                        displayValue.push("=");
                        break;
                    case 5: //clear
                        if (!arrayEquals(displayValue, ["0"])) {
                            displayValue = ["0"];
                        }
                        break;
                }
                display.textContent = displayValue.join("");
            } 
        });

    }



}

runCalculator();
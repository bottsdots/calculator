function operate(operator, x, y) {
    switch(operator) {
        case "add":
            return add(x,y);
        case "subtract":
            return subtract(x,y);
        case "multiply":
            return multiply(x,y);
        case "divide":
            return divide(x,y);
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

function displayValueToScreen(displayValue) {
    display.textContent = displayValue.join("");
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function runCalculator() {
    const display = document.querySelector("#display");
    const displayAnswer = document.querySelector("#displayAnswer");
    let displayValue = ["0"];
    let operatorCount = 0; //keep track of how many operators have been selected
    let lastDigitOperator = false; //keep track of whether last input was an operator
    let prevNumber = 0;
    let currNumber = 0;
    let answer = 0;
    let operator = "";
    display.textContent = displayValue;

    //number buttons [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const numButtons = [];

    for (let i = 0; i <= 9; i++) {
        numButtons[i] = document.querySelector("#btn"+i);
    }

    for (let i = 0; i < numButtons.length; i++) {
        numButtons[i].addEventListener("click", () => {
            /* if (i === 0 && !arrayEquals(displayValue, ["0"]) && (!lastBtnEqual || !lastDigitOperator)) {
                displayValue.push(i.toString());
            } else { */
                if (arrayEquals(displayValue, ["0"]) || lastDigitOperator || lastBtnEqual) {
                    displayValue = [i.toString()];
                    lastDigitOperator = false;
                    lastBtnEqual = false;
                } else {
                    displayValue.push(i.toString());
                }
            //} 
            displayValueToScreen(displayValue);
            lastDigitOperator = false;
            setBtnOpacity(numButtons[i]);  
        });
    }

    //operator buttons [+, -, x, /]
    const opButtons = [];

    for (let i = 0; i < 4; i++) {
        opButtons[i] = document.querySelector("#opBtn"+i);
    }

    for (let i = 0; i < opButtons.length; i++) {
        opButtons[i].addEventListener("click", () => {
            if (!lastDigitOperator) {
                operatorCount++;
                lastDigitOperator = true;
                prevNumber = parseFloat(displayValue.join(""));
                switch(i) {
                    case 0: //add
                        operator = "add";
                        break;
                    case 1: //subtract
                        operator = "subtract";
                        break;
                    case 2: //multiply
                        operator = "multiply";
                        break;
                    case 3: //divide
                        operator = "divide";
                        break;
                }
                numberHasDecimalEntered = false;
                isNegative = false;
            }
            displayValueToScreen(displayValue);
            setBtnOpacity(opButtons[i]);  
        });
    }

    const equalButton = document.querySelector("#equalBtn");
    let lastBtnEqual = false;
    equalButton.addEventListener("click", () => {
        if (parseInt(displayValue.join("")) === 0 && operator === "divide") {
            displayValue = ["oh no"];
            displayValueToScreen(displayValue);
        } else if (operatorCount >= 1) {
            currNumber = prevNumber;
            prevNumber = parseFloat(displayValue.join(""));
            displayValue = String(operate(operator, currNumber, prevNumber)).split("");
            if (displayValue.length > 11) { //limit display to 11 digits
                let extraElementCount = displayValue.length - 11;
                displayValue.splice(extraElementCount*-1);
            }
            displayValueToScreen(displayValue);
        }
        operatorCount = 0;
        lastBtnEqual = true;
        numberHasDecimalEntered = false;
        isNegative = false;
        setBtnOpacity(equalButton);  

    });

    const clearButton = document.querySelector("#clearBtn");
    clearButton.addEventListener("click", () => {
        displayValue = ["0"];
        currNumber = 0; prevNumber = 0; //set all numbers to 0
        displayValueToScreen(displayValue);
        setBtnOpacity(clearButton);  
    });

    let numberHasDecimalEntered = (displayValue.indexOf(".") !== -1);
    const decimalButton = document.querySelector("#decimalBtn");
    decimalButton.addEventListener("click", () => {
        numberHasDecimalEntered = (displayValue.indexOf(".") !== -1);
        if (displayValue.indexOf(".") === -1) {
            displayValue.push(".");
            numberHasDecimalEntered = true;
            displayValueToScreen(displayValue);
            lastBtnEqual = false;
        }   
        setBtnOpacity(decimalButton);     
    });

    let isNegative = false;
    const negativeButton = document.querySelector("#negativeBtn");
    negativeButton.addEventListener("click",() => {
        isNegative = (displayValue[0] === "-" || displayValue[0] < 0);
        if (!isNegative && !arrayEquals(displayValue, ["0"])) {
            displayValue.unshift("-");
            isNegative = true;
        } else if (isNegative && displayValue[0] < 0) {
            displayValue[0] *= -1;
        } else if (isNegative && !arrayEquals(displayValue, ["0"])) {
            displayValue.shift();
            isNegative = false;
        }
        displayValueToScreen(displayValue);
        setBtnOpacity(negativeButton);     

    });

    const percentButton = document.querySelector("#percentBtn");
    percentButton.addEventListener("click", () => {
        displayValue = (parseFloat(displayValue.join("")))/100;
        displayValue = String(displayValue).split("");
        if (displayValue.length > 11) { //limit display to 11 digits
            let extraElementCount = displayValue.length - 11;
            displayValue.splice(extraElementCount*-1);
        }
        displayValueToScreen(displayValue);
        setBtnOpacity(percentButton);     
    });

}

function setBtnOpacity(button) {
    button.style.opacity = "0.5";
    setTimeout( function () {
        button.style.opacity = "1";
    }, 100);
}

runCalculator();
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.reset();
    }
    reset() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        if (this.currentOperand === '') return;
        this.currentOperand = this.currentOperand.slice(0, - 1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.toString().includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation; //variable to store the computed values of the calculation
        const prev = parseFloat(this.previousOperand); //getting our previous operand
        const current = parseFloat(this.currentOperand); //getting our current operand
        if (isNaN(prev) || isNaN(current)) return; // if any of these aren't number then dont do any operation just return
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break
            case "-":
                computation = prev - current;
                break
            case "/":
                computation = prev / current;
                break
            case "x":
                computation = prev * current;
                break
            default:
                return
        }
        this.currentOperand = computation; //we want to display answer in the bottom section to it is computations value is given to current operand
        this.previousOperand = ''; // we remove what is in the previous operand
        this.operation = undefined; // we make the operation undefined so that is it ready for the next click

    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const resetBtn = document.querySelector("[data-reset]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

window.addEventListener("keydown", (e) => {
    // lets get the value of the keyboard buttons we click 
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    const operator = ["-", "+", "/", "x"];
    const del = "backspace";
    // if the button we clicked is included in our arrays and strings we should allow the value of that button to be appended

    if (numbers.includes(Number(e.key), 0)) {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();

    } else if(operator.includes(e.key,0)){
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();

    }else if(e.key.toLowerCase() === del){
        calculator.delete();
        calculator.updateDisplay();

    }else{return}
})

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    })
})
operationButtons.forEach((operationBtn) => {
    operationBtn.addEventListener("click", () => {
        calculator.chooseOperation(operationBtn.textContent);
        calculator.updateDisplay();
    })
})
equalsBtn.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})
resetBtn.addEventListener("click", () => {
    calculator.reset();
    calculator.updateDisplay();
})

deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

const themeChangers = document.querySelectorAll(".theme-changer");

themeChangers.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        themeChangers.forEach((btns) => {
            btns.classList.add("opacity-0");//making all buttons not visible after clicking any 
        })
        toggle.classList.remove("opacity-0") //here we are making each toggle selection visible after we click it by removing the 0 opacity class

        if (toggle.classList.contains("og-theme")) {
            document.documentElement.className = ''

        } else if (toggle.classList.contains("second-theme")) {
            document.documentElement.className = ''
            document.documentElement.classList.add("theme-2")

        } else if (toggle.classList.contains("third-theme")) {
            document.documentElement.classList.add("theme-3")
        } else { return }
    })
})
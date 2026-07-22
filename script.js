let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let string = "";
let calculated = false;

function updateDisplay() {
    input.value = string;
}

function calculate() {
    try {
        if (string === "") return;
        string = eval(string).toString();
        updateDisplay();
        calculated = true;
    } catch {
        input.value = "Error";
        string = "";
    }
}

function handleInput(value) {

    if (value === "AC") {
        string = "";
        calculated = false;
        updateDisplay();
        return;
    }

    if (value === "DEL") {
        string = string.slice(0, -1);
        updateDisplay();
        return;
    }

    if (value === "=") {
        calculate();
        return;
    }

    // नया Number दबाने पर Result Clear
    if (calculated && !isNaN(value)) {
        string = "";
        calculated = false;
    }

    const operators = ["+", "-", "*", "/", "%"];

    // पहला Character Operator न हो (सिर्फ - छोड़कर)
    if (string === "" && operators.includes(value) && value !== "-") {
        return;
    }

    // लगातार दो Operators न लगें
    let lastChar = string.slice(-1);
    if (operators.includes(lastChar) && operators.includes(value)) {
        string = string.slice(0, -1) + value;
    } else {
        string += value;
    }

    updateDisplay();
}

// Button Click
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.innerText);
    });
});

// Keyboard Support
document.addEventListener("keydown", (e) => {

    if (!isNaN(e.key)) {
        handleInput(e.key);
    }

    else if (["+", "-", "*", "/", "%", "."].includes(e.key)) {
        handleInput(e.key);
    }

    else if (e.key === "Enter") {
        e.preventDefault();
        handleInput("=");
    }

    else if (e.key === "Backspace") {
        handleInput("DEL");
    }

    else if (e.key === "Escape" || e.key === "Delete") {
        handleInput("AC");
    }
});
let previous = 0;
let current = 0;
let result = 0;
let operator = '';

let historyArray = [];


let numberButtons = document.querySelectorAll('.number');

let results = document.querySelector('.results')
let history = document.querySelector('.history');

let eraseButton = document.querySelector('.erase');

function addListeners() {
    numberButtons.forEach(button => {
        button.addEventListener('click', addDigit);
    });

    eraseButton.addEventListener('click', erase);
}

function addDigit(e) {
    eraseButton.textContent = 'C';

    if (current == 0) current = ''; // set to empty string temporarily to concat

    const buttonLabel = e.target.textContent;
    current = +(`${current}${buttonLabel}`); // concats number on clicked button to previous number

    updateDisplay(current);
}

function setSign() {
    current *= -1;

    updateDisplay(current);
}

function setPercent() {
    
}

function setDecimal() {
    // if there is already a decimal, remove it.
    if (current.toString().includes('.')) current = +current.toString().replace('.', '');
    else current = current.toString().concat('.'); // otherwise, add one

    updateDisplay(current);
}

function add() {

}

function subtract(a, b) {

}

function multiply(a, b) {

}

function divide() {

}

function erase() {
    if (current != 0) { // if there is a current number, empty it
        current = 0;
    }
    else if ((previous != 0)) { // wipe everything else that is left
        previous = 0;
        historyArray = []
    }

    eraseButton.textContent = (current == 0 && previous == 0) ? 'AC' : 'C';

    updateDisplay(current);
}

function updateDisplay(display) {
    results.textContent = display;

    let newHistory = '';
    for (x in historyArray) {
        newHistory = newHistory.concat(historyArray[x].toString(), ' ');
    }
    history.textContent = newHistory;
}

// takes an operator and two numbers
function operate(a, b) {
         
    updateDisplay();
}

addListeners();
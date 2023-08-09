let previous = null;
let current = ""
let result = 0;

let historyArray = [];

let operation = 'none';

let numberButtons = document.querySelectorAll('.number');

let results = document.querySelector('.results')
let history = document.querySelector('.history');

function addListeners() {
    numberButtons.forEach(button => {
        button.addEventListener('click', addDigit);
    });
}

function addDigit(e) {
    const buttonLabel = e.target.textContent;
    current = current.concat(buttonLabel);
    results.textContent = current;
}

function setSign() {
    current *= -1;
    current = current.toString(); // has to be string for non-math sections

    results.textContent = current;
}

function setPercent() {
    
}

function setDecimal() {
    // if there is already a decimal, remove it.
    if (current.includes('.')) current = current.replace('.', '');
    else current = current.concat('.'); // otherwise, add one

    results.textContent = current;
}

function divide() {

}

function multiply() {

}

function subtract() {

}

function add() {

}

function erase() {
    if (current != "") { // if there is a current number, empty it
        current = "";
    }
    else if (current === "" && previous !== null) {
        previous = null;
    }

    results.textContent = "0";
}

function updateHistory() {
    history.textContent = historyArray.join().replace(',', ' ');
}

function getResult() {
    switch (operation) {
        case 'add':
            
            break;
        default:
            
            break;
    }
}

addListeners();
let total = 0; // total is my "previous" integer
let current = 0;

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
    operate(); // run operation using previous operator
    operator = '+'; // set new operator
}

function subtract() {
    operate(); // run operation using previous operator
    operator = '-'; // set new operator
}

function multiply() {
    operate(); // run operation using previous operator
    operator = '*'; // set new operator
}

function divide() {
    operate(); // run operation using previous operator
    operator = '/'; // set new operator
}

function erase() {
    if (current != 0) { // if there is a current number, empty it
        current = 0;
    }
    else { // wipe everything else that is left
        total = 0;
        historyArray = []
    }

    eraseButton.textContent = (current == 0 && total == 0) ? 'AC' : 'C';

    updateDisplay(current);
}

function updateDisplay(display) {
    results.textContent = display;

    /*let newHistory = '';
    for (x in historyArray) {
        newHistory = newHistory.concat(historyArray[x].toString(), ' ');
    }
    history.textContent = newHistory;*/
}

function operate() {
    historyArray.push(current);
    switch (operator) {
        case '+':
            total += current;
            break;
        case '-':
            total -= current;
            break;
        case '*':
            total *= current;
            break;
        case '/':
            total /= current;
            break;
        default:
            if (historyArray.length == 1) total = current; // called when no operator is given
            break;
    }

    operator = '';
    current = 0;
    updateDisplay(total);
}

addListeners();
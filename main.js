// strings in order to make -0 possible
let total = '0'; // total is equivalent to "previous" value
let current = '0';

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

    const digit = e.target.textContent;
    if (current === '0') current = digit;
    else if (current === '-0') current = `-${digit}`;
    else current = `${current}${digit}`;

    updateDisplay(current.toString());
}

function setSign() {
    if (current.includes('-')) {
        current = current.replace('-', ''); // replaces first instance of negative
    }
    else {
        current = `-${current}`; // adds negative to start
    }

    updateDisplay(current);
}

function setPercent() {
    
}

function setDecimal() {
    // Makes sure it is still a string
    current = current.toString();

    // If there is already a decimal, remove it.
    if (current.includes('.')) current = current.replace('.', '');
    else current = current.toString().concat('.'); // otherwise, add one

    // Checks whether the first
    if (current.charAt(0) == '0' && !current.includes('.')) current = current.replace(0, '');

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
        total = '0';
        historyArray = []
    }

    eraseButton.textContent = (current == '0' && total == '0') ? 'AC' : 'C';

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
            total = +total + +current;
            break;
        case '-':
            total = +total - +current;
            break;
        case '*':
            total = +total * +current;
            break;
        case '/':
            total = +total / +current;
            break;
        default:
            if (historyArray.length == 1) total = current; // called when no operator is given
            break;
    }

    total = total.toString();
    operator = '';
    current = '0';
    updateDisplay(total);
}

addListeners();
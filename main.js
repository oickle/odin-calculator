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
        button.addEventListener('click', getDigit);
    });

    eraseButton.addEventListener('click', erase);

    document.addEventListener('keydown', function(event) {
        const digits = '0123456789';
        if (digits.includes(event.key)) {
            addDigit(event.key);
        }
        else {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    equals();
                    break;
                case '=':
                    equals();
                    break;
                case 'Backspace':
                    erase();
                    break;
                case '_': // toggle negative with underscore
                    setSign();
                    break;
                case '%':
                    setPercent();
                    break;
                case '.':
                    setDecimal();
                    break;
                case '+':
                    add();
                    break;
                case '-':
                    subtract();
                    break;
                case '*':
                    multiply();
                    break;
                case 'x':
                    multiply();
                    break;
                case '/':
                    event.preventDefault();
                    divide();
                    break;
                default:
                    break;
            }
        }
    });
}

// Grabs what digit is written on the button and passes it forward
// Allows for keyboard functionality since it is not limited to button presses
function getDigit(e) {
    addDigit(e.target.textContent);
}

function addDigit(digit) {
    if (current.length < 9) {
        // Wipes out old stuff after = is hit ... 
        // Allows for new equation to be typed by simply clicking a new integer
        if (operator == '=') {
            erase();
            erase();
        }

        eraseButton.textContent = 'C';

        if (current === '0') current = digit;
        else if (current === '-0') current = `-${digit}`;
        else current = `${current}${digit}`;

        updateDisplay(current.toString());
    }
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
    let percentage = +current / 100;
    current = percentage.toString();


    // Prevents percentage from going out of boundaries of calculator
    let display = (current.length > 9) ? round(current) : current;
    updateDisplay(display);
}

function setDecimal() {
    // Makes sure it is still a string
    current = current.toString();

    // If there is no decimal, add one
    if (!current.includes('.')) current = current.toString().concat('.');

    updateDisplay(current);
}

function add() {
    operate(); // run operation using previous operator
    historyArray.push('+');
    operator = '+'; // set new operator
}

function subtract() {
    operate(); // run operation using previous operator
    historyArray.push('-');
    operator = '-'; // set new operator
}

function multiply() {
    operate(); // run operation using previous operator
    historyArray.push('x');
    operator = '*'; // set new operator
}

function divide() {
    operate(); // run operation using previous operator
    historyArray.push('÷');
    operator = '/'; // set new operator
}

function equals() {
    // Lets quick restart by double tapping '='
    if (operator === '=') {
        erase();
        erase();
    }
    else {
        operate(); // run operation using previous operator
        historyArray.push('=');
        updateDisplay();
        operator = '='; // set new operator
    }
}

function round(str) {
    let num = +str 
    return num.toExponential(3);
}

function erase() {
    if (current != '0') { // if there is a current number, empty it
        current = '0';
    }
    else { // wipe everything else that is left
        total = '0';
        historyArray = []
        operator = '';
    }

    eraseButton.textContent = (current == '0' && total == '0') ? 'AC' : 'C';

    updateDisplay(current);
}

function updateDisplay(display) {
    // Update results
    results.textContent = (display === undefined) ? results.textContent : display; // only updates results if something is passed

    // Update history
    let newHistory = '';

    // Prevents history text from overflowing and showing every change
    let start = 0;
    let end = historyArray.length;
    if (historyArray.length > 12) { // shows the last six most recent digit additions
        newHistory = newHistory.concat('...', ' '); // adds elipses to front of history for detail
        start = historyArray.length - 12;
        end = start + 12;
    }
    
    for (let x = start; x < end; x++) {
        newHistory = newHistory.concat(historyArray[x].toString(), ' ');
    }
    history.textContent = newHistory;
}

function operate() {
    // Allows for the history to show
    let historyNew = (operator === '=') ? total : current;
    historyArray.push(historyNew);
    
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

    // Prevents total from going out of boundaries of calculator
    let display = (total.length > 9) ? round(total) : total;
    
    // Prevents issues with dividing by 0
    if (total == Infinity) {
        display = "wow..."; 
        total = 0;
    }

    updateDisplay(display);

    // Resets values
    operator = '';
    current = '0';
}

addListeners();
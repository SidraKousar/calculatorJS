const calculatorDiv = document.createElement('div');
calculatorDiv.className = 'calculator';
const resultInput = document.createElement('input');
resultInput.type = 'text';
resultInput.id = 'result';
resultInput.className = 'display';
resultInput.readOnly = true;
const buttonsDiv = document.createElement('div');
buttonsDiv.className = 'buttons';
const buttonData = [
  { label: 'C', clickHandler: () => clearInput() },
  { label: '/', clickHandler: () => get('/') },
  { label: '*', clickHandler: () => get('*') },
  { label: 'back', clickHandler:() => back() },
  { label: '7', clickHandler: () => get(7) },
  { label: '8', clickHandler: () => get(8) },
  { label: '9', clickHandler: () => get(9) },
  { label: '-', clickHandler: () => get('-') },
  { label: '4', clickHandler: () => get(4) },
  { label: '5', clickHandler: () => get(5) },
  { label: '6', clickHandler: () => get(6) },
  { label: '+', clickHandler: () => get('+') },
  { label: '1', clickHandler: () => get(1) },
  { label: '2', clickHandler: () => get(2) },
  { label: '3', clickHandler: () => get(3) },
  { label: '=', clickHandler: () => evaluate12() },
  { label: '%', clickHandler: () => get('%') },
  { label: '0', clickHandler: () => get(0) },
  { label: '.', clickHandler: () => get('.') },
];
buttonData.forEach((buttonInfo) => {
    const button = document.createElement('button');
    button.textContent = buttonInfo.label;
    button.addEventListener('click', buttonInfo.clickHandler);
    buttonsDiv.appendChild(button);
  });
calculatorDiv. appendChild(resultInput);
calculatorDiv. appendChild(buttonsDiv);
document.body. appendChild (calculatorDiv);

let inputArray = String[2000];
let precedence12 = ['/', '*', '%', '-', '+'];

function get(val) {
    const inputField = document.getElementsByClassName("display")[0];
    inputField.value = inputField.value + val;
    inputArray = inputField.value.split(/([+\-*/%])/);
}
function evaluate12() {
    if (inputArray.length == 0) {
        updateResult('Please enter a valid expression.');
        return;
    }

    console.log(inputArray);

    for (let i = 0; i < precedence12.length; i++) {
        let currentOperator = precedence12[i];
        let indexes = [];

        inputArray.forEach((element, index) => {
            if (element === currentOperator) {
                indexes.push(index);
            }
        });

        while (indexes.length > 0) {
            const index = indexes.pop();
            const before = parseFloat(inputArray[index - 1]);
            const after = parseFloat(inputArray[index + 1]);

            if (!isNaN(before) && !isNaN(after)) {
                let result = 0;

                if (currentOperator === '/') {
                    result = before / after;
                } else if (currentOperator === '*') {
                    result = before * after;
                } else if (currentOperator === '%') {
                    result = before % after;
                } else if (currentOperator === '+') {
                    result = before + after;
                } else if (currentOperator === '-') {
                    result = before - after;
                }
                console.log(`${before}${currentOperator}${after}`, result)
                inputArray.splice(index - 1, 3, result.toString());
                console.log(inputArray)
            }
        }
    }

    if (inputArray.length === 1) {
        updateResult(inputArray[0]);
    } else {
        updateResult('Invalid expression');
    }
}

function updateResult(text) {
    const resultElement = document.getElementById("result");
    resultElement.value = text;
}

function backspace(input) {
    if (input.length > 0) {
        return input.slice(0, -1);
    }
    return input;
}

function back() {
    const inputField = document.getElementsByClassName("display")[0];
    inputField.value = backspace(inputField.value);
}

function clearInput() {
    const inputField = document.getElementsByClassName("display")[0];
    inputField.value = '';
    inputArray = [];
    updateResult('');
}
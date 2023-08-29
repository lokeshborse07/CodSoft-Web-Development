const display = document.getElementById('display');
let currentInput = '0';
let operator = '';
let firstOperand = '';
let waitingForSecondOperand = false;

function updateDisplay() {
  display.textContent = currentInput;
}

updateDisplay();

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', event => {
    const buttonValue = event.target.textContent;

    if (buttonValue >= '0' && buttonValue <= '9') {
      if (waitingForSecondOperand) {
        currentInput = buttonValue;
        waitingForSecondOperand = false;
      } else {
        currentInput = currentInput === '0' ? buttonValue : currentInput + buttonValue;
      }
    } else if (buttonValue === '.') {
      if (!currentInput.includes('.')) {
        currentInput += '.';
      }
    } else if (buttonValue === 'C') {
      currentInput = '0';
      operator = '';
      firstOperand = '';
      waitingForSecondOperand = false;
    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
      if (operator !== '' && !waitingForSecondOperand) {
        calculate();
      }
      operator = buttonValue;
      firstOperand = currentInput;
      waitingForSecondOperand = true;
    } else if (buttonValue === '=') {
      calculate();
    }

    updateDisplay();
  });
});

function calculate() {
  const a = parseFloat(firstOperand);
  const b = parseFloat(currentInput);
  if (isNaN(a) || isNaN(b)) return;

  switch (operator) {
    case '+':
      currentInput = (a + b).toString();
      break;
    case '-':
      currentInput = (a - b).toString();
      break;
    case '*':
      currentInput = (a * b).toString();
      break;
    case '/':
      currentInput = (a / b).toString();
      break;
  }

  operator = '';
  waitingForSecondOperand = false;
  firstOperand = '';
}

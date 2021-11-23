// Define necessary calculator object
const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

// function to change value of displayNumber in user interface
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// Clear all calculator value to default
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// Update displayNumber while button's clicked
function updateNumber(number) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = number;
  } else {
    calculator.displayNumber += number;
  }
}

// Negative number button handler
function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }

  calculator.displayNumber *= -1;
}

// Function handler for + and - operation
function handleOperators(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    calculator.displayNumber = "0";
  } else {
    alert("Operator telah diklik. Silakan masukkan angka.");
  }
}

// Do the calculation handler
function doCalculation() {
    if (calculator.firstNumber || calculator.operator) {
        let result = 0;
        if (calculator.operator === "+") {
            result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
        } else if (calculator.operator === "-") {
            result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
        }

        const history = {
          firstNumber: calculator.firstNumber,
          secondNumber: calculator.displayNumber,
          operator: calculator.operator,
          result: result,
        }

        putHistoryToLocal(history);
        calculator.displayNumber = result;
        showHistory();
    } else {
        alert('Ups! kamu belum menetapkan operator');
    }
}

// Button event on click and update the displayNumber by each button pushed innerText
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperators(target.innerText);
      return;
    }

    if (target.classList.contains("equals")) {
      doCalculation();
      updateDisplay();
      return;
    }

    updateNumber(target.innerText);
    updateDisplay();
  });
}

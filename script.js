const MAX_DIGITS = 8;

const screenElement = document.getElementById("screenNum");
const equalityButton = document.getElementById("equality");
const pointButton = document.getElementById("point");
const clearEntryButton = document.getElementById("clearEntry");
const clearAllButton = document.getElementById("clearAll");

const numpadButtons = document.querySelectorAll(".numpad");
const operationsButtons = document.querySelectorAll(".opepad");

let a = ""; //first number
let b = ""; //second number
let operator = ""; //operator
let currentInput;
let currentDisplay = false;

function add(a, b) {
  return Number(a) + Number(b);
}
function subtract(a, b) {
  return Number(a) - Number(b);
}
function multiply(a, b) {
  return Number(a) * Number(b);
}
function divide(a, b) {
  return Number(a) / Number(b);
}

numpadButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    let number = button.getAttribute("data-value");
    if (currentDisplay) {
      clearAll();
      currentDisplay = false;
    }

    if (operator === "") {
      a += number;
      currentInput = a;
      screenElement.textContent = a;
    } else if (operator !== "") {
      b += number;
      currentInput = b;
      screenElement.textContent = a + operator + b;
    }
  });
});

operationsButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    let value = button.getAttribute("data-value");
    if (a !== "" && operator === "") {
      operator = value;
      screenElement.textContent = a + operator;
    } else if (a !== "" && b !== "") {
      operate(a, b, operator);
      operator = value;
      b = "";
      screenElement.textContent = currentInput + operator;
      a = currentInput;
    }
  });
});

equalityButton.addEventListener("click", function () {
  equal();
});

pointButton.addEventListener("click", function () {
  setPoint();
});

clearEntryButton.addEventListener("click", function () {
  clearEntry();
});

clearAllButton.addEventListener("click", function () {
  clearAll();
});

function equal() {
  operate(a, b, operator);
  currentDisplay = true;
}

function operate(a, b, operator) {
  if (operator === "+") {
    currentInput = add(a, b);
    console.log(currentInput);
  } else if (operator === "-") {
    currentInput = subtract(a, b);
  } else if (operator === "*") {
    currentInput = multiply(a, b);
  } else if (operator === "/") {
    if (b === "0") {
      console.log("ERROR: division by 0");
      alert("YO BUZZ LIGHTYEAR, DON'T DIVIDE BY 0");
      clearAll();
      return;
    } else {
      currentInput = divide(a, b);
    }
  }

  if (currentInput.toString().length > MAX_DIGITS) {
    currentInput = currentInput.toExponential(3 - 1);
  }

  screenElement.textContent = currentInput;
}

function setPoint() {
  if (operator === "") {
    if (!a.includes(".")) {
      a += ".";
      screenElement.textContent = a;
    }
  } else {
    if (!b.includes(".")) {
      b += ".";
    }
    screenElement.textContent = a + operator + b;
  }
}

function clearEntry() {
  if (operator === "") {
    a = screenElement.textContent;
    if (a.length > 1) {
      a = a.slice(0, -1);
      screenElement.textContent = a;
    } else {
      a = "";
      screenElement.textContent = "0";
    }
  } else {
    b = screenElement.textContent.slice(a.length + 1);
    if (b.length > 1) {
      b = b.slice(0, -1);
    } else {
      b = "";
    }
    screenElement.textContent = a + operator + b;
  }
}

function clearAll() {
  a = "";
  b = "";
  operator = "";
  currentInput = "";
  screenElement.textContent = "0";
}

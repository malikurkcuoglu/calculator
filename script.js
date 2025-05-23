let num1, num2, operator, displayNum;
const display = document.querySelector(".text");
const secondText = document.querySelector(".second-text");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const period = document.querySelector(".period");
let backspace = document.querySelector(".backspace");
let isPressed = false;
let isClear = true;

const undo = function () {
  if (display.textContent) {
    display.textContent = display.textContent.slice(0, -1);
    displayNum = display.textContent;
  }
};

const decimalSeperator = function () {
  if (!display.textContent.includes(".")) {
    period.classList.add("unavailable");
    if (!isClear) isClear = true;
    display.textContent += display.textContent === "" ? "0." : ".";
  }
};

const enterDigit = function (e) {
  if (!isClear) {
    display.textContent = "";
    isClear = true;
  }
  if (display.textContent.length < 17) {
    display.textContent += e.target.textContent;
    displayNum = display.textContent;
  }
};

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  if (b !== 0) return a / b;
  else return "ERR";
};
const operate = function (a, b, op) {
  switch (op) {
    case "+":
      return add(parseFloat(a), parseFloat(b));
      break;
    case "-":
      return subtract(parseFloat(a), parseFloat(b));
      break;
    case "/":
      return divide(parseFloat(a), parseFloat(b));
      break;
    case "*":
      return multiply(parseFloat(a), parseFloat(b));
      break;
  }
};

const pickOperator = function (e) {
  if (isPressed) {
    if (displayNum) {
      num2 = displayNum;
      let result =
        operate(num1, num2, operator).toString().length < 12
          ? operate(num1, num2, operator)
          : operate(num1, num2, operator).toPrecision(12);
      num1 = result;
      operator = e.target.textContent === "X" ? "*" : e.target.textContent;
      secondText.textContent = `${result} ${operator}`;
      display.textContent = "";
      num2 = null;
      displayNum = null;
    } else {
      operator = e.target.textContent === "X" ? "*" : e.target.textContent;
      secondText.textContent = `${num1} ${operator}`;
      display.textContent = "";
    }
  } else {
    if (displayNum) {
      num1 = displayNum;
      display.textContent = "";
      operator = e.target.textContent === "X" ? "*" : e.target.textContent;
      secondText.textContent = `${num1} ${operator}`;
      isPressed = true;
      displayNum = null;
    }
  }
  if (!display.textContent.includes(".")) {
    period.classList.remove("unavailable");
  }
};

const getResult = function () {
  if (operator) {
    if (displayNum === null || displayNum === undefined) {
      isPressed = false;
      secondText.textContent = "";
      displayNum = num1;
      display.textContent = num1;
      isClear = false;
      operator = "";
    } else {
      isPressed = false;
      num2 = displayNum;
      secondText.textContent = "";
      display.textContent =
        operate(num1, num2, operator).toString().length < 12
          ? operate(num1, num2, operator)
          : operate(num1, num2, operator).toPrecision(12);
      displayNum =
        operate(num1, num2, operator).toString().length < 12
          ? operate(num1, num2, operator)
          : operate(num1, num2, operator).toPrecision(12);
      isClear = false;
      operator = "";
    }
  }
  if (!display.textContent.includes(".")) {
    period.classList.remove("unavailable");
  } else {
    period.classList.add("unavailable");
  }
};

const clearDisplay = function () {
  num1 = null;
  num2 = null;
  isPressed = false;
  isClear = true;
  display.textContent = "";
  secondText.textContent = "";
  operator = "";
  period.classList.remove("unavailable");
};

digits.forEach((digit) => digit.addEventListener("click", enterDigit));
operators.forEach((op) => op.addEventListener("click", pickOperator));
equals.addEventListener("click", getResult);
clear.addEventListener("click", clearDisplay);
period.addEventListener("click", decimalSeperator);
backspace.addEventListener("click", undo);

let num1, num2, operator, displayNum;
const display = document.querySelector(".text");
const secondText = document.querySelector(".second-text");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
let isPressed = false;
let isClear = true;

digits.forEach((digit) =>
  digit.addEventListener("click", (e) => {
    if (!isClear) {
      display.textContent = "";
      isClear = true;
    }
    display.textContent += e.target.textContent;
    displayNum = display.textContent;
  })
);

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
      return add(Number(a), Number(b));
      break;
    case "-":
      return subtract(Number(a), Number(b));
      break;
    case "/":
      return divide(Number(a), Number(b));
      break;
    case "*":
      return multiply(Number(a), Number(b));
      break;
  }
};

operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    if (isPressed) {
      if (displayNum) {
        num2 = displayNum;
        let result = operate(num1, num2, operator);
        num1 = result;
        operator = e.target.textContent === "X" ? "*" : e.target.textContent;
        secondText.textContent = `${result}${operator}`;
        display.textContent = "";
        num2 = null;
        displayNum = null;
      } else {
        operator = e.target.textContent === "X" ? "*" : e.target.textContent;
        secondText.textContent = `${num1}${operator}`;
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
  })
);
equals.addEventListener("click", () => {
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
      display.textContent = operate(num1, num2, operator);
      displayNum = operate(num1, num2, operator);
      isClear = false;
      operator = "";
    }
  }
});
clear.addEventListener("click", () => {
  num1 = null;
  num2 = null;
  isPressed = false;
  isClear = true;
  display.textContent = "";
  secondText.textContent = "";
  operator = "";
});

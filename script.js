let num1, num2, operator, displayNum;
const display = document.querySelector(".text");
const secondText = document.querySelector(".second-text");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
let isPressed = false;

digits.forEach((digit) =>
  digit.addEventListener("click", (e) => {
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
      num2 = displayNum;
      let result = operate(num1, num2, operator);
      num1 = result;
      operator = e.target.textContent === "X" ? "*" : e.target.textContent;
      secondText.textContent = `${result}${operator}`;
      display.textContent = "";
      num2 = null;
    } else {
      num1 = displayNum;
      display.textContent = "";
      operator = e.target.textContent === "X" ? "*" : e.target.textContent;
      secondText.textContent = `${num1} ${operator}`;
      isPressed = true;
    }
  })
);
equals.addEventListener("click", () => {
  isPressed = false;
  num2 = displayNum;
  secondText.textContent = "";
  display.textContent = operate(num1, num2, operator);
});
clear.addEventListener("click", () => {
  num1 = null;
  num2 = null;
  isPressed = false;
  display.textContent = "";
  secondText.textContent = "";
  operator = "";
});

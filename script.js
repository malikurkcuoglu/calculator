let num1, num2, operator;
const display = document.querySelector(".text");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

digits.forEach((digit) =>
  digit.addEventListener(
    "click",
    (e) => (display.textContent += e.target.textContent)
  )
);

let displayNum = Number(display.textContent);

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
  Number(a);
  Number(b);
  switch (op) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "/":
      divide(a, b);
      break;
    case "*":
      multiply(a, b);
      break;
  }
};

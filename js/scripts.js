const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const devide = (a, b) => a / b;

function operate(a, b, op) {
  let result;
  switch (op) {
    case '+': {
      result = add(a, b);
      break;
    }
    case '-': {
      result = subtract(a, b);
      break;
    }
    case '*': {
      result = multiply(a, b);
      break;
    }
    case '/': {
      result = devide(a, b);
      break;
    }
  }
  return result;
}

function main() {
  let numbers = [];
  let operator;
  let display = document.querySelector('.calculator__display');
  const operateBtn = document.querySelector('.calculator__operateBtn');

  function wipeData() {
    display.textContent = '0';
    numbers = [];
    operator = '';
  }

  //num listener
  document.querySelectorAll('.calculator__numBtn').forEach((numBtn) => {
    numBtn.addEventListener('click', () => {
      if (display.textContent === '0' || Number(display.textContent) === numbers.at(-1)) {
        display.textContent = '';
      }

      display.textContent += numBtn.textContent;
    });
  });

  //op listener
  document.querySelectorAll('.calculator__opBtn').forEach((opBtn) => {
    opBtn.addEventListener('click', () => {
      if (+display.textContent !== numbers[0]) {
        numbers.push(+display.textContent); //check if operate was pressed
      }

      if (numbers.length >= 2) {
        let result = operate(numbers.at(-2), numbers.at(-1), operator);
        display.textContent = result;
        numbers.push(result);
      }

      operator = opBtn.textContent;

    });
  });

  operateBtn.addEventListener('click', () => {
    numbers.push(+display.textContent);

    if (numbers.length >= 2 && operator) {
      let result = operate(numbers.at(-2), numbers.at(-1), operator);
      display.textContent = result;
      numbers = [];
      numbers.push(result);
      operator = '';
    } else {
      wipeData();
    }
  });

  // clear button wipe all
  document.querySelector('.calculator__clearBtn').addEventListener('click', wipeData);
}

main();
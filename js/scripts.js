function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function devide(a, b) {
  return a / b;
}

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

let numbers = [];
let operator;
let display = document.querySelector('.calculator__display');
const operateBtn = document.querySelector('.calculator__operateBtn');

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
    numbers.push(+display.textContent);
    operator = opBtn.textContent;
  });
});

operateBtn.addEventListener('click', () => {
  numbers.push(+display.textContent);
  display.textContent = operate(numbers.at(-2), numbers.at(-1), operator);
});

// clear button wipe all
document.querySelector('.calculator__clearBtn').addEventListener('click', () => {
  display.textContent = '0';
  numbers = [];
  operator = '';
});

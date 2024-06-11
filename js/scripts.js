const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const devide = (a, b) => {
  return b === 0 ? 'Division by zero' : a / b;
};

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
  const backbtn = document.querySelector('.calculator__backBtn');

  function wipeData() {
    display.textContent = '0';
    numbers = [];
    operator = '';
  }

  function calc() {
    let result = operate(numbers.at(-2), numbers.at(-1), operator);
    
    // zero division handler
    if (result === 'Division by zero') {
      display.textContent = result;
      setTimeout(() => wipeData(), 1000);
      return;
    };

    result.toString().length > 12 ? (result = Number(result.toFixed(10))) : null;
    display.textContent = result;
    numbers = [];
    numbers.push(result);
  }

  //num listener
  document.querySelectorAll('.calculator__numBtn').forEach((numBtn) => {
    numBtn.addEventListener('click', () => {
      if (numBtn.textContent === '.') {
        if (display.textContent.includes('.')) return; // checking if . almost in display
      }

      if (display.textContent === '0' || Number(display.textContent) === numbers.at(-1)) {
        display.textContent = '';
      }
      if (display.textContent.length === 14) return; //disabled when oveflow
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
        calc();
      }
      operator = opBtn.textContent;
    });
  });

  operateBtn.addEventListener('click', () => {
    numbers.push(+display.textContent);

    if (numbers.length >= 2 && operator) {
      calc();
      operator = '';
    } else {
      wipeData();
    }
  });

  // clear button wipe all
  document.querySelector('.calculator__clearBtn').addEventListener('click', wipeData);

  //back btn 
  backbtn.addEventListener('click', () => {
    if (display.textContent) {  
      display.textContent = display.textContent.slice(0, -1);
    } 
   
    if (!display.textContent) {
      display.textContent = '0';
    }
    
  });
}

main();

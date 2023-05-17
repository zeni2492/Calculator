const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const percent = document.querySelector('.percent');
const plusMinus = document.querySelector('.pm');

let valueStrInMemory = null;
let operatorInMemory = null;

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (display.innerText != "" && item.id == "equal") {
      display.innerText = eval(display.innerText);
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    }
    else {
      display.innerText += item.id;
    }
  };
});



const getValueAsStr = () => display.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
      display.textContent += '.';
      return;
    }
  
    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr) {
      display.textContent =parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
      display.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
  };

percent.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
  });

  plusMinus.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();
  
    if (currentValueStr === '-0') {
      setStrAsValue('0');
      return;
    }
    if (currentValueNum >= 0) {
      setStrAsValue('-' + currentValueStr);
    } else {
      setStrAsValue(currentValueStr.substring(1));
    }
  });
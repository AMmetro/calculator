
//  get button from HTML by class
let actionBtns = document.querySelectorAll('.operation');
let numBtns = document.querySelectorAll('.number');
let equalsBtn = document.querySelector('.equals');
let delBtn = document.querySelector('.delete');
let clearBtn = document.querySelector('.clear');
let oldNumberString = document.querySelector('.oldNumber');
let curNumberString = document.querySelector('.curNumber');


let currentOperand = '';
let previousOperand = '';
let emptyReady = false;
let goingAction = undefined;  

 //  add curent number in to "allData" object
 addCurNumb=(number)=> {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
}

empty=()=> {
  currentOperand = '';
  previousOperand = '';
  action = undefined;
  goingAction = undefined;
}

 dell=()=> {
  currentOperand = currentOperand.toString().slice(0, -1);
}

findAction=(action)=> {
  if (currentOperand === '') return;
  if (action=="sqrt"){computeSqrt(action)
    return};
  if (previousOperand !== '' && previousOperand !== '') {
      compute(); 
    }
  goingAction = action;
  previousOperand = currentOperand;
  currentOperand = '';
}

computeSqrt=(action)=> {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;
  computation = Math.sqrt(current)
  emptyReady = true;
  currentOperand = computation;
  goingAction = undefined;
  previousOperand = '';
 }

compute=()=> {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
   switch (goingAction) {
    case 'xy':
   computation=Math.pow(prev,current)
     break
   case '+':
    computation = prev + current;
      break
    case '-':
      computation = prev - current;
      break
    case '*':
      computation = prev * current;
      break
    case '/':
      computation = prev / current;
      break
    default:
      return;
  }
  emptyReady = true;
  currentOperand = computation;
  goingAction = undefined;
  previousOperand = '';
}
// parse current number and send it to window
makeWindowNumber=(number)=> {
  const stringNumber = number.toString()  
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}

// rerender window with numbers 
rerenderWindow=()=> {
  curNumberString.innerText =
  makeWindowNumber(currentOperand)
  if (goingAction != null) {
   oldNumberString.innerText =
      `${makeWindowNumber(oldNumberString)} ${goingAction}`
  } else {
    oldNumberString = ''
  }
}




// when press button start working that part below and add eventListener to buttons
// afetr event happen start ececute eventLisener function
actionBtns.forEach(element => {
  element.addEventListener('click', () => {
    findAction(element.innerText);
    rerenderWindow();
   })
})

numBtns.forEach(element => {
     element.addEventListener("click", () => {
      if(previousOperand === "" &&
      currentOperand !== "" &&
      emptyReady) {
      currentOperand = "";
      emptyReady = false;
      }
      addCurNumb(element.innerText)
      rerenderWindow();
  })
})

equalsBtn.addEventListener('click', equalsBtnHand)
function equalsBtnHand() {
  compute();
  rerenderWindow();
}

clearBtn.addEventListener('click', clearBtnHand)
function clearBtnHand(){
  empty()
  rerenderWindow();
}

delBtn.addEventListener('click', delBtnHand)
function delBtnHand(){
  dell();
  rerenderWindow();
}
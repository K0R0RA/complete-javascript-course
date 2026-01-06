'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2025-12-31T14:11:59.604Z',
    '2026-01-03T17:01:17.194Z',
    '2026-01-05T23:36:17.929Z',
    '2026-01-06T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//======================
// Bankist Working Code
//======================
let currentAccount = '';
let currentTimer;
let sorted = false;

function createUsername(username) {
  return username
    .toLowerCase()
    .split(' ')
    .map(value => value[0])
    .join('');
}

function startLogoutTimer() {
  function tick() {
    // in each call, print remaining time to UI (labelTimer)
    let min = String(Math.floor(timeLimit / 60)).padStart(2, 0);
    let sec = String(timeLimit % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    // when 0 seconds, stop timer and logout user
    if (timeLimit == 0) {
      clearInterval(timer);
      currentAccount = '';
      updateDisplay();
    }
    timeLimit--;
  }
  //set time to 5 minutes
  let timeLimit = 120; //2 minutes
  // call timer every second
  tick();
  let timer = setInterval(tick, 1000);
  return timer;
}

function calcTotals() {
  currentAccount.balance = currentAccount.movements.reduce(
    (acc, value) => acc + value,
    0
  );
  currentAccount.withdrawals = currentAccount.movements
    .filter(value => value < 0)
    .reduce((sum, value) => sum + value, 0)
    .toFixed(2);
  currentAccount.deposits = currentAccount.movements
    .filter(value => value > 0)
    .reduce((sum, value) => sum + value, 0)
    .toFixed(2);
  currentAccount.interest = (
    currentAccount.balance *
    (currentAccount.interestRate / 100)
  ).toFixed(2);
  // console.log(currentAccount);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat(currentAccount.locale, {
    style: 'currency',
    currency: currentAccount.currency,
  }).format(amount);
}

function displayMovements() {
  containerMovements.innerHTML = '';
  let combinedMovsDates = currentAccount.movements.map((mov, i) => ({
    movement: mov,
    date: currentAccount.movementsDates.at(i),
  }));
  // console.log(combinedMovsDates);
  // let movs = sorted
  //   ? currentAccount.movements.slice().sort((a, b) => a - b)
  //   : currentAccount.movements;

  if (sorted) {
    combinedMovsDates.sort((a, b) => a.movement - b.movement);
  }

  combinedMovsDates.forEach(function (obj, i) {
    let { movement, date } = obj;
    let type = movement > 0 ? 'deposit' : 'withdrawal';
    // let dateFormatted = new Date(date).toLocaleDateString(
    //   currentAccount.locale
    // );
    let currentDate = new Date(date);
    // console.log(currentDate);
    let dateFormatted = new Intl.DateTimeFormat(currentAccount.locale).format(
      currentDate
    );
    // console.log(dateFormatted);
    let dayDelta = calcDaysPassed(new Date(), currentDate);
    // console.log(dayDelta);
    let displayDate = dateFormatted;
    if (dayDelta == 0) {
      displayDate = 'Today';
    } else if (dayDelta == 1) {
      displayDate = 'Yesterday';
    } else if (dayDelta <= 7) {
      displayDate = `${dayDelta} days ago`;
    }

    let html = ` 
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }: ${type} </div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatCurrency(movement)}</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = '#e8e8e8';
    }
  });
}

function displayStats() {
  //labelBalance.textContent = `${currentAccount.balance} ${currentAccount.currency}`;
  labelBalance.textContent = formatCurrency(currentAccount.balance);
  labelSumIn.textContent = formatCurrency(currentAccount.deposits);
  labelSumOut.textContent = formatCurrency(currentAccount.withdrawals);
  labelSumInterest.textContent = formatCurrency(currentAccount.interest);
}

function updateDisplay() {
  if (currentAccount != '') {
    containerApp.setAttribute('style', 'opacity: 1;');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }.`;
    let now = new Date();
    // labelDate.innerHTML = `${now.toLocaleDateString(
    //   currentAccount.locale
    // )}  ${now.toLocaleTimeString(currentAccount.locale)}`;
    let options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // ** PRO TIP **
    // to get the users browser locale
    // let locale = navigator.language;
    // *************

    //clear input fields and lose focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputTransferAmount.value = inputTransferTo.value = '';
    inputCloseUsername.value = '';
    inputClosePin.value = '';
    inputLoanAmount.value = '';
    document.activeElement.blur();
    calcTotals();
    displayMovements();
    displayStats();
  } else {
    containerApp.setAttribute('style', 'opacity: 0;');
    labelWelcome.textContent = 'Log in to get started';
  }
}

function checkLogin(username, pin) {
  let account = accounts.find(
    acc => acc.username === username.toLowerCase() && acc.pin.toString() === pin
  );
  if (account) {
    currentAccount = account;
    updateDisplay();
  } else alert('Invalid Login');
}
function transferMoney(target, amount) {
  // console.log(`Target: ${target}, Amount: ${amount}`);
  let targetAcct = isValidAccountByUsername(target);
  let today = new Date().toISOString();
  if (targetAcct) {
    targetAcct.movements.push(amount);
    currentAccount.movements.push(amount * -1);
    targetAcct.movementsDates.push(today);
    currentAccount.movementsDates.push(today);
    updateDisplay();
  }
}
function isValidAccountByUsername(account) {
  return accounts.find(acc => acc.username === account.toLowerCase());
}

//Event Handlers
accounts.forEach(value => {
  value.username = createUsername(value.owner);
});

btnLogin.addEventListener('click', e => {
  e.preventDefault(); //prevent form from submitting & reloading the page (submit button default behavior)
  let username = inputLoginUsername.value;
  let pin = inputLoginPin.value;
  checkLogin(username, pin);

  if (currentTimer) clearInterval(currentTimer);
  currentTimer = startLogoutTimer();
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  let transferTo = inputTransferTo.value;
  let transferAmount = Number(inputTransferAmount.value);
  let validTransferTo = isValidAccountByUsername(transferTo);
  if (
    validTransferTo &&
    validTransferTo != currentAccount.username &&
    transferAmount <= currentAccount.balance &&
    transferAmount > 0
  ) {
    transferMoney(transferTo, transferAmount);
  } else alert('That is not a valid transfer account.');
  clearInterval(currentTimer);
  currentTimer = startLogoutTimer();
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  let closeUser = inputCloseUsername.value;
  let closePin = Number(inputClosePin.value);
  if (
    closeUser === currentAccount.username &&
    closePin === currentAccount.pin
  ) {
    accounts.splice(
      accounts.findIndex(acc => acc.username === currentAccount.username),
      1
    );
    currentAccount = '';
    updateDisplay();
  } else {
    alert('Invalid login credentials.');
  }
});

//only grant a loan if there is at least a deposit > 10% of the loan requested
//introduced bug where you can keep granting yourself exponentially bigger loans.
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  let requestAmount = Number(inputLoanAmount.value);
  if (requestAmount > 0) {
    if (currentAccount.movements.some(value => value >= requestAmount * 0.1)) {
      setTimeout(function () {
        alert('Loan successfully granted.');
        currentAccount.movements.push(requestAmount);
        currentAccount.movementsDates.push(new Date().toISOString());
        updateDisplay();
      }, 5000);
    } else {
      alert(
        'There is not a deposit greater than 10% of the loan amount requested.'
      );
    }
  } else {
    alert('Loan request must be greater than 0.');
  }
  clearInterval(currentTimer);
  currentTimer = startLogoutTimer();
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  sorted = !sorted;
  updateDisplay();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//===========================================
// Video 181 Converting and Checking Numbers
//===========================================
// console.log(23 === 23.0); //JS expresses all numbers as float

// console.log(0.1 + 0.2); //0.30000000000000004 because infinite cannot be handled 3.333333...
// console.log(0.1 + 0.2 === 0.3); //false because of rounding errors (pc can't infinite number and rounds)

// //Conversion
// console.log(Number('23')); //explicit type conversion to Number()
// console.log(+'23'); //automatic type conversion when it interprets + operator

// //Parsing
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('e23', 10));

// console.log(Number.parseInt('2.5rem'));
// console.log(Number.parseFloat('2.5rem'));

// //Check if value is NaN
// console.log(Number.isNaN(+'e23')); //true
// console.log(Number.isNaN(20)); //false
// console.log(Number.isNaN(23 / 0)); //false
// console.log(23 / 0); //Infinity (special number type)

// //Check if value is a number
// console.log(Number.isFinite(20)); //true
// console.log(Number.isFinite(23 / 0)); //false

// //check if integer
// console.log(Number.isInteger(23)); //true
// console.log(Number.isInteger(23.0)); //true
// console.log(Number.isInteger(23.2)); //false

//============================
// Video 182 Math and Rouding
//============================
//Roots
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2)); //square root
// console.log(8 ** (1 / 3)); //cubic root

// console.log(Math.max(5, 18, '23', 11, 2)); //converts (23)
// console.log(Math.max(5, 18, '23px', 11, 2)); //but not parses (NaN)

// console.log(Math.min(5, 18, '23', 11, 2)); //2

// console.log(Math.PI);

// console.log(Math.floor(Math.random() * 6) + 1);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// console.log(randomInt(10, 20));
// console.log(randomInt(0, 3));

// //Rounding integers
// console.log(`round 23.3:  ${Math.round(23.3)}`);
// console.log(`round 23.9:  ${Math.round(23.9)}`);
// console.log(`ceil 23.3:  ${Math.ceil(23.3)}`);
// console.log(`ceil 23.9:  ${Math.ceil(23.9)}`);
// console.log(`floor 23.3:  ${Math.floor(23.3)}`);
// console.log(`floor 23.9:  ${Math.floor(23.9)}`);
// console.log(`trunc 23.3:  ${Math.trunc(23.3)}`);
// console.log(`trunc -23.3: ${Math.trunc(-23.3)}`);
// console.log(`floor -23.3: ${Math.floor(-23.3)}`);

// //Rounding decimals
// //wrap decimal in () then .toFixed(n) then +() to convert to Number
// console.log((2.7).toFixed(0)); //returns a string, not a number
// console.log((2.7).toFixed(3));
// console.log(+(2.345).toFixed(2)); //convert back to number with +

//==================================
// Video 183 The Remainder Operator
//==================================
// console.log(5 % 2); //modulo;even determinate
// function isEven(n) {
//   return n % 0 === 0;
// }

//==============================
// Video 184 Numeric Separators
//==============================
// //you can use underscores in numbers, ignored by the engine
// let diameter = 28_745_600_000;
// console.log(diameter);

// let cents = 345_99;
// console.log(cents);

// let transferFee = 15_00; //both 1500
// let transferFee2 = 1_500;

// //const PI = 3._1415; //numeric separators must be between numbers
// //console.log(PI);

// console.log(Number('23_000')); //NaN //numeric separators don't work as strings
// console.log(parseInt('230_000')); //only 230, not 230000

//===============================
// Video 185 Working with BigInt
//===============================
// Numbers are repesented as 64 bits,
// 53 of which are digits,
// the rest are storing decimal point position and sign

//Biggest number JS can safely represent
// Number.MAX_SAFE_INTEGER
// console.log(2 ** 53 - 1); //biggest number JS can represent

// BigInt n
//n transforms a regular 64 bit number to a BigInt type
// console.log(90071992547409910983487612389760982348n);
// //JS makes it a reg Number first, losing precision
// console.log(BigInt(90071992547409910983487612389760982348));

// //Operations
// console.log(10_000n + 10_000n);
// //cannot use Math. operators
// //console.log(Math.sqrt(16n)); //TypeError: can't convert BigInt to number

// //cannot mix BigInt and Number
// let huge = 23498719081223987n;
// let num = 23;
// //console.log(huge * num); //TypeError: can't convert BigInt to Number
// console.log(huge * BigInt(num)); //540470538868151701n

// console.log(20n > 15); //comparison operators work as expected
// console.log(20n === 20); //false, unless type is compared as well
// console.log(20n == 20); //true

// //Divisions
// console.log(10n / 3n); //Rounds to the nearest bigInt
// console.log(10 / 3);

//==========================
// Video 186 Creating Dates
//==========================
// let now = new Date();
// console.log(now);

// console.log(new Date('2025/10/11'));
// console.log(new Date('December 25, 1990'));

// // Z at the end == UTC time
// // Date will parse to the users local time by default though
// // account1.movementsDates[0] = '2019-11-18T21:31:17.178Z'
// // but is converted to localdate = Mon Nov 18 2019 16:31:17 GMT-0500 (Eastern Standard Time)
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(account1.movementsDates[0]).toUTCString());

// console.log(new Date(2037, 10 /*==Nov,!=Oct:month is 0 based*/, 31, 15, 23, 5));
// //will auto-correct to december 1st because november has 30 days not 31

// console.log(new Date(0)); //Jan 1 1970 (or Dec 31 1969 in EST)
// console.log(new Date(3 * 24 * 60 * 60 * 1000));
// //                   D * Hr * Mn * Sc * MS

// let future = new Date(2037, 10, 19, 12, 23); //builds on local time
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth()); //10   (0 based)
// console.log(future.getDay()); //4   (day of the week (0-based))
// console.log(future.toISOString()); //2037-11-19T17:23:00.000Z (converts to ISO UTC)
// console.log(future.getTime()); //MS since 1/1/1970
// console.log(new Date(2142264180000));

// //current timestamp for now
// console.log(Date.now());

//=================================
// Video 189 Operations with Dates
//=================================
// ** PRO TIP **
// Moment.js is a library for handling advanced date calculations like
// considering DST and time zones.
// *************
// let future = new Date(2027, 0, 6);
// let now = new Date();
// console.log(+future);

let calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

// console.log(calcDaysPassed(now, future));

//======================================
// Video 191 Internationalizing Numbers
//======================================
// let num = 2345616.44;
// let options = {
//   style: 'currency',
//   currency: 'EUR',
// };
// console.log(`US: ${new Intl.NumberFormat('en-US', options).format(num)}`);
// console.log(`Germany: ${new Intl.NumberFormat('de-DE', options).format(num)}`);
// console.log(`Syria: ${new Intl.NumberFormat('ar-SY').format(num)}`);

//==============================================
// Video 192 Timers: setTimeout and setInterval
//==============================================
// let ingredients = ['olives', 'spinach'];
// let pizzaTimer = setTimeout(
//   (ing1, ing2) =>
//     console.log(`Here is your pizza with ${ing1} and ${ing2}! 🍕`),
//   3000,
//   ...ingredients
// );
// //JS keeps processing along while counting in the backgroun async style
// console.log(`Waiting...`);
// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval(() => {
//   let now = new Date();
//   console.log(now);
// }, 1000);

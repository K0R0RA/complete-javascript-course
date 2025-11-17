'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  currency: '€',
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  currency: '$',
  type: 'basic',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  //movements: [],
  interestRate: 0.7,
  pin: 3333,
  currency: '$',
  type: 'standard',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  currency: 'CAD',
  type: 'standard',
};

const accounts = [account1, account2, account3, account4];
let currentAccount = '';
let sorted = false;

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
function createUsername(username) {
  return username
    .toLowerCase()
    .split(' ')
    .map(value => value[0])
    .join('');
}

function calcTotals() {
  currentAccount.balance = currentAccount.movements.reduce(
    (acc, value) => acc + value,
    0
  );
  currentAccount.withdrawals = currentAccount.movements
    .filter(value => value < 0)
    .reduce((sum, value) => sum + value, 0);
  currentAccount.deposits = currentAccount.movements
    .filter(value => value > 0)
    .reduce((sum, value) => sum + value, 0);
  currentAccount.interest = (
    currentAccount.balance *
    (currentAccount.interestRate / 100)
  ).toFixed(2);
  console.log(currentAccount);
}

function displayMovements() {
  containerMovements.innerHTML = '';
  let movs = sorted
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : currentAccount.movements;
  movs.forEach(function (val, i) {
    let type = val > 0 ? 'deposit' : 'withdrawal';
    let html = ` 
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }: ${type} </div>
          <div class="movements__value">${val} ${currentAccount.currency}</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function displayStats() {
  labelBalance.textContent = `${currentAccount.balance} ${currentAccount.currency}`;
  labelSumIn.textContent = `${currentAccount.deposits} ${currentAccount.currency}`;
  labelSumOut.textContent = `${currentAccount.withdrawals} ${currentAccount.currency}`;
  labelSumInterest.textContent = `${currentAccount.interest} ${currentAccount.currency}`;
}

function updateDisplay() {
  if (currentAccount != '') {
    containerApp.setAttribute('style', 'opacity: 1;');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }.`;
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
  console.log(`Target: ${target}, Amount: ${amount}`);
  let targetAcct = isValidAccountByUsername(target);
  if (targetAcct) {
    targetAcct.movements.push(amount);
    currentAccount.movements.push(amount * -1);
    updateDisplay();
  }
}
function isValidAccountByUsername(account) {
  return accounts.find(acc => acc.username === account.toLowerCase());
}
//Update Accounts

//display the value

//Update the display
//updateDisplay(account2);

//Event Handlers
accounts.forEach(value => {
  value.username = createUsername(value.owner);
});

btnLogin.addEventListener('click', e => {
  e.preventDefault(); //prevent form from submitting & reloading the page (submit button default behavior)
  let username = inputLoginUsername.value;
  let pin = inputLoginPin.value;
  checkLogin(username, pin);
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
      alert('Loan successfully granted.');
      currentAccount.movements.push(requestAmount);
      updateDisplay();
    } else {
      alert(
        'There is not a deposit greater than 10% of the loan amount requested.'
      );
    }
  } else {
    alert('Loan request must be greater than 0.');
  }
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  sorted = !sorted;
  updateDisplay();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//================================
// Video 149 Simple Array Methods
//================================
//          0    1    2    3    4
// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// //         -5   -4   -3   -2   -1
// // !mutate = These DO NOT alter the original array
// console.log(arr.slice(2)); //left to right
// console.log(arr.slice(2, 4)); //end index not included
// console.log(arr.slice(-1)); //right to left
// console.log(arr.slice(1, -1));
// console.log([...arr]);

// // SPLICE
// // mutates = alters the original array
// //console.log(arr.splice(2)); //capture everything before index 2
// // arr.splice(-1); //same a pop()
// // arr.splice(1, 2);
// console.log(arr); //original array altered

// //REVERSE
// // mutates
// let arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// //CONCAT
// // !mutate
// let letters = arr.concat(arr2);
// console.log(letters);
// //same as
// console.log([...arr, ...arr2]);

// //JOIN
// console.log(letters.join(' - '));

//=============================
// Video 150 The New at Method
//=============================
// let arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// //the at method let's you use negative indexing and can be chained
// //!mutable
// console.log(arr[arr.length - 1]);
// console.log(arr.at(-1));
// //the at method also works on strings
// console.log('casey'.at(2));

//===================================
// Video 151 Looping Arrays: forEach
//===================================
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //for of loop
// //for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   // to add a counter we can access we loop over movement.entries
//   if (movement > 0) console.log(`${i + 1}: You deposited ${movement}`);
//   else console.log(`${i + 1}: You withdrew ${Math.abs(movement)}`);
// }
// //forEach loop
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) console.log(`${index + 1}: You deposited ${movement}`);
//   else console.log(`${index + 1}: You withdrew ${Math.abs(movement)}`);
// });

//======================================
// Video 152 forEach with Maps and Sets
//======================================
// //Map (key,value array)
// const currencies = new Map([
//   //key,  value
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// //Set (distinct items of array)
// let currenciesUnique = new Set(['USD', 'BBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// // a set doesn't have indexs or keys so it's the same as value
// // but the developers decided to keep the same signature of value,index,array||value,key,map
// currenciesUnique.forEach(function (value, _, map) {
//   //_ is a throwaway paramter
//   console.log(`${_}: ${value}`);
// });

//=====================================================
// Video 156 Data Transformations: map, filter, reduce
//=====================================================
// Map: Returns a new array containing the results of applying an operation on all
//   original array methods.
// arr[3,1,4,3,2] => map: current * 2 => arr2[6,2,8,6,4]
//
// Filter: Returns a new array containing the array elements that passed a
//   specified test condition.
// arr[3,1,4,3,2] => filter: current > 2 => arr2[3,4,3]
//
// Reduce: boils (reduces) all array elements down to one single value (ie: adding
//   all elements together)
// arr[3,1,4,3,2] => reduce: acc + current => 13

//==========================
// Video 157 The map Method
//==========================
// //functional programming paradigm
// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUSD = 1.1;
// let movementsUSD = movements.map(function (movement) {
//   return Math.round(movement * eurToUSD);
// });
// //arrow version of the same thing
// //but many people argue that arrow functions are bad for semantics
// let movementsUSDArrow = movements.map(movement =>
//   Math.round(movement * eurToUSD)
// );

// let moveDesc = movements.map(
//   (movement, i) =>
//     `${i + 1}: You ${movement > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       movement
//     )}`
// );
// console.log(moveDesc.join('\n'));
// //Same thing with for(x of y[])
// //
// let newArr = [];
// for (let movement of movements) {
//   newArr.push(Math.round(movement * eurToUSD));
// }
// console.log(newArr);

//=============================
// Video 159 The filter Method
//=============================
// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// let deposits = movements.filter(value => value > 0);
// let withdrawals = movements
//   .filter(value => value < 0)
//   .map(value => Math.abs(value));
// console.log(deposits);
// console.log(withdrawals);

//=============================
// Video 160 The reduce Method
//=============================
// //let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// let movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];
// //reduce() takes a different 1st param (than value,index,arr) of an accumulator
// //  it also takes an optional 2nd param after the callbackFunc for the initalValue
// let balance = movements.reduce((acc, value) => acc + value, 0);
// console.log(balance);

// let maxValue = movements.reduce(
//   (acc, value) => (value > acc ? value : acc),
//   movements[0]
// );
// console.log(maxValue);\

//===========================
// Video 164 The find Method
//===========================
// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //Loops over the array and retrieves the 1st element of the array that satisfies
// // the callback function's condition. find() only returns a single value, not an array.
// // callback function must return a boolean like filter()
// let firstWithdrawal = movements.find(value => value < 0);
// console.log(firstWithdrawal);

// console.log(accounts);

// //Very powerful for searching large array structure of objects with properties
// let account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

//==================================================
// Video 168 The findLast and findLast Index Method
//==================================================
// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// console.log(movements.findLast(acc => acc < 0));

// console.log(
//   `Your latest large deposit of $${movements.findLast(acc => acc > 2000)} was ${
//     movements.length - movements.findLastIndex(acc => acc > 2000)
//   } transactions ago`
// );

//======================================
// Video 169 The some and every Methods
//======================================
// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// let deposit = value => value > 0;

// //includes() tests for exact equality
// console.log(movements.includes(-400));

// //some() tests on boolean condition
// console.log(movements.some(deposit));

// //every() tests if every element passes boolean condition
// console.log(movements.every(deposit));
// console.log(account4.movements.every(deposit));

//========================================
// Video 170 The flat and flatMap Methods
//========================================
// let arr = [[1, 2, 3], [4, 5, [0, 0, 0]], 7, 8];
// //flat(): flattens a nested array up to to N?=1 depth
// console.log(arr.flat());
// console.log(arr.flat(2));
// //console.log(arr.flatMap);

// let allBankTransactions = accounts.flatMap(account => account.movements);
// console.log(allBankTransactions);
// //flatMap only goes to depth N=1.

// let bankTotal = allBankTransactions.reduce((sum, value) => sum + value, 0);
// console.log(bankTotal);

//===========================
// Video 172: Sorting Arrays
//===========================
// sort() mutates original array, converts everything (nums) to string, then sorts A-Z
// let names = ['Casey', 'Derek', 'Zach', 'Adam'];
// console.log(names);
// console.log(`sort() ed: {names.sort()}`);

// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// console.log(`sort() ed 'numbers': ${movements.sort()}`);

// //sort() can take a cb function to control sorting
// //Ascending Sort
// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (a < b) return -1;
// // });
// //which can be simplified to
// movements.sort((a, b) => a - b);
// console.log(movements);

// //Descending Sort
// // movements.sort((a, b) => {
// //   if (a < b) return 1;
// //   if (a > b) return -1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);

//===========================
// Video 173: Array Grouping
//===========================
// //groups values in an array based on a condition
// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// let groupedMovements = Object.groupBy(movements, value =>
//   value > 0 ? 'deposits' : 'withdrawals'
// );
// console.log(groupedMovements);
// console.log(groupedMovements.deposits);
// console.log(groupedMovements.withdrawals);

// let groupedByActivitiy = Object.groupBy(accounts, account => {
//   let movementCount = account.movements.length;
//   if (movementCount >= 8) return 'extremely active';
//   else if (movementCount >= 4) return 'very active';
//   else if (movementCount >= 1) return 'active';
//   else return 'inactive';
// });
// console.log(groupedByActivitiy);

// let groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
// //({ type }) is the destructuring of account.type
// //same as
// //let groupedAccounts = Object.groupBy(accounts, account => account.type)
// console.log(groupedAccounts);

//=====================================================
// Video 174: More Ways of Creating and Filling Arrays
//=====================================================
// let arr = [1, 2, 3, 4, 5];
// console.log(new Array(1, 2, 3, 4, 5, 6));

// // Create an empty array of 7 length, not a x = [7]
// let x = new Array(7);
// console.log(x);
// console.log(x.map(() => 5));

// // .fill() fills an array with a specified value
// x.fill(1, 3, 5);
// console.log(x);
// arr.fill(10, 2, 4); //include index 2, up to but not including index 4
// console.log(arr);

// // .from() constructs an array using a cb function to determine
// let arr2 = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(arr2);

// let diceRolls = Array.from({ length: 100 }, () => Math.ceil(Math.random() * 6));
// console.log(diceRolls);
// let diceResults = Object.groupBy(diceRolls, roll => roll);
// console.log(diceResults);

//Let's get movements from the UI, not the object by the node list
// labelBalance.addEventListener('click', e => {
//   let movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   ).map(val => Number(val.textContent.replace(/\s\D+/gim, '')));
//   console.log(movementsUI);

//   let movementsUI2 = [...document.querySelectorAll('.movements__value')];
//   let val2 = movementsUI2.map(val =>
//     Number(val.textContent.replace(/\s\D+/gim, ''))
//   );
//   console.log(val2);
// });

//===============================================================================
// Video 175: Non-destructive Alternatives: toReverse, toSorted, toSpliced, with
//===============================================================================
// //non-destructive means it does not mutate the original array
// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// // movements.reverse(); //destructive
// // console.log(movements);

// // .toReversed()
// //can manually achieve this with .slice().reverse()
// console.log(movements.toReversed());
// console.log(movements);

// // destructive value changes
// //movements[1] = 2000;
// console.log(movements);
// // non-destructive
// let newMovements = movements.with(1, 2000);
// console.log(newMovements);
// console.log(movements);

//===========================================
// Video 176: When to use which array method
//===========================================
/*
+++++++++++++++++++
  Array.Methods()
+++++++++++++++++++
To mutate original? (should be avoided)
  add to original?
    .push (end) 
    .unshift (beginning)
  remove from original?
    .pop (end)
    .shift (start)
    .splice (any)
  other?
    .reverse
    .sort
    .fill
-------------------------------------------
A new Array() based on the original?
  same length as original?
    .map (loop) 
  filtered using condition? 
    .filter
  taking a portion of the original?
    .slice
  with one item replaced? 
    .with
  flattened?
    .flat
    .flatMap
  reversed?
    toReveresed
  sorted? 
    toSorted
  with deleted items?
    toSpliced
  joining 2 arrays? 
    .concat
-------------------------------------------
An array index?
  based on value? 
    .indexOf
  based on test condition? 
    .findIndex
    .findLastIndex
-------------------------------------------
An array element? 
  based on test condition?
    .find
    .findLast
  based on position?
    .at
-------------------------------------------
Know if an array includes?
  based on value?
    .includes
  based on test condition?
    .some (or)
    .every (and)
-------------------------------------------
To a new string?
  based on a separator?
    .join
-------------------------------------------
To Transform a value?
  based on accumulator?
    .reduce 
      //single value of any type: number, string, boolean, or 
      //even new Array or Object
-------------------------------------------
To just loop array? 
  based on callback
    .forEach (does not create new array or value (void), just loops over it)

+++++++++++++++
  Array Tools
+++++++++++++++
Grouping an array by categories
  Object.groupBy
Creating a new array from scratch
  Array.from({length:n},(_,i)=>i))
Creating a new array from scratch with n empty positions (use with .fill)
  new Array(n)
Joining 2 or more arrays (spread operator)
  [...arr1,...arr2]
Creating a new array containing distinct values of arr
  [...new Set(arr)]
Creating a new array containing distinct values of both arr1 and arr2
  [...new Set(arr1).intersection(new Set(arr2))]


///////////////////////////////////////////////////////////////////////////////
// Challenges
///////////////////////////////////////////////////////////////////////////////

//=====================
// Coding Challenge #1
//=====================
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). 
For now, they are just interested in knowing whether a dog is an adult or a puppy. 
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less 
than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually 
    have cats, not dogs! So create a shallow copy of Julia's array, and remove 
    the cat ages from that copied array (because it's a bad practice to mutate 
    function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's 
    an adult ("Dog number 1 is an adult, and is 5 years old") 
    or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// function checkDogs(dogsJulia, dogsKate) {
//   //1 remove cats
//   let noCats = dogsJulia.slice(1, -2);
//   console.log(noCats);
//   //2 combine with Kate's dogs
//   let allDogs = noCats.concat(dogsKate);
//   console.log(allDogs);
//   allDogs.forEach(function (val, i, arr) {
//     let dog = val < 3 ? 'a puppy' : 'an adult';
//     console.log(`Dog number ${i + 1} is ${dog} at ${val} years old`);
//   });
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//======================================================
// Coding Challenge #2 & #3 (with chaining/arrow funcs)
//======================================================
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to 
convert dog ages to human ages and calculate the average age of the dogs in 
their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
 ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula:
   if the dog is <= 2 years old, humanAge = 2 * dogAge. 
   If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as
   keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
   from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
*/

// let testData1 = [5, 2, 4, 1, 15, 8, 3];
// let testData2 = [16, 6, 10, 5, 6, 1, 4];

// function calcAverageHumanAge(ages) {
//   return ages
//     .map(value => (value <= 2 ? value * 2 : 16 + value * 4))
//     .filter(value => value >= 18)
//     .reduce((avg, value, i, arr) => avg + value / arr.length, 0);
// }

// console.log(testData1);
// console.log(calcAverageHumanAge(testData1));

// console.log(testData2);
// console.log(Math.round(calcAverageHumanAge(testData2)));

//=====================
// Coding Challenge #4
//=====================
/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
// const breeds = [
//   {
//     breed: 'German Shepherd',
//     averageWeight: 32,
//     activities: ['fetch', 'swimming'],
//   },
//   {
//     breed: 'Dalmatian',
//     averageWeight: 24,
//     activities: ['running', 'fetch', 'agility'],
//   },
//   {
//     breed: 'Labrador',
//     averageWeight: 28,
//     activities: ['swimming', 'fetch'],
//   },
//   {
//     breed: 'Beagle',
//     averageWeight: 12,
//     activities: ['digging', 'fetch'],
//   },
//   {
//     breed: 'Husky',
//     averageWeight: 26,
//     activities: ['running', 'agility', 'swimming'],
//   },
//   {
//     breed: 'Bulldog',
//     averageWeight: 36,
//     activities: ['sleeping'],
//   },
//   {
//     breed: 'Poodle',
//     averageWeight: 18,
//     activities: ['agility', 'fetch'],
//   },
// ];

// //1. Average weight of a husky
// let huskyWeight = breeds.find(dog => dog.breed === 'Husky').averageWeight;
// console.log(huskyWeight);
// //2. Dog that likes both "running" and "fetch" ("dogBothActivities" variable)
// let dogBothActivities = breeds.find(
//   dog => dog.activities.includes('fetch') && dog.activities.includes('running')
// ).breed;
// console.log(dogBothActivities);
// //3. Create array "allActivities" of all the activities of all the dog breeds
// let allActivities = breeds.flatMap(dog => dog.activities);
// console.log(allActivities);
// //4. Unique allActivies
// let uniqueActivities = [...new Set(allActivities)];
// console.log(uniqueActivities);
// //5. Many dog breeds like to swim. What other activities do these dogs like?
// //Store all the OTHER activities these breeds like to do, in a unique array called
// // "swimmingAdjacent".
// let swimmingAdjacent = [
//   ...new Set(
//     breeds
//       .filter(dog => dog.activities.includes('swimming'))
//       .flatMap(dog => dog.activities.filter(act => act != 'swimming'))
//   ),
// ];
// console.log(swimmingAdjacent);

// //6. Do all breeds weight 10k or more?
// console.log(breeds.every(dog => dog.averageWeight > 10));

// //7. Are there any breeds that are "active"? "Active" means that the dog
// // has 3 or more activities.
// // Log to the console whether "true" or "false".
// console.log(breeds.some(dog => dog.activities.length >= 3));

// //bonus Average Weight of the heaviest breed that likes to fetch
// let heaviest = breeds
//   .filter(dog => dog.activities.includes('fetch'))
//   .map(dog => dog.averageWeight)
//   .reduce((max, curr) => (curr > max ? curr : max));
// console.log(heaviest);

//=====================
// Coding Challenge #5
//=====================
/* 
Julia and Kate are still studying dogs. This time they are wanting to figure out 
if the dogs in their care are eating too much or too little food.

- Formula for calculating recommended food portion: 
recommendedFood = weight ** 0.75 * 28. 
(The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the
    recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within
    a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the 
  recommended food portion (recFood) and add it to the object as a new property. 
  Do NOT create a new array, simply loop over the array (We never did this 
  before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too 
  little. HINT: Some dogs have multiple users, so you first need to find Sarah
  in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) 
  and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: 
  "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and 
  Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food
  that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food 
  (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food 
  (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little',
  based on whether they are eating too much, too little or the exact amount of food,
  based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. 
  Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary
  lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: 
  current > (recommended * 0.90) && current < (recommended * 1.10). 
  Basically, the current portion should be between 90% and 110% of the 
  recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1 Caclulate recommended food and add to dogs objects.
dogs.map(dog => {
  dog.recFood = Math.round(dog.weight ** 0.75 * 28);
});
console.log(dogs);

//2 Sarah's dog eating too much or too little?
let sarahDog = dogs.find(({ owners }) => owners.includes('Sarah'));
console.log(sarahDog);
console.log(
  sarahDog.curFood > sarahDog.recFood ? 'Too much food' : 'Not too much food'
);

//3 Owners of too much and too little
dogs.map(dog => {
  //current > (recommended * 0.90) && current < (recommended * 1.10)
  if (dog.curFood > dog.recFood) dog.amount = 'overfed';
  else if (dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1)
    dog.amount = 'fed';
  else dog.amount = 'underfed';
});
console.log(dogs);
let ownersTooMuch = dogs
  .filter(dog => dog.amount == 'overfed')
  .flatMap(dog => dog.owners);
let ownersTooLittle = dogs
  .filter(dog => dog.amount == 'underfed')
  .flatMap(dog => dog.owners);
console.log(ownersTooMuch);
console.log(ownersTooLittle);

//4 Make 3s output nice
console.log(`${ownersTooMuch.join(' and ')}'s dogs eat too much.`);
console.log(`${ownersTooLittle.join(' and ')}'s dogs eat too little.`);

//5 Any dog eating good?
console.log(dogs.some(({ amount }) => amount == 'fed')); //true

//6 All dogs eating good?
console.log(dogs.every(({ amount }) => amount == 'fed')); //false

//7 and 8 Grouping dogs by fed amount
let groupedDogs = Object.groupBy(dogs, ({ amount }) => amount);
console.log(groupedDogs);
let goodDogs = groupedDogs['fed'];
console.log(goodDogs);

//9 Group dogs by owner amount
let groupedByOwner = Object.groupBy(dogs, ({ owners }) => owners.length);
console.log(groupedByOwner);

//10 sort by recommended food portion asc
let sortedDogs = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(sortedDogs);

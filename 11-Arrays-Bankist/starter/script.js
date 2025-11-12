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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  currency: '$',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  currency: '$',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  currency: 'CAD',
};

const accounts = [account1, account2, account3, account4];

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
function calcTotals(account) {
  account.balance = account.movements.reduce((acc, value) => acc + value, 0);
  account.withdrawals = account.movements
    .filter(value => value < 0)
    .reduce((sum, value) => sum + value, 0);
  account.deposits = account.movements
    .filter(value => value > 0)
    .reduce((sum, value) => sum + value, 0);
  account.interest = (account.balance * (account.interestRate / 100)).toFixed(
    2
  );
  console.log(account);
}

function displayMovements(account) {
  containerMovements.innerHTML = '';
  account.movements.forEach(function (val, i) {
    let type = val > 0 ? 'deposit' : 'withdrawal';
    let html = ` 
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }: ${type} </div>
          <div class="movements__value">${val} ${account.currency}</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
function displayBalance(account) {}
function displayStats(account) {
  labelBalance.textContent = `${account.balance} ${account.currency}`;
  labelSumIn.textContent = `${account.deposits} ${account.currency}`;
  labelSumOut.textContent = `${account.withdrawals} ${account.currency}`;
  labelSumInterest.textContent = `${account.interest} ${account.currency}`;
}

function updateDisplay(account) {
  calcTotals(account);
  displayMovements(account);
  displayStats(account);
}

//Update Accounts
accounts.forEach(value => {
  value.username = createUsername(value.owner);
});

//display the value

//Update the display
updateDisplay(account2);

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
// console.log(maxValue);

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

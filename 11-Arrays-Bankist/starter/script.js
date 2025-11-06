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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
function displayMovements(movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (val, i) {
    let type = val > 0 ? 'deposit' : 'withdrawal';
    let html = ` 
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }: ${type} </div>
          <div class="movements__value">${val}</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

displayMovements(account1.movements);

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

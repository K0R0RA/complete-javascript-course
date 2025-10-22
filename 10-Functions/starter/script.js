'use strict';

//============= Work Along ========================================================================
//==============================
// Video 135 Default Parameters
//==============================
// const bookings = [];

// function createBooking(
//   flightNum,
//   numPassengers = 1,
//   price = numPassengers * 199.0
// ) {
//   //ES5 (old-way) defining defaults with short-circuiting
//   //   numPassengers = numPassengers || 1;
//   //   price = price || 95.0;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// }

// createBooking('LH123');
// createBooking('LH123', 2, 300.3);
// createBooking('LH123', 3);
// createBooking('LH456', undefined, 1000); //how to use the default value of a middle parameter
//=================================================
// video 136 Passing Arguments: Value vs Reference
//=================================================
// let flight = 'LH234';
// let casey = {
//   name: 'Casey R.',
//   passport: 23406591069,
// };

// function checkIn(flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mrs.' + passenger.name; //pass a reference type (memory location)

//   if (passenger.passport === 23406591069) alert('check in');
//   else alert('Wrong passport!');
// }

// checkIn(flight, casey);
// console.log(flight);
// console.log(casey);

// // const flightNum = flight;
// // const passenger = casey;
// // console.log(flightNum);
// // console.log(passenger);

// //Javascript only passes by value even though it looks like passing by reference.
// //Objects pass by reference, but that reference is only the value of a memory address.

// function newPassport(person) {
//   person.passport = Math.trunc(Math.random() * 10000000000);
// }
// newPassport(casey);
// console.log(flight);
// console.log(casey);
// checkIn(flight, casey);

//==================================================
// Video 137 First-Class and Higher-Order Functions
//==================================================
//Javascript treats functions as first-class citizens meaning that functions are simply values.
//Functions are just another "type" of object.
//This means you can store functions in variables like
//    const add = (a,b) => a + b;
//OR object properties like:
//  const counter = {
//    value: 23,
//    inc: function() {this.value++;}
//  };
//You can also pass functions as arguments to OTHER functions like:
//  const great = () => console.log('Hey Casey');
//  btnClose.addEventListener('click',greet);
//You can also Return functions FROM functions
//And call methods on functions like:
//  counter.inc.bind(someOtherObject);

//Higher-order function is a function that receives another function as an argument
//  that returns a new function or both
//This is only possible because of first-class functions.
//1. Function that receives another function
//  const greet = () => console.log('Hey Casey');
//  btnClose.addEventListener('click',greet);
//  where addEventListener() is the higher order function
//  and greet() is the callback function
//2. Function that returns another function
//  function count() {   /*higher-order function*/
//    let counter = 0;
//    return function() { /*returned function*/
//      counter++;
//    }
//}

//===================================================
// Video 138 Functions Acceepting Callback Functions
//===================================================
// const oneWord = function (str) {
//   return str.replace(/\s/g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //the higher order fucntion
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);
//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('javascript is the best!', upperFirstWord);
// transformer('javascript is the best!', oneWord);

// const high5 = function () {
//   console.log('👋');
// };
// document.body.addEventListener('click', high5);

// ['Casey', 'Bob', 'Cecil'].forEach(high5);

//JS uses callback functions all the time
//it makes it easy to split up code to reusable, interconnected parts
//callback functions allow us to create abstration
// abstraction meaning we hide the details of code implementation

//=========================================
// Video 139 Functions Returning Functions
//=========================================
// function greet(greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// }

// const greeting = greet('Hey!');
// greeting('Casey');

// greet('Hello,')('Casey');
// const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
// greetArrow('Heyo')('Casey');
// //functions returning other programming is a significant part of functional programming paradigm.

//======================================
// Video 140 The call and apply Methods
//======================================
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // enhanced object literal syntax of defining method (sans function keyword)
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: this.iataCode + flightNum, name: name });
  },
};

const book = lufthansa.book;
lufthansa.book('239', 'Casey');
lufthansa.book('635', 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss',
  iataCode: 'SW',
  bookings: [],
};

// This doesn't work because this is undefined in function calls, only methods
//book(468, 'Bobert');
//the 1st argument of the call method explicitly sets the this keyword scope of the function
book.call(eurowings, 468, 'Robin Bobert');
console.log(eurowings);
book.call(lufthansa, 239, 'Ashley');

// Apply method doesn't receive a list of arguments, but an array
const flightData = [239, 'George Cooper'];
//book.apply(eurowings, flightData);
//console.log(eurowings);
// Apply isn't used in modern javascript anymore because of call and the spread operator
book.call(eurowings, ...flightData);

//===========================
// Video 141 The bind Method
//===========================
//Bind allows us to set the this keyword of a function without immediately
// calling the function like apply(). It returns a new function where the this keyword is bound.
const bookEW = book.bind(eurowings);
const bookSW = book.bind(swiss);
bookEW(231, 'Steven Williams');
bookSW(444, 'Bjorn Ironside');

console.log(swiss);

//binding parameters beforehand is called partial application meaning some parameters are predefined
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Ingrid');

//Binding with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * (rate / 100);
console.log(addTax(10, 200));

const addVAT = addTax.bind(null, 23);
//same as addVAT = value => value + value * (23/100)
console.log(addVAT(200));

const addTaxRate = rate => value => value + value * (rate / 100);
const addVAT2 = addTaxRate(23);
console.log(addVAT2(100));
//============= Challenges ========================================================================

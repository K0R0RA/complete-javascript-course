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
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // enhanced object literal syntax of defining method (sans function keyword)
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: this.iataCode + flightNum, name: name });
//   },
// };

// const book = lufthansa.book;
// lufthansa.book('239', 'Casey');
// lufthansa.book('635', 'John Smith');
// console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const swiss = {
//   airline: 'Swiss',
//   iataCode: 'SW',
//   bookings: [],
// };

// // This doesn't work because this is undefined in function calls, only methods
// //book(468, 'Bobert');
// //the 1st argument of the call method explicitly sets the this keyword scope of the function
// book.call(eurowings, 468, 'Robin Bobert');
// console.log(eurowings);
// book.call(lufthansa, 239, 'Ashley');

// // Apply method doesn't receive a list of arguments, but an array
// const flightData = [239, 'George Cooper'];
// //book.apply(eurowings, flightData);
// //console.log(eurowings);
// // Apply isn't used in modern javascript anymore because of call and the spread operator
// book.call(eurowings, ...flightData);

// //===========================
// // Video 141 The bind Method
// //===========================
// //Bind allows us to set the this keyword of a function without immediately
// // calling the function like apply(). It returns a new function where the this keyword is bound.
// const bookEW = book.bind(eurowings);
// const bookSW = book.bind(swiss);
// bookEW(231, 'Steven Williams');
// bookSW(444, 'Bjorn Ironside');

// console.log(swiss);

// //binding parameters beforehand is called partial application meaning some parameters are predefined
// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('Ingrid');

// //Binding with Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial application
// const addTax = (rate, value) => value + value * (rate / 100);
// console.log(addTax(10, 200));

// const addVAT = addTax.bind(null, 23);
// //same as addVAT = value => value + value * (23/100)
// console.log(addVAT(200));

// const addTaxRate = rate => value => value + value * (rate / 100);
// const addVAT2 = addTaxRate(23);
// console.log(addVAT2(100));

//=========================================
// Video 143 Immediately Invoked Functions
//=========================================
// const runOnce = function () {
//   console.log('This can be called repeatedly');
// };
// runOnce();
// runOnce();

// //IIFE (pronounced iffy)
// //Trick javascript into parsing as an expression by wrapping in ()
// (function () {
//   console.log('This will really only run once');
// })(); //followed by (); to immediately call it

// //The same works for arrow functions
// (() => console.log('IIFE Arrow Function'))();

//====================
// Video 144 Closures
//====================
//Closures are not created manually and happens automatically in certain situations.
// function secureBooking() {
//   let passengerCount = 0;
//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// }

//booker exists in the global scope
//but it has access to the memory of the secureBooking function when it was created
// let booker = secureBooking();
// booker();
// booker();
// booker();
//How can it update the passengerCount from secureBooking?
//Because passengerCount was moved to the heap memory because of a closure.

//Variable environment(VE) that popped off the stack after secureBooking()
//   passengerCount=0
//Because of closure, VE was moved to heap and NOT garbage collected after execution.
//A function always has access to the VE of the exectuion context (EC) in which
//  it was created, even after that EC is gone.
//Closure: VE attached to the function, exactly as it was at the time and place
//  the function was created.
//  OR
//  The closed-over variable environment of the exectuion context in which a function
//    was created, even after that execution context is gone.
//  A closure gives a function access to all the variable of its parent function, even
//    after that parent function has returned. The function keeps a reference to its
//    outer scope, which preserves the scope chain through time.
//  A closure makes sure that a function doesn't loose connection to variables that
//    existed at the functions birthplace. (like a person attached to their hometowm)
//  A close is like a backpack that a function carries around wherever it goes. This
//    backpack has all the variables that were present in the environment where the
//    function was created.
//We do NOT have to create closures manually, this is a JS feature that happens
//  automatically. We can't even access closed-over variables explicitly. A closure
//  is NOT a tangible JS object.

//The closure backpack can be viewed in the debugger console by using dir() and
//  checking out the [[Scopes]] internal variable.
// Double Brackets [[internalProperty]] is an internal property that cannot be accessed
// console.dir(booker);

//=================================
// Video 145 More Closure Examples
//=================================
// let f;
// function g() {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// }
// function h() {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// }

// g();
// f(); //f() closed over the VE of the g() function
// h();
// f(); //f()) reassigned in h(), closed over the VE of h() now.
// console.dir(f);

// function boardPassengers(n, wait) {
//   const perGroup = n / 3;
//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers.`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers.`);
//   }, 1000 * wait);
//   console.log(`Will start boarding in ${wait} seconds.`);
// }
// const perGroup = 1000;
// boardPassengers(180, 3);

//============= Challenges ========================================================================
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. 
  The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. 
  If type is 'array', simply display the results array as it is, using console.log(). 
  This should be the default option. 
  If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
// const poll = {
//   questions: ['0: Python', '1: Rust', '2: C#', '3: Java'],
//   answers: [0, 0, 0, 0],
//   registerNewAnswer() {
//     console.log(this);
//     console.log(this.answers);
//     console.log(this.questions);
//     let answer = Number.parseInt(
//       prompt(
//         'What is your favourite programming language?\n' +
//           this.questions.join('\n')
//       )
//     );
//     if (
//       Number.isInteger(answer) &&
//       answer >= 0 &&
//       answer < this.answers.length
//     ) {
//       this.answers[answer] += 1;
//       this.displayResults();
//     } else {
//       alert('Please enter a valid option, 0-4.');
//       registerNewAnswer();
//     }
//   },
//   displayResults(type = 'array') {
//     if (type === 'string') {
//       document.querySelector(
//         'h1'
//       ).innerHTML = `Poll results are ${this.answers.join(', ')}`;
//     } else if (type === 'array') {
//       document.querySelector('h1').innerHTML = this.answers;
//     }
//   },
// };

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// //poll.displayResults.call({ answers: [5, 2, 3] },'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

//=====================
// Coding Challenge #2
//=====================
/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, 
attach an event listener that changes the color of the selected 
h1 element ('header') to blue, each time the BODY element is clicked. 
Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! 
Take all the time you need. Think about WHEN exactly the callback 
function is executed, and what that means for the variables 
involved in this example.

GOOD LUCK 😀
*/

function goBlue() {
  const header = document.querySelector('h1');
  header.style.color = 'blue';

  setTimeout(function () {
    header.style.color = 'red';
  }, 3000);
}

document.querySelector('body').addEventListener('click', goBlue);

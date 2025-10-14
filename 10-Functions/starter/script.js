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
//============= Challenges ========================================================================

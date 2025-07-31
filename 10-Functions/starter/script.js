'use strict';

//============= Work Along ========================================================================
// Video 135 Default Parameters
const bookings = [];

function createBooking(
  flightNum,
  numPassengers = 1,
  price = numPassengers * 199.0
) {
  //ES5 (old-way) defining defaults with short-circuiting
  //   numPassengers = numPassengers || 1;
  //   price = price || 95.0;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 300.3);
createBooking('LH123', 3);
createBooking('LH456', undefined, 1000); //how to use the default value of a middle parameter

//video 136 Passing Arguments: Value vs Reference
let flight = 'LH987';
let casey = {
  name: 'Casey R.',
  passport: 23406591069,
};

function checkIn(flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mrs.' + passenger.name;

  if (passenger.passport === 23406591069) alert('check in');
  else alert('Wrong passport!');
}

checkIn(flight, casey);
console.log(flight);
console.log(casey);
//============= Challenges ========================================================================

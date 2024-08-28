'use strict';

// //function delcaration
// function calcAge1(birthYear) {
//   return 2023 - birthYear;
// }
// let age1 = calcAge1(1990);


// //function expression
// const calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// }
// let age2 = calcAge2(1990);


// // arrow function
// // arrow functions do NOT get this keyword functionality.  
// const calcAge3 = birthYear => 2024 - birthYear;
// let age3 = calcAge3(1990);

// const yearsUntilRetirement = (birthYear,firstName) => {
//   let age = 2023-birthYear;
//   return `${firstName} retires in `+(65-age)+" years";
// }


// console.log(age1,age2, age3,yearsUntilRetirement(1990,"Casey"));

// function cutFruit(fruit) {
//   return fruit * 4;
// }

// function fruitProcessor (apples,oranges) {
//   return `Juice with ${cutFruit(apples)} apple pieces and ${cutFruit(oranges)} orange pieces.`;
// }

// console.log(fruitProcessor(2,1));

const calcAverage = (num1,num2,num3) => (num1+num2+num3)/3;
console.log(calcAverage(4,2,3));

const casey = {
  firstName: 'Casey',
  lastName: 'Roseberry',
  age: 2024-1990,
  job: 'software engineer',
  friends: ['Derek','Kayla','Gig']
};

console.log(casey);

function promptUser() {
  return prompt("What do you want to know about Casey? Choose between firstName, lastNmae, age, job, or friends");
}

let interestedIn = promptUser();

if(casey[interestedIn]) {
  if (interestedIn == 'friends') {
    console.log(`${casey['firstName']} has ${casey[interestedIn].length} friends and their best friend is ${casey[interestedIn][0]}.`);
  } else {
    console.log(casey[interestedIn]);
  }  
} else {
  console.log("That is not a valid property, try again.");
  promptUser();
}


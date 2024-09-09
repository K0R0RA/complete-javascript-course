'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex],this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// manually breaking apart an array
// const arr = [2,3,4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

//destructuring an array
// const [x,y,z] = arr; 
// console.log(x,y,z);
// console.log(arr);

// to skip an element, just leave a blank in the destructuring syntax
let [main,,secondary] = restaurant.categories;
console.log(main,secondary);

//switch variables with destrucuring
[main,secondary] = [secondary, main];
console.log(main,secondary);

//console.log(restaurant.order(2,0));
//Receive 2 return values from a function. 
const [starter,mainCourse] = restaurant.order(2,0);
console.log(starter,mainCourse);

const nested = [2,4,[5,6]];
// let [one,,innerArr] = nested;
// console.log(one,innerArr);

//nested destructuring
let [one,,[i,j]] = nested;
console.log(one,i,j);

//setting default values for destructuring
//useful for getting destructuring unknown arrays
const [p=1,q=1,r=1] = [8,9];
console.log(p,q,r);
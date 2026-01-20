'use strict';

///////////////////////////////////////////////////////////////////////////////
// Project Script
///////////////////////////////////////////////////////////////////////////////

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Selectors
const header = document.querySelector('.header');

///////////////////////////////////////////////////////////////////////////////
// Lecture Scripts and Notes
///////////////////////////////////////////////////////////////////////////////
//=======================================================
// Video 198: Selecting, Creating, and Deleting Elements
//=======================================================
//Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(document.querySelector('.header'));
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); //returns HTMLCollection
console.log(allButtons);
// An HTMLCollection is a "live" collection, if the DOM changes, the selection is
//   automatically and immediately updated, contrary to a NodeList that is static
//   from time of creation in the script.

console.log(document.getElementsByClassName('btn'));

//Creating and Inserting Elements
// .insertAdjacentHTML()
const message = document.createElement('div'); //create a DOM element, not placed in the DOM
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Insertion as children
//header.prepend(message); //first child
//header.append(message); //last child
//the message DOM object only exists as one element, so is prepended, then immediately
//  appended, moving it from the 1st to last child, not duplicating it.
// To duplicated it, a clone/copy of the node must be made.
//header.append(message.cloneNode(true));

//Insertion as siblings
//These methods add the DOM object as siblings instead of children of the target.
header.before(message);
//header.after(message);

//Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', e => {
  message.remove(); //recent method
  //previously you could only remove children
  //so you would have to select the parent element, and .removeChild().
  //  message.parentElement.removeChild(message);
});

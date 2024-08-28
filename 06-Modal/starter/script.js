'use strict';

const button_els = document.querySelectorAll('.show-modal');
const modal_el = document.querySelector('.modal');
const close_el = document.querySelector('.close-modal');

button_els.forEach((button) => {
  button.addEventListener('click',function(e) {
    //select the popup div
    modal_el.classList.remove('hidden'); 
  });
});

close_el.addEventListener('click',function(e) {
  modal_el.classList.add('hidden');
});

window.addEventListener('keydown',function (event) {
  if(event.key === 'Escape') {
    modal_el.classList.add('hidden');
  }
});
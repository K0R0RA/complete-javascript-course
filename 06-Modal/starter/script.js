'use strict';

const button_els = document.querySelectorAll('.show-modal');
const modal_el = document.querySelector('.modal');
const close_el = document.querySelector('.close-modal');
const overlay_el = document.querySelector('.overlay');

const closeModal = function() {
  modal_el.classList.add('hidden');
  overlay_el.classList.add('hidden');
};

button_els.forEach((button) => {
  button.addEventListener('click',function() {
    //select the popup div
    modal_el.classList.remove('hidden'); 
    overlay_el.classList.remove('hidden');
  });
});

close_el.addEventListener('click',closeModal);
overlay_el.addEventListener('click',closeModal);

window.addEventListener('keydown',function (event) {
  if(event.key === 'Escape' && !modal_el.classList.contains('hidden')) {
    closeModal();
  }
});
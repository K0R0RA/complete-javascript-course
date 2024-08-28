'use strict';

console.log(document.querySelector('.message').textContent);


const message_el = document.querySelector('.message');
const score_el = document.querySelector('.score');
const number_el = document.querySelector('.number');
const guess_el = document.querySelector('.guess');
const check_el = document.querySelector('.check');
const highscore_el = document.querySelector('.highscore');
const again_el = document.querySelector('.again');

/*
score_el.textContent = 15;
number_el.textContent = 25;
guess_el.value = 23;
*/ 

let secretNumber = Math.floor(Math.random() * 20) + 1;

let score = 20;
let highScore = 0;

//number_el.textContent = secretNumber;

//Event listener
check_el.addEventListener('click', function() {
  let guess = Number(guess_el.value);
  //console.log(guess, typeof guess);
  if(!guess) {
    message_el.textContent = '⛔ No number...';  } 
  else {
    if(score > 1) {
      if(guess == secretNumber) {
        //display win
        message_el.textContent = '🎉 You win!';
        document.querySelector('body').style.backgroundColor = '#68b347';
        number_el.style.width = '30rem';
        number_el.textContent = secretNumber;
        //check high score
        if(score > highScore) {
          highscore_el.textContent = score;
        }
      } else if(guess > secretNumber) {
        //display go lower
        message_el.textContent = '📈 Too high...';
        score--;
      } else {
        //display go higher
        message_el.textContent = '📉 Too low...';
        score--;
      }
      score_el.textContent = score;
    } else {
      message_el.textContent = '😖 You lose';
      score_el.textContent = 0;
    }
  }
});

again_el.addEventListener('click', function() {
  document.querySelector('body').style. backgroundColor = '#222';
  number_el.style.width = '15rem';
  number_el.textContent = '?';
  message_el.textContent = 'Start guessing';
  score = 20;
  secretNumber = Math.floor(Math.random() * 20) + 1;
  score_el.textContent = score;
});
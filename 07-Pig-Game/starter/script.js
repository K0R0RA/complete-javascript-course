'use strict';

//const elements
const diceimg_el = document.querySelector('.dice');
const rollbtn_el = document.querySelector('.btn--roll');
const holdbtn_el = document.querySelector('.btn--hold');
const newgbtn_el = document.querySelector('.btn--new');


//functions
function changeTurn(thisTurn) {
    game[thisTurn]['current'] = 0;
    let nextTurn = (thisTurn + 1)%2;
    let current_el = document.querySelector(`.player--${thisTurn}`);
    let next_el = document.querySelector(`.player--${nextTurn}`);
    current_el.classList.remove('player--active');
    next_el.classList.add('player--active');
    return nextTurn;
}
function getRoll() {
    let thisRoll = Math.floor(Math.random() * 6) + 1;
    //update image to match thisRoll
    let imgName = `dice-${thisRoll}.png`;
    diceimg_el.setAttribute('src',imgName);
    return thisRoll;
}
function resetGame() {
    turn = changeTurn(1);
    game = [{'current':0,'score':0},{'current':0,'score':0}];
    updatePlayerScores();
}
function updatePlayerScores() {
    if (game[turn]['score'] > 30) {
        document.querySelector(`#score--${turn}`).textContent = 'Wins!';
    } else {
        document.querySelector(`#score--0`).textContent = game[0]['score'];
        document.querySelector(`#current--0`).textContent = game[0]['current'];
        document.querySelector(`#score--1`).textContent = game[1]['score'];
        document.querySelector(`#current--1`).textContent = game[1]['current'];
    }
}

//initialize the game
let roll = getRoll();
let turn = 0;
let game = [{'current':0,'score':0},{'current':0,'score':0}];


rollbtn_el.addEventListener('click',function(){
    roll = getRoll();
    //console.log(roll); 
    if(roll == 1) {
        game[turn]['score'] = 0;
        game[turn]['current'] = 0;
        turn = changeTurn(turn);
    } else {
        game[turn]['score'] += roll;
        game[turn]['current'] += roll;
    }
    updatePlayerScores();
});

holdbtn_el.addEventListener('click',function(){
    turn = changeTurn(turn);
});

newgbtn_el.addEventListener('click',resetGame);


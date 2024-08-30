'use strict';

//const elements
const diceimg_el = document.querySelector('.dice');
const rollbtn_el = document.querySelector('.btn--roll');
const holdbtn_el = document.querySelector('.btn--hold');
const newgbtn_el = document.querySelector('.btn--new');


//functions
function changeTurn(thisTurn) {
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
function updatePlayerScores(player) {
    let side_el = document.querySelector('.player--')
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
        console.log(`Turn changed to ${turn}`);
        console.log(game);
    } else {
        game[turn]['score'] += roll;
        game[turn]['current'] += roll;
        console.log(game);
    }
    updatePlayerScores(turn);
});

holdbtn_el.addEventListener('click',function(){
    turn = changeTurn(turn);
    console.log(`Turn changed to ${turn}`);
});

newgbtn_el.addEventListener('click',function() {
    turn = 0;
    game = [{'current':0,'score':0},{'current':0,'score':0}];
});


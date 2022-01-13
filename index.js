import{images} from './js/images.js';
import{responsive} from './js/responsive.js';

// variables set
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
const diceRoll = document.querySelector('.roll');
const holdBtn = document.querySelector('.hold');
const newGameBtn = document.querySelector('.new-game');

let playerCurrentScore = document.querySelectorAll('.t-score');
let player1GlobalScore = document.querySelector('.global-score-1');
let player2GlobalScore = document.querySelector('.global-score-2');
let diceImage = document.querySelectorAll('.dice');

let currentPlayer = player1;
let nextPlayer = player2;
let currentPlayerScore = 0;
let currentPlayerGlobalScore = 0;

// set random number varaible
let randomNumber = Math.round(Math.random()*5 + 1);

// dice rotation function
const diceRotation = (i) => {
  diceImage[i].classList.add('rotation');
  diceRoll.removeEventListener('click', roll);
  setTimeout(() => {
    diceImage[i].classList.remove('rotation');
    diceRoll.addEventListener('click', roll);
  }, 1000);
}

// dice roll function: when roll dice => dice rotation for 1sec & call diceValueTest function
const roll = () => {
  if (currentPlayer === player1){
    diceRotation(0);
    diceValueTest(0);
  } else {
    diceRotation(1);
    diceValueTest(1);
  }
}

// switch player function
const switchPlayer = () => {
  if (currentPlayer === player1){
    player1.classList.remove('current-player');
    player1.childNodes[1].childNodes[1].childNodes[3].classList.add('d-none');
    player2.classList.add('current-player');
    player2.childNodes[1].childNodes[1].childNodes[3].classList.remove('d-none');
    currentPlayer = player2;
    nextPlayer = player1;
  } else {
    player2.classList.remove('current-player');
    player2.childNodes[1].childNodes[1].childNodes[3].classList.add('d-none');
    player1.classList.add('current-player');
    player1.childNodes[1].childNodes[1].childNodes[3].classList.remove('d-none');
    currentPlayer = player1;
    nextPlayer = player2;
  }
}


/*dice value test and current player score incrementation function : 
 if dice random value is not 1, set random value to dice image and increment current score
 if dice random value is 1, current player score becomes 0 and will switch player*/
const diceValueTest = (i) => {
  setTimeout(() => {
    randomNumber;
    if (randomNumber!== 1) {
      diceImage[i].src = images[randomNumber-1];
      currentPlayerScore += randomNumber;
      playerCurrentScore[i].innerHTML = currentPlayerScore;
    } else {
      diceImage[i].src = images[randomNumber-1];
      currentPlayerScore = 0;
      playerCurrentScore[i].innerHTML = currentPlayerScore;
      switchPlayer();
    }
    randomNumber = Math.round(Math.random()*5 + 1);
  }, 1000);
}


// hold function : when hold, add current score to current player global score and call winner() function
const hold = () => {
  if (currentPlayer === player1) {
    currentPlayerGlobalScore += currentPlayerScore;
    player1GlobalScore.innerHTML = parseInt(player1GlobalScore.innerHTML)+currentPlayerGlobalScore;
    currentPlayerScore = 0;
    currentPlayerGlobalScore = 0;
    playerCurrentScore[0].innerHTML = currentPlayerScore;
    winner();
  } else {
    currentPlayerGlobalScore += currentPlayerScore;
    player2GlobalScore.innerHTML = parseInt(player2GlobalScore.innerHTML)+currentPlayerGlobalScore;
    currentPlayerScore = 0;
    currentPlayerGlobalScore = 0;
    playerCurrentScore[1].innerHTML = currentPlayerScore;
    winner();
  }
}

// winner function : switch players (when hold) unless current player global score is >= 100
//                 : add winner/looser style to the page         
const winner = () => {
  if(currentPlayer.children[0].children[1].innerHTML >= 100){
    currentPlayer.classList.add("winner-bg");
    currentPlayer.children[0].children[0].children[0].classList.add("big-title");
    currentPlayer.children[0].children[1].classList.add("big-title");
    currentPlayer.children[0].children[0].children[1].classList.add("d-none");
    currentPlayer.children[0].children[2].classList.add("d-none");
    currentPlayer.children[0].children[3].classList.add("d-none");
    nextPlayer.classList.add("looser-bg");
    nextPlayer.children[0].children[0].children[0].classList.add("big-title");
    nextPlayer.children[0].children[1].classList.add("big-title");
    nextPlayer.children[0].children[2].classList.add("d-none");
    nextPlayer.children[0].children[3].classList.add("d-none");
    diceRoll.removeEventListener('click', roll);
    holdBtn.removeEventListener('click', hold);
  } else {
    switchPlayer();
  }
}

// event listeners on 3 buttons click
diceRoll.addEventListener('click', roll);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', () => window.location.reload());

// event listener for iphone5/se responsive
addEventListener('load', responsive);
addEventListener('resize', responsive);




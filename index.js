const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');

let player1CurrentScore = document.querySelector('.t-score-1');
let player2CurrentScore = document.querySelector('.t-score-2');
let player1GlobalScore = document.querySelector('.global-score-1');
let player2GlobalScore = document.querySelector('.global-score-2');
let diceImage = document.querySelectorAll('.dice');
const diceRoll = document.querySelector('.roll');
const holdBtn = document.querySelector('.hold');
const newGameBtn = document.querySelector('.new-game');

let currentPlayer = player1;


let currentPlayerScore = 0;
let currentPlayerGlobalScore = 0;

let randomNumber = Math.round(Math.random()*5 + 1);

// set random value to dice image and current score
let randomDiceValue = () => {
  randomNumber;
  diceImage[0].src = `images/dice-${randomNumber}.svg`;
  currentPlayerScore += randomNumber;
  player1CurrentScore.innerHTML = currentPlayerScore;
}

let switchPlayer = () => {
  if (currentPlayer === player1){
    player1.classList.remove('current-player');
    player1.childNodes[1].childNodes[5].classList.add('invisible');
    player1.childNodes[1].childNodes[1].childNodes[3].classList.add('d-none');
    player2.classList.add('current-player');
    player2.childNodes[1].childNodes[5].classList.remove('invisible');
    player2.childNodes[1].childNodes[1].childNodes[3].classList.remove('d-none');
    currentPlayer = player2;
  } else {
    player2.classList.remove('current-player');
    player2.childNodes[1].childNodes[5].classList.add('invisible');
    player2.childNodes[1].childNodes[1].childNodes[3].classList.add('d-none');
    player1.classList.add('current-player');
    player1.childNodes[1].childNodes[5].classList.remove('invisible');
    player1.childNodes[1].childNodes[1].childNodes[3].classList.remove('d-none');
    currentPlayer = player1;
  }
}

let roll = () => {
  if(randomNumber!=1){
    randomDiceValue();
  } else {
    diceImage[0].src = `images/dice-${randomNumber}.svg`;
    currentPlayerScore = 0;
    player1CurrentScore.innerHTML = currentPlayerScore;
    switchPlayer();
  }
  randomNumber = Math.round(Math.random()*5 + 1);
}

diceRoll.addEventListener('click', roll)

let hold = () => {
  currentPlayerGlobalScore += currentPlayerScore;
  player1GlobalScore.innerHTML = currentPlayerGlobalScore;
  currentPlayerScore = 0;
  player1CurrentScore.innerHTML = currentPlayerScore;
  switchPlayer();
}

holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', () => window.location.reload());





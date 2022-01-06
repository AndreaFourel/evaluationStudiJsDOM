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

let randomNumber = Math.round(Math.random()*5 + 1);

// set random value to dice image and current score
let randomDiceValue = () => {
  randomNumber;
  if (currentPlayer === player1){
    diceImage[0].src = `images/dice-${randomNumber}.svg`;
    currentPlayerScore += randomNumber;
    playerCurrentScore[0].innerHTML = currentPlayerScore;
  } else {
    diceImage[1].src = `images/dice-${randomNumber}.svg`;
    currentPlayerScore += randomNumber;
    playerCurrentScore[1].innerHTML = currentPlayerScore;
  }
}

// switch player function
let switchPlayer = () => {
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

// roll set function
let roll = () => {
  if(randomNumber!=1){
    randomDiceValue();
  } else {
    if (currentPlayer === player1) {
      diceImage[0].src = `images/dice-${randomNumber}.svg`;
      currentPlayerScore = 0;
      playerCurrentScore[0].innerHTML = currentPlayerScore;
      switchPlayer();
    } else {
      diceImage[1].src = `images/dice-${randomNumber}.svg`;
      currentPlayerScore = 0;
      playerCurrentScore[1].innerHTML = currentPlayerScore;
      switchPlayer();
    }
  }
  randomNumber = Math.round(Math.random()*5 + 1);
}


// hold set function
let hold = () => {
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

let winner = () => {
  if(currentPlayer.children[0].children[1].innerHTML >= 20){
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

diceRoll.addEventListener('click', roll);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', () => window.location.reload());





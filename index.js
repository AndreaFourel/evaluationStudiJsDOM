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

// set random value to dice image and increment current score
const randomDiceValue = () => {
  if (currentPlayer === player1){
    diceRotation(0);
    setTimeout(() => {
      randomNumber;
      diceImage[0].src = `images/dice-${randomNumber}.svg`;
      currentPlayerScore += randomNumber;
      playerCurrentScore[0].innerHTML = currentPlayerScore;
    }, 1000);
  } else {
    diceRotation(1);
    setTimeout(() => {
      randomNumber;
      diceImage[1].src = `images/dice-${randomNumber}.svg`;
      currentPlayerScore += randomNumber;
      playerCurrentScore[1].innerHTML = currentPlayerScore;
    }, 1000);
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

// roll dice function : when roll, if dice value is not 1, call randonDiceValue()
//                                 if dice value is 1, curent player score becomes 0 and will switch player
const roll = () => {
  if(randomNumber!=1){
    randomDiceValue();
  } else {
    if (currentPlayer === player1) {
      diceRotation(0);
      diceImage[0].src = `images/dice-${randomNumber}.svg`;
      currentPlayerScore = 0;
      playerCurrentScore[0].innerHTML = currentPlayerScore;
      switchPlayer();
    } else {
      diceRotation(1);
      diceImage[1].src = `images/dice-${randomNumber}.svg`;
      currentPlayerScore = 0;
      playerCurrentScore[1].innerHTML = currentPlayerScore;
      switchPlayer();
    }
  }
  randomNumber = Math.round(Math.random()*5 + 1);
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

// winner function will switch players unless current player blobal score is >= 100
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





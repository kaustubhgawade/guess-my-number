"use strict";

// Initial Settings----------------------------------------------------------------------------------------------------
// flag for status of game
let isGameOn = true;

// scores
let score = 20;
let highscore = 0;

// automatic focus on input
document.querySelector(".guess").focus();

// Creating the My Number------------------------------------------------------------------------------------------------
const generateMyNumber = function () {
  const randomMyNumber = Math.trunc(Math.random() * 20) + 1;
  return randomMyNumber;
};
if (!localStorage.getItem("myNumber")) {
  localStorage.setItem("myNumber", generateMyNumber());
}
let myNumber = Number(localStorage.getItem("myNumber"));

// // Getting Guess Number-----------------------------------------------------------------------------------------------
const number = document.querySelector(".number");
const guessNumberTrigger = function () {
  const guessBox = document.querySelector(".guess");
  let guessNumber = Number(guessBox.value);


  if (guessNumber < 1 || guessNumber > 20 || isNaN(guessNumber)) {
    message.textContent = "🚫 Invalid Input. Enter a number between 1 and 20.";
    return;
  }
  
  number.textContent = guessNumber;

  if (myNumber === guessNumber) {
    updateMessage(guessNumber, myNumber);
    gameOver();
  } else {
    updateMessage(guessNumber, myNumber);
    updateScore();
  }

  guessBox.value = "";
  guessBox.focus();
};
const checkBtn = document.getElementById("check");
checkBtn.addEventListener("click", guessNumberTrigger);

// Update Message
const message = document.querySelector(".message");
const updateMessage = function (guessNumber, myNumber) {
  if (isGameOn) {
    if (guessNumber < 0) {
      message.textContent = "📉 Way too low";
    } else if (guessNumber > 21) {
      message.textContent = "📈 Way too high";
    } else if (guessNumber < myNumber) {
      message.textContent = "📉 Too low";
    } else if (guessNumber > myNumber) {
      message.textContent = "📈 Too high";
    } else if (guessNumber === myNumber) {
      message.textContent = "🏆 You guessed right";
    } else {
      message.textContent = "🚫 Invalid Input";
    }
  }
};

// Update Score
let scoreBox = document.querySelector(".score");
let highscoreBox = document.querySelector(".highscore");
const updateScore = function () {
  let scoreContent = Number(scoreBox.textContent);
  scoreContent--;
  if (scoreContent <= 0) {
    gameLost();
  }
  scoreBox.textContent = scoreContent;
};
// Update Highscores
// let highscoreSavedValue = 0;
const updateHighscore = function () {
  let highscoreContent = Number(highscoreBox.textContent);
  let scoreContent = Number(scoreBox.textContent);
  if (scoreContent > highscoreContent) {
    highscoreBox.textContent = scoreContent;
  }
};

// Game Over
const gameOver = function () {
  styleChange();
  updateHighscore();
  isGameOn = false;
};
// Style Changes
const body = document.querySelector("body");
const guessBox = document.querySelector(".guess");
const styleChange = function () {
  body.style.backgroundColor = "#60b347";
  checkBtn.style.backgroundColor = "#ccc";
  checkBtn.disabled = true;
  guessBox.disabled = true;
};

// Game Lost
const gameLost = function () {
  body.style.backgroundColor = "#b73c3c";
  checkBtn.style.backgroundColor = "#ccc";
  checkBtn.disabled = true;
  guessBox.disabled = true;
  isGameOn = false;
};

// Play Again
const playAgain = function () {
  initialStyles();
  isGameOn = true;

  localStorage.setItem("myNumber", generateMyNumber());
  myNumber = Number(localStorage.getItem("myNumber"));
};
const playAgainBox = document.getElementById("play-again");
playAgainBox.addEventListener("click", playAgain);
// Initial Styles
const initialStyles = function () {
  body.style.backgroundColor = "#222";
  checkBtn.style.backgroundColor = "#eee";
  checkBtn.disabled = false;
  guessBox.disabled = false;
  message.textContent = "Start Guessing ... ";
  number.textContent = "?";
  scoreBox.textContent = score;
  document.querySelector(".guess").focus();
};

// Reset
const reset = function () {
  playAgain();
  highscoreBox.textContent = highscore;
};
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", reset);

// Keyboard events
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && isGameOn) {
    guessNumberTrigger();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "a") {
    playAgain();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "q") {
    reset();
  }
});

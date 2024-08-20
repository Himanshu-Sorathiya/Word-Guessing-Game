/**
 * The container element for displaying the answer with empty spans.
 * @type {HTMLSpanElement}
 */
const answerArea = document.querySelector(".answer-area")! as HTMLSpanElement;

/**
 * The container element for displaying the riddle.
 * @type {HTMLSpanElement}
 */
const riddleArea = document.querySelector(".riddle")! as HTMLSpanElement;

/**
 * The span element that displays the list of incorrect guesses.
 * @type {HTMLSpanElement}
 */
const wrongArea = document.querySelector(
  ".wrong-character-list",
)! as HTMLSpanElement;

/**
 * The button to reset the game and reinitialize the state.
 * @type {HTMLButtonElement}
 */
const resetButton = document.querySelector(".reset-btn")! as HTMLButtonElement;

/**
 * The span element that displays the number of remaining guesses.
 * @type {HTMLSpanElement}
 */
const remainingGuessCounter = document.querySelector(
  ".guess-left",
)! as HTMLSpanElement;

/**
 * Counter for the number of incorrect guesses allowed.
 * @type {number}
 */
let wrongGuess: number;

/**
 * Counter for the number of correct guesses made.
 * @type {number}
 */
let correctGuess: number;

/**
 * Index of the currently selected riddle from the riddles array.
 * @type {number}
 */
let randomIndex: number;

/**
 * The current riddle text to be displayed.
 * @type {string}
 */
let riddle: string;

/**
 * The current answer text to be guessed by the player.
 * @type {string}
 */
let answer: string;

/**
 * A string containing all correctly guessed characters.
 * @type {string}
 */
let correctGuessList: string;

/**
 * A string containing all incorrectly guessed characters.
 * @type {string}
 */
let incorrectGuessList: string;

/**
 * Initializes or resets the game state by selecting a random riddle,
 * setting up the display, and resetting the counters.
 * @function
 */
function initialization(): void {
  // Select a random index to pick a riddle and answer
  randomIndex = Math.trunc(Math.random() * riddles.length);

  // Set the riddle and answer based on the selected index
  riddle = riddles[randomIndex].riddle;
  answer = riddles[randomIndex].answer.toUpperCase();

  // Reset the guess lists and counters
  correctGuessList = "";
  incorrectGuessList = "";
  correctGuess = 0;
  wrongGuess = 8;
  remainingGuessCounter.textContent = String(wrongGuess);

  riddleArea.textContent = String(riddle);
  wrongArea.textContent = incorrectGuessList;
  answerArea.innerHTML = "";
  answer.split("").forEach(() => {
    const span = document.createElement("span");
    span.classList.add("answer-char");
    span.textContent = " ";
    answerArea.appendChild(span);
  });
}
window.addEventListener("DOMContentLoaded", initialization);
resetButton.addEventListener("click", initialization);

/**
 * Validates if the given key is a valid uppercase letter.
 * @param {string} key - The key to be validated.
 * @returns {boolean} True if the key is a valid uppercase letter, otherwise false.
 * @function
 */
function isValidKey(key: string): boolean {
  return /^[A-Z]$/.test(key);
}

/**
 * Checks if the given key is in the correct guesses list.
 * @param {string} key - The key to be checked.
 * @returns {boolean} True if the key is in the correct guesses list, otherwise false.
 * @function
 */
function inCorrectGuessList(key: string): boolean {
  return correctGuessList.includes(key);
}

/**
 * Checks if the given key is in the incorrect guesses list.
 * @param {string} key - The key to be checked.
 * @returns {boolean} True if the key is in the incorrect guesses list, otherwise false.
 * @function
 */
function inIncorrectGuessList(key: string): boolean {
  return incorrectGuessList.includes(key);
}

/**
 * Handles the keydown event by updating the game state based on the user's input.
 * Updates the displayed answer, incorrect guesses, and remaining guesses.
 * @param {KeyboardEvent} e - The keyboard event triggered by the user's input.
 * @function
 */
window.addEventListener("keydown", function (e) {
  const key = e.key.toUpperCase();
  const spanList = this.document.querySelectorAll(".answer-char")!;

  if (isValidKey(key)) {
    if (answer.includes(key) && !inCorrectGuessList(key)) {
      spanList.forEach((span, idx) => {
        if (answer[idx] === key) {
          span.textContent = key;
          correctGuessList += key;
          correctGuess++;
        }
      });

      if (correctGuess === answer.length) {
        setTimeout(() => {
          alert("Congratulations! You found the answer.");
          initialization();
        }, 50);
      }
    } else if (!inIncorrectGuessList(key)) {
      wrongGuess--;
      remainingGuessCounter.textContent = String(wrongGuess);
      incorrectGuessList += `${key} `;
      wrongArea.textContent = incorrectGuessList;

      if (wrongGuess === 0) {
        setTimeout(() => {
          alert(`You lost! The answer was ${answer}.`);
          initialization();
        }, 50);
      }
    }
  }
});

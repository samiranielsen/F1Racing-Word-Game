const words = ["ENGINE", "WINNER", "DRIVER", "TROPHY", "FASTER", "MONACO"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
//referenced lecture video for math.floor refresher
let guessesRemaining = 6;
let guessedLetters = [];

document.addEventListener("DOMContentLoaded", () => {
  displayWord();
  createKeyboard();
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document
    .getElementById("restart-button")
    .addEventListener("click", resetGame);
});

function displayWord() {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = selectedWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function createKeyboard() {
  const keyboard = document.getElementById("keyboard");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  letters.forEach((letter) => {
    const key = document.createElement("div");
    key.classList.add("key");
    key.innerText = letter;
    key.addEventListener("click", () => handleGuess(letter));
    keyboard.appendChild(key);
  });
}

function handleGuess(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);

    if (!selectedWord.includes(letter)) {
      guessesRemaining--;
    }

    updateDisplay();
  }
}

function updateDisplay() {
  displayWord();
  document.getElementById("guesses").innerText = guessesRemaining;

  if (guessesRemaining === 0) {
    showModal("Maybe next time racer! The word was " + selectedWord);
  } else if (
    !document.getElementById("word-container").innerText.includes("_")
  ) {
    showModal("Victory!!! 🏆 ");
  }

  updateKeyboard();
}

function updateKeyboard() {
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    if (guessedLetters.includes(key.innerText)) {
      key.classList.add("disabled");
    }
  });
}

function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessesRemaining = 6;
  guessedLetters = [];
  updateDisplay();
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => key.classList.remove("disabled"));
  closeModal();
}

function showModal(message) {
  document.getElementById("modal-message").innerText = message;
  document.getElementById("modal").classList.add("show");
  document.getElementById("modal-overlay").classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
  document.getElementById("modal-overlay").classList.remove("show");
}

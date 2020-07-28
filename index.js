let level = 0;
const btns = document.querySelectorAll(".btn");
let sequence = [];
let storedSeq = [];

// assign each button an event handler that will attach the "pressed" style class upon a click.
function btnsAnimation() {
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", checkGuess);
  }
}

// Function that adds and removes the "pressed" styling after a button "click" event. After the set time of 100ms the styling will be removed.
function addPressed(btn) {
  console.log("btn in addPressed", btn);
  let color = btn.id;
  btn.classList.add("pressed");
  sound(color);
  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 1500);
}

// Function that plays the corresponding sound to the color of the button.
function sound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.currentTime = 0;
  audio.play();
}

// Function that will play a random button. The button will be stored inside the "sequence" array.
function nextInSequence() {
  let num = Math.floor(Math.random() * btns.length);
  let next = btns[num];
  sequence.push(next);
  document.querySelector("#level-title").innerHTML = `Level ${sequence.length}`;
  automaticPlay(next);
  btnsAnimation();
}

// Function that adds and removes the "pressed" effect automatically upon starting the game as well as play the corresponding button sound.
function automaticPlay(current) {
  let color = current.id;
  current.classList.add("pressed");
  sound(color);
  setTimeout(() => {
    current.classList.remove("pressed");
  }, 100);
}

const startNewLevel = () => {
  console.log("starting new level");
  level++;
  setLevelNode();
  createNewSequence();
  playSequence();
};

const playSequence = () => {
  let index = 0;
  const sequenceLoop = () => {
    setTimeout(() => {
      addPressed(sequence[index]);
      index++;
      if (index < sequence.length) {
        sequenceLoop();
      }
    }, 1000);
  };
  sequenceLoop();
};

const createNewSequence = () => {
  sequence = [];
  storedSeq = [];
  for (let i = 0; i < level; i++) {
    let num = Math.floor(Math.random() * btns.length);
    let next = btns[num];
    sequence.push(next);
  }
};

const setLevelNode = () => {
  document.querySelector("#level-title").innerHTML = `Level ${level}`;
};

const checkGuess = (event) => {
  const guess = event.target;
  storedSeq.push(guess);
  console.log("user guesses length", storedSeq.length);
  console.log("sequence length", sequence.length);
  const guessNumber = storedSeq.length - 1;
  if (
    guess.id === sequence[guessNumber].id &&
    storedSeq.length === sequence.length
  ) {
    startNewLevel();
  } else if (guess.id === sequence[guessNumber].id) {
    console.log("correct guess");
  } else {
    console.log("incorrect guess");
  }
};

const addEventListenerToBtns = () => {
  document.querySelector(".container").addEventListener("click", checkGuess);
};

// Will kick off the next sequence (technically the starting color and sound) and unbind the event handler once the game has started.
document.addEventListener(
  "keydown",
  () => {
    startNewLevel();
    addEventListenerToBtns();
  },
  { once: true }
);

// function rightOrWrong () {
// 	for (let j = 0; j < sequence.length; j++) {
// 		if (this.id === sequence[j].id) {
// 			addPressed(this);
// 			setTimeout(() => {
// 				nextInSequence();
// 			}, 100);
// 		} else {
// 			endGame(this);
// 		}
// 	}
// }

// function endGame (btn) {
// 	sequence = [];
// 	storedSeq = [];
// 	document.body.classList.add('game-over');
// 	btn.classList.add('pressed');
// 	let audio = new Audio('sounds/wrong.mp3');
// 	audio.currentTime = 0;
// 	audio.play();
// 	document.querySelector('#level-title').innerHTML = 'Game Over, Press Any Key to Restart';
// 	setTimeout(() => {
// 		document.body.classList.remove('game-over');
// 		btn.classList.remove('pressed');
// 	}, 100);
// 	document.addEventListener('keydown', nextInSequence, { once: true });
// }

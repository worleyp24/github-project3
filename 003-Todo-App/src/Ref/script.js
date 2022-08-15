const overlay = document.querySelector(".overlay");
const gameContainer = document.querySelector(".container");
const buttonContainer = document.querySelector(".box");
const score = document.querySelector(".score");
const goScore = document.querySelector(".goScore");

const lbModal = document.querySelector(".leaderboardModal");
const showLbModal = document.querySelector(".leaderboard");
const hideLbModal = document.querySelector(".leaderboardHeader span");

const startGame = document.querySelector(".startGame");
const remainingTime = document.querySelector(".remainingTime");
const playerName = document.querySelector(".playerName");
const tableBody = document.querySelector("tbody");

const htpModal = document.querySelector(".howToPlayModal");
const showHtpModal = document.querySelector(".how-to-play");
const hideHtpModal = document.querySelector(".howToPlayHeader span");

const EnModal = document.querySelector(".editNameModal");
const showEnModal = document.querySelector(".editName");
const hideEnModal = document.querySelector(".editNameHeader span");
const inputField = document.querySelector(".inputField");
const submitName = document.querySelector(".submitName");

const goModal = document.querySelector(".GameoverModal");
const showGoModal = document.querySelector(".Gameover");
const hideGoModal = document.querySelector(".GameoverHeader span");

const showHomeWindow = document.querySelector(".Home");
const homeWindow = document.querySelector(".HomeWindow");
const showHomeHtpModal = document.querySelector(".home-how-to-play");
const showGameWindow = document.querySelector(".lets-play");

// Array of Numbers
const romNum = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const regNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const fruitsNum = ["🍎", "🍌", "🍒", "🍍", "🍇", "🍉", "🍊", "🌽", "🥑", "🍄"];

// Function to convert integer to roman numeral
function convRom(num) {
  if (regNum.includes(num)) {
    const indexInt = regNum.indexOf(num);
    roman = romNum[indexInt];
  }
  return roman;
}

// Function to convert rinteger to fruits
function convFruits(num) {
  if (regNum.includes(num)) {
    const indexInt = regNum.indexOf(num);
    fruits = fruitsNum[indexInt];
  }
  return fruits;
}

// Function to convert roman numeral to integer
function convNumR(rom) {
  if (romNum.includes(rom)) {
    const indexRom = romNum.indexOf(rom);
    intR = regNum[indexRom];
  }
  return intR;
}

// Function to convert fruits to integer
function convNumF(frt) {
  if (fruitsNum.includes(frt)) {
    const indexFruits = fruitsNum.indexOf(frt);
    intF = regNum[indexFruits];
  }
  return intF;
}

// Generate set of random numers as Integers
const getRanNumInt = () => {
  const setOfNumbers = [];
  while (setOfNumbers.length != 40) {
    const ranNum = Math.floor(Math.random() * 10) + 1;
    setOfNumbers.push(ranNum);
  }
  return setOfNumbers;
};

// Generate set of random numers as Roman Numerals
const getRanNumRom = () => {
  const setOfNumbers = [];
  while (setOfNumbers.length != 40) {
    const ranNum = convRom(Math.floor(Math.random() * 10) + 1);
    setOfNumbers.push(ranNum);
  }
  return setOfNumbers;
};

// Generate set of random numers as Fruits
const getRanNumFruits = () => {
  const setOfNumbers = [];
  while (setOfNumbers.length != 40) {
    const ranNum = convFruits(Math.floor(Math.random() * 10) + 1);
    setOfNumbers.push(ranNum);
  }
  return setOfNumbers;
};

// Initial Assignment of Variables
let firstCheck = null;
let secondCheck = null;
let firstBtnSelected = null;
let adjBtn1 = null;
let adjBtn2 = null;
let i = 0;
let x = 0;
let sum = 0;

let setOfNum = getRanNumInt();

// Function for the replacing the removed button when criteria was met
function createNewButton(ranNumX, targetIndex, adjBtn) {
  const newButton = document.createElement("div");
  newButton.setAttribute("class", "button");
  newButton.setAttribute("indexValue", targetIndex);
  newButton.textContent = ranNumX;
  buttonContainer.insertBefore(newButton, adjBtn);
  let color = "#";
  color += Math.random().toString(16).slice(2, 8);
  newButton.style.backgroundImage = `linear-gradient(45deg,  ${color},rgba(0,80,248))`;
  newButton.addEventListener("click", function () {
    gamePlay(this);
  });
}

// Print collection of array and addEventListener to each button
function printButton(collectionArr) {
  collectionArr.forEach((e) => {
    const newButton = document.createElement("div");
    newButton.setAttribute("class", "button");
    newButton.setAttribute("indexValue", i);
    newButton.textContent = e;
    buttonContainer.appendChild(newButton);
    let color = "#";
    color += Math.random().toString(16).slice(2, 8);
    newButton.style.backgroundImage = `linear-gradient(45deg,  ${color},rgba(0,80,248))`;
    newButton.classList.add("disabled");
    newButton.addEventListener("click", function () {
      gamePlay(this);
    });
    i++;
  });
}
printButton(setOfNum);

// Function of the gameplay logic
function gamePlay(button) {
  if (!button.classList.contains("disabled")) {
    if (firstCheck === null) {
      firstCheck = button.getAttribute("indexValue");
      firstBtnSelected = button;
      const adjIndex1 = parseFloat(firstCheck) + 2;
      adjBtn1 = document.querySelector(`.box .button:nth-child(${adjIndex1})`);
    } else {
      secondCheck = button.getAttribute("indexValue");
      const adjIndex2 = parseFloat(secondCheck) + 1;
      adjBtn2 = document.querySelector(`.box .button:nth-child(${adjIndex2})`);

      //  if the sum of selected number is equal to 11, previously selected two numbers shall be deleted.
      if (setOfNum[firstCheck] + setOfNum[secondCheck] === 11) {
        // score to be added
        sum += 10;
        score.textContent = sum;

        // replace the removed numbers
        const ranNum1 = Math.floor(Math.random() * 10) + 1;
        const ranNum2 = Math.floor(Math.random() * 10) + 1;

        setOfNum.splice(firstCheck, 1, ranNum1);
        setOfNum.splice(secondCheck, 1, ranNum2);

        createNewButton(ranNum1, firstCheck, adjBtn1);
        createNewButton(ranNum2, secondCheck, adjBtn2);

        buttonContainer.removeChild(firstBtnSelected);
        buttonContainer.removeChild(button);
      } else {
        button.classList.add("btnSelected");
        firstBtnSelected.classList.add("btnSelected");

        // reduction of time remaining if sum of two number is not equal to 11
        timeRemaining -=
          Math.abs(setOfNum[firstCheck] - setOfNum[secondCheck]) * 1000;
      }
      // if the sum of selected number is not equal to 11, declared variables shall be reset to null and class btnSelected shall be removed.
      // firstBtnSelected.classList.remove("btnSelected");
      // button.classList.remove("btnSelected");
      firstCheck = null;
      secondCheck = null;
      firstBtnSelected = null;
    }
  }
}

let timeRemaining = 60000;
function startGameTimer() {
  gameStart = setInterval(function () {
    timeRemaining -= 1000;
    if (timeRemaining < 10000) {
      remainingTime.textContent = `00:0${timeRemaining / 1000}`;
    } else {
      remainingTime.textContent = `00:${timeRemaining / 1000}`;
    }
    if (timeRemaining <= 0) {
      startGame.removeAttribute("disabled");
      timeRemaining = 60000;
      const allButton = document.querySelectorAll(".button");
      allButton.forEach((btn) => {
        btn.classList.add("disabled");
      });
      clearInterval(gameStart);
      goScore.textContent = `Your total score is ${sum}`;
      goModal.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
      const finalScore = document.querySelector(".score");
      let now = new Date().toLocaleString();
      recordLocalStorage(playerName.textContent, finalScore.textContent, now);
      populateLeaderboard();
      finalScore.textContent = "0";
      remainingTime.textContent = "01:00";
      sum = 0;
      // while (buttonContainer.firstChild) {
      //   buttonContainer.removeChild(buttonContainer.firstChild);
      // }
      // printButton(setOfNum);
    }
  }, 1000);
}

// function to record the game stats in the local storage
function recordLocalStorage(pName, score, timestamp) {
  let newrecord = [pName, score, timestamp];
  const leaderboard = localStorage.getItem("leaderboard");
  if (leaderboard === null) {
    const tempArr = [];
    tempArr.push(newrecord);
    localStorage.setItem("leaderboard", JSON.stringify(tempArr));
  } else {
    let record = JSON.parse(leaderboard);
    record.push(newrecord);
    localStorage.setItem("leaderboard", JSON.stringify(record));
  }
}

// function to record the game stats in the leaderboards
function populateLeaderboard() {
  const leaderboard = localStorage.getItem("leaderboard");
  if (leaderboard === null) {
    const recordTableR = document.createElement("tr");
    const recordTableC = document.createElement("td");
    recordTableC.textContent = "No records found";
    recordTableC.setAttribute("colspan", 3);
    tableBody.appendChild(recordTableR);
    recordTableR.appendChild(recordTableC);
  } else {
    let recordLB = JSON.parse(leaderboard);
    const sortedData = recordLB.sort((a, b) => b[1] - a[1]);
    sortedData.forEach((rec) => {
      const recordTableR = document.createElement("tr");
      tableBody.appendChild(recordTableR);
      rec.forEach((data) => {
        const recordTableC = document.createElement("td");
        recordTableC.textContent = data;
        recordTableR.appendChild(recordTableC);
      });
    });
  }
}
populateLeaderboard();

// Start Game
startGame.addEventListener("click", function () {
  if (this.getAttribute("disabled") === null) {
    this.setAttribute("disabled", true);
    const allButton = document.querySelectorAll(".button");
    allButton.forEach((btn) => {
      btn.classList.remove("disabled");
    });
    startGameTimer();
  }
});

// Navigation
showHtpModal.addEventListener("click", function () {
  htpModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

hideHtpModal.addEventListener("click", function () {
  htpModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

showLbModal.addEventListener("click", function () {
  lbModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

hideLbModal.addEventListener("click", function () {
  lbModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

showEnModal.addEventListener("click", function () {
  EnModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

hideEnModal.addEventListener("click", function () {
  EnModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

hideGoModal.addEventListener("click", function () {
  goModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

submitName.addEventListener("click", function () {
  if (inputField.value === "") {
    alert("Input your desired");
    EnModal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  }
  playerName.textContent = inputField.value;
  EnModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

showHomeHtpModal.addEventListener("click", function () {
  htpModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

showGameWindow.addEventListener("click", function () {
  gameContainer.classList.toggle("hidden");
  homeWindow.setAttribute("class", "hidden");
});

showHomeWindow.addEventListener("click", function () {
  gameContainer.classList.toggle("hidden");
  homeWindow.classList.remove("hidden");
});

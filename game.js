//Intialize Global Variables
let currentWord = "";
let timerInterval;
let lives = 6;
let difficulty = localStorage.getItem("selectedDifficulty"); //get selectedDifficulty from home
let guessedLetters = [];
let timeLeft = 0;
let totalLevelTime = 0;
let hintsRemaining = 0;

//Defaults difficulty to Easy for testing
if (difficulty === null) {
    difficulty = "easy";
}

//Music
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

//Word for different levels
const easyWords = ["ATOM", "GENE", "DNA", "LUNG", "CELL", "BONE", "EARTH", "ACID"];
const mediumWords = ["FORCE", "ORGAN", "BASE", "PLANT", "SOLAR", "SPACE", "LIGHT", "SOUND"];
const hardWords = ["MITOSIS", "NEURON", "QUANTUM", "ISOTOPE", "GRAVITY", "NUCLEUS", "FOSSIL", "GALAXY"];

function startGame() {
    lives = 6; //set lives to 6
    guessedLetters = []; //guessedLetters

    //Intialize time and amount of hints based on difficulty
    if (difficulty === "easy") {
        totalLevelTime = 300;
        hintsRemaining = 1;

        //Get currentWord
        const randomIndex = Math.floor(Math.random() * easyWords.length);
        currentWord = easyWords[randomIndex];

    } else if (difficulty === "medium") {
        totalLevelTime = 450;
        hintsRemaining = 2;

        const randomIndex = Math.floor(Math.random() * mediumWords.length);
        currentWord = mediumWords[randomIndex];

    } else if (difficulty === "hard") {
        totalLevelTime = 600;
        hintsRemaining = 3;

        const randomIndex = Math.floor(Math.random() * hardWords.length);
        currentWord = hardWords[randomIndex];
    }

    timeLeft = totalLevelTime; //Total Level Time is based on difficulty
    document.getElementById("difficultyDisplay").innerText = `DIFF: ${difficulty.toUpperCase()}`;

    resetButtons();
    updateDisplay();
    updateHearts();
    updateHintUI();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft = timeLeft - 1;

        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;

        if (secs < 10) {
            secs = "0" + secs;
        }

        if (mins < 10) {
            mins = "0" + mins;
        }

        document.getElementById("timerDisplay").innerText = `${mins}:${secs}`;

        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function confirmExit() {
    let result = confirm("Scholar, are you sure you want to quit the exam? All progress will be lost!");

    if (result === true) {
        window.location.href = "home.html";
    } else {
        return;
    }
}

function handleGuess(letter, btn) {
    if (guessedLetters.indexOf(letter) !== -1) {
        return;
    }

    guessedLetters.push(letter);

    if (currentWord.indexOf(letter) !== -1) {
        btn.classList.add("correct-btn");
        correctSound.play();

        updateDisplay();

        let win = true;

        for (let i = 0; i < currentWord.length; i++) {
            if (guessedLetters.indexOf(currentWord[i]) === -1) {
                win = false;
            }
        }

        if (win === true) {
            endGame(true);
        }

    } else {
        btn.classList.add("wrong-btn");
        wrongSound.play();

        lives = lives - 1;
        updateHearts();

        if (lives <= 0) {
            endGame(false);
        }
    }

    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = 'not-allowed';
}

function endGame(win) {
    clearInterval(timerInterval);

    let timeUsed = totalLevelTime - timeLeft;
    let mins = Math.floor(timeUsed / 60);
    let secs = timeUsed % 60;

    let formattedTime = "";

    if (mins < 10) {
        formattedTime = "0" + mins;
    } else {
        formattedTime = mins;
    }

    formattedTime = formattedTime + ":";

    if (secs < 10) {
        formattedTime = formattedTime + "0" + secs;
    } else {
        formattedTime = formattedTime + secs;
    }

    let playerName = localStorage.getItem("pisayPlayerName");

    if (playerName === null) {
        playerName = "Student";
    }

    document.getElementById("idName").innerText = playerName;
    document.getElementById("idLevel").innerText = difficulty.toUpperCase();
    document.getElementById("idTime").innerText = formattedTime;
    document.getElementById("idWord").innerText = currentWord;

    if (win === true) {
        saveResult(formattedTime, timeUsed);

        document.getElementById("idImage").src = "exam-passed-shrimp.jpg";
        document.getElementById("idStatusStamp").innerText = "PASSED";
        document.getElementById("idStatusStamp").style.color = "#2ecc71";

    } else {
        document.getElementById("idImage").src = "exam-failed-shrimp.jpg";
        document.getElementById("idStatusStamp").innerText = "FAILED";
        document.getElementById("idStatusStamp").style.color = "#e74c3c";
    }

    document.getElementById("idModal").classList.remove("hidden");
}

function saveResult(displayTime, totalSeconds) {
    let playerName = localStorage.getItem("pisayPlayerName");

    if (playerName === null) {
        playerName = "Student";
    }

    const newEntry = {
        name: playerName,
        time: displayTime,
        seconds: totalSeconds,
        word: currentWord,
        difficulty: difficulty.toUpperCase()
    };

    const key = "leaderboard_" + difficulty;

    let scores = localStorage.getItem(key);

    if (scores !== null) {
        scores = JSON.parse(scores);
    } else {
        scores = [];
    }

    scores.push(newEntry);
    scores.sort(function (a, b) {
        return a.seconds - b.seconds;
    });

    localStorage.setItem(key, JSON.stringify(scores));
}

function useHint() {
    if (hintsRemaining > 0) {
        let unrevealed = [];

        for (let i = 0; i < currentWord.length; i++) {
            if (guessedLetters.indexOf(currentWord[i]) === -1) {
                unrevealed.push(currentWord[i]);
            }
        }

        if (unrevealed.length > 0) {
            let randomIndex = Math.floor(Math.random() * unrevealed.length);
            let randomChar = unrevealed[randomIndex];

            hintsRemaining = hintsRemaining - 1;
            updateHintUI();

            let targetBtn = document.getElementById(`btn-${randomChar}`);
            handleGuess(randomChar, targetBtn);
        }
    }
}

function updateDisplay() {
    let displayStr = "";

    for (let i = 0; i < currentWord.length; i++) {
        if (guessedLetters.indexOf(currentWord[i]) !== -1) {
            displayStr = displayStr + currentWord[i] + " ";
        } else {
            displayStr = displayStr + "_ ";
        }
    }

    document.getElementById("revealedLetters").innerText = displayStr;
}

function updateHearts() {
    const container = document.getElementById("heartContainer");
    container.innerHTML = "";

    for (let i = 0; i < lives; i++) {
        const img = document.createElement("img");
        img.src = "heart.png";
        img.className = "heart-icon";
        container.appendChild(img);
    }
}

function updateHintUI() {
    const hintBtn = document.getElementById("hintBtn");

    hintBtn.innerText = `HINT ( ${hintsRemaining} LEFT )`;

    if (hintsRemaining <= 0) {
        hintBtn.disabled = true;
        hintBtn.style.opacity = "0.5";
    } else {
        hintBtn.disabled = false;
        hintBtn.style.opacity = "1";
    }
}

function resetButtons() {
    const buttons = document.querySelectorAll(".letter-btn");

    buttons.forEach(function (btn) {
        btn.disabled = false;
        btn.classList.remove("correct-btn");
        btn.classList.remove("wrong-btn");
    });
}

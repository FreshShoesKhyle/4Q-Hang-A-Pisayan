let currentWord = "";
let guessedLetters = [];
let lives = 6;
let timeLeft = 0;
let totalLevelTime = 0; 
let hintsRemaining = 3;
let timerInterval = null;

const easyWords = ["ATOM", "GENE", "DNA", "LUNG", "CELL", "BONE", "EARTH", "ACID"];
const mediumWords = ["FORCE", "ORGAN", "BASE", "PLANT", "SOLAR", "SPACE", "LIGHT", "SOUND"];
const hardWords = ["MITOSIS", "NEURON", "QUANTUM", "ISOTOPE", "GRAVITY", "NUCLEUS", "FOSSIL", "GALAXY"];

const difficulty = localStorage.getItem("selectedDifficulty");

function startGame() {
    if (difficulty == "easy") {
        totalLevelTime = 300;
        hintsRemaining = 3;
        const randomIndex = Math.floor(Math.random() * easyWords.length);
        currentWord = easyWords[randomIndex];
    } 
    if (difficulty == "medium") {
        totalLevelTime = 600;
        hintsRemaining = 2;
        const randomIndex = Math.floor(Math.random() * mediumWords.length);
        currentWord = mediumWords[randomIndex];
    } 
    if (difficulty == "hard") {
        totalLevelTime = 900;
        hintsRemaining = 1;
        const randomIndex = Math.floor(Math.random() * hardWords.length);
        currentWord = hardWords[randomIndex];
    }

    timeLeft = totalLevelTime;
    document.getElementById("difficultyDisplay").innerText = "DIFF: " + difficulty.toUpperCase();
    
    updateDisplay();
    updateHearts();
    updateHintUI();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft = timeLeft - 1;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        
        if (secs < 10) { secs = "0" + secs; }
        if (mins < 10) { mins = "0" + mins; }
        
        document.getElementById("timerDisplay").innerText = mins + ":" + secs;
        
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function handleGuess(letter, btn) {
    if (guessedLetters.indexOf(letter) != -1) return;
    guessedLetters.push(letter);

    if (currentWord.indexOf(letter) != -1) {
        btn.classList.add("correct-btn");
        updateDisplay();
        
        let win = true;
        for (let i = 0; i < currentWord.length; i++) {
            if (guessedLetters.indexOf(currentWord[i]) == -1) {
                win = false;
            }
        }
        if (win == true) endGame(true);
    } else {
        btn.classList.add("wrong-btn");
        lives = lives - 1;
        updateHearts();
        if (lives <= 0) endGame(false);
    }
    btn.disabled = true;
}

function useHint() {
    if (hintsRemaining > 0) {
        let unrevealed = [];
        for (let i = 0; i < currentWord.length; i++) {
            if (guessedLetters.indexOf(currentWord[i]) == -1) {
                unrevealed.push(currentWord[i]);
            }
        }
        if (unrevealed.length > 0) {
            let randomChar = unrevealed[Math.floor(Math.random() * unrevealed.length)];
            hintsRemaining = hintsRemaining - 1;
            updateHintUI();
            let targetBtn = document.getElementById("btn-" + randomChar);
            handleGuess(randomChar, targetBtn);
        }
    }
}

function updateDisplay() {
    let displayStr = "";
    for (let i = 0; i < currentWord.length; i++) {
        if (guessedLetters.indexOf(currentWord[i]) != -1) {
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
    document.getElementById("hintBtn").innerText = "HINT (" + hintsRemaining + " LEFT)";
    if (hintsRemaining <= 0) {
        document.getElementById("hintBtn").disabled = true;
        document.getElementById("hintBtn").style.opacity = "0.5";
    }
}

function endGame(win) {
    clearInterval(timerInterval);
    
    let timeUsed = totalLevelTime - timeLeft;
    let mins = Math.floor(timeUsed / 60);
    let secs = timeUsed % 60;
    if (secs < 10) { secs = "0" + secs; }
    if (mins < 10) { mins = "0" + mins; }

    document.getElementById("idName").innerText = localStorage.getItem("pisayPlayerName") || "Student";
    document.getElementById("idLevel").innerText = difficulty.toUpperCase();
    document.getElementById("idTime").innerText = mins + ":" + secs;
    document.getElementById("idWord").innerText = currentWord;

    if (win == true) {
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
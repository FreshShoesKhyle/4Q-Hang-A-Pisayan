window.onload = function() {
    let name = localStorage.getItem("pisayPlayerName") || "Student";
    document.getElementById("playerNameDisplay").innerText = name;
};

function openInfo() {
    document.getElementById("infoModal").classList.remove("hidden");
}

function closeInfo() { 
    document.getElementById("infoModal").classList.add("hidden"); 
}

let currentStep = 0;
const tutorialSlides = [
    { 
        text: "STEP 1: Choose your difficulty! Options: Easy (5 min), Mid (7.5 min), and Hard (10 min). Guess correctly before time is up!", 
        img: "tut-step1.png" 
    },
    { 
        text: "STEP 2: Use the keyboard to guess letters. Wrong guesses cost you a heart! You only have 6 chances.", 
        img: "tut-step2.png" 
    },
    { 
        text: "STEP 3: Stuck? Use a Hint! This reveals a letter for you, but hints are limited per exam.", 
        img: "tut-step3.png" 
    },
    { 
        text: "STEP 4: Finish the word to pass the exam and receive your PASSED Student ID card!", 
        img: "tut-step4.png" 
    }
];

function openTutorial() {
    currentStep = 0;
    updateTutorialUI();
    document.getElementById("tutorialModal").classList.remove("hidden");
}

function closeTutorial() { 
    document.getElementById("tutorialModal").classList.add("hidden"); 
}

function updateTutorialUI() {
    const slide = tutorialSlides[currentStep];
    document.getElementById("tutorialDesc").innerText = slide.text;
    document.getElementById("tutorialImg").src = slide.img;
    document.getElementById("slideIndicator").innerText = `${(currentStep + 1)} / ${tutorialSlides.length}`;
}

function nextSlide() { 
    if (currentStep < tutorialSlides.length - 1) { 
        currentStep++; 
        updateTutorialUI(); 
    } 
}

function prevSlide() { 
    if (currentStep > 0) { 
        currentStep--; 
        updateTutorialUI(); 
    } 
}

function pickDifficulty() { 
    document.getElementById("modal").classList.remove("hidden"); 
}

function cancelGame() { 
    document.getElementById("modal").classList.add("hidden"); 
}

function selectDifficulty(level) { 
    localStorage.setItem("selectedDifficulty", level); 
    window.location.href = "game.html"; 
}

function gotoLeaderboard() { 
    window.location.href = "leaderboard.html"; 
}

function changeName() { 
    window.location.href = "index.html"; 
}
let currentFilter = "easy";

window.onload = function () {
    loadLeaderboard(currentFilter);
};

function filterLeaderboard(diff) {
    currentFilter = diff;
    loadLeaderboard(currentFilter);
}

function loadLeaderboard(diff) {

    let data = localStorage.getItem(`leaderboard_${diff}`);

    if (data !== null) {
        data = JSON.parse(data);
    } else {
        data = [];
    }

    let container = document.getElementById("leaderboard");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = `<div class="leaderboard-row">No records yet</div>`;
        return;
    }

    data.sort((a, b) => a.seconds - b.seconds);

    let limit = 5;
    if (data.length < 5) {
        limit = data.length;
    }

    for (let i = 0; i < limit; i++) {

        let entry = data[i];

        let row = document.createElement("div");
        row.className = "leaderboard-row";

        let left = document.createElement("div");
        left.className = "lb-left";
        left.innerText = `[${i + 1}] ${entry.name}`;

        let right = document.createElement("div");
        right.className = "lb-right";

        right.innerHTML = `
            <span class="lb-line">Difficulty: ${entry.difficulty}</span>
            <span class="lb-line">Word: ${entry.word}</span>
            <span class="lb-line">Time Took: ${entry.time}</span>
        `;

        row.appendChild(left);
        row.appendChild(right);

        container.appendChild(row);
    }
}

function triggerWeezer() {
    let popup = document.getElementById("weezerPopup");
    popup.style.display = "block";
    
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000);
}
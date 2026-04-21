function showGif() {
    const clickScreen = document.getElementById("clickScreen");
    const gifScreen = document.getElementById("gifScreen");
    const formScreen = document.getElementById("formScreen");

    clickScreen.classList.add("hidden");
    gifScreen.classList.remove("hidden");

    setTimeout(function() {
        gifScreen.classList.add("hidden");
        formScreen.classList.remove("hidden");
    }, 3000);
}

function saveAndGo() {
    let name = document.getElementById("nameInput").value.trim();

    if (name.length < 3) {
        alert("Name must be at least 3 characters.");
    } else {
        localStorage.setItem("pisayPlayerName", name);
        window.location.href = "home.html";
    }
}
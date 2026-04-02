function showGif() {
    document.getElementById("clickScreen").classList.add("hidden");
    document.getElementById("gifScreen").classList.remove("hidden");
    
    setTimeout(function() {
        document.getElementById("gifScreen").classList.add("hidden");
        document.getElementById("formScreen").classList.remove("hidden");
    }, 3000);
}

function saveAndGo() {
    var name = document.getElementById("nameInput").value.trim();
    if (name.length < 3) {
        alert("Name is too short! Use 3+ letters.");
    } else {
        localStorage.setItem("pisayPlayerName", name); //
        window.location.href = "home.html";
    }
}
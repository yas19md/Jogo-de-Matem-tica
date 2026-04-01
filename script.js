let level, lives, score, correctAnswer;
let ranking = [];

function startGame(selectedLevel) {
    level = selectedLevel;
    lives = 5;
    score = 0;

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    updateInfo();
    newQuestion();
}

function updateInfo() {
    document.getElementById("lives").textContent = lives;
    document.getElementById("score").textContent = score;
}

function newQuestion() {
    let a, b, question;

    if (level === "facil") {
        a = rand(1, 10);
        b = rand(1, 10);
        correctAnswer = a + b;
        question = `${a} + ${b}`;
    }

    if (level === "medio") {
        a = rand(10, 50);
        b = rand(1, 20);
        correctAnswer = a - b;
        question = `${a} - ${b}`;
    }

    if (level === "dificil") {
        a = rand(2, 12);
        b = rand(2, 12);
        correctAnswer = a * b;
        question = `${a} × ${b}`;
    }

    document.getElementById("question").textContent = question;

    generateOptions();
}

function generateOptions() {
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    let options = [correctAnswer];

    while (options.length < 4) {
        let wrong = correctAnswer + rand(-10, 10);
        if (!options.includes(wrong) && wrong >= 0) {
            options.push(wrong);
        }
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
        let btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("option");
        btn.onclick = () => checkAnswer(opt);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(answer) {
    if (answer === correctAnswer) {
        score += 10;
    } else {
        lives--;
    }

    updateInfo();

    if (lives <= 0) {
        endGame();
    } else {
        newQuestion();
    }
}

function endGame() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("gameOver").classList.remove("hidden");

    document.getElementById("finalScore").textContent = score;
}

function restart() {
    document.getElementById("gameOver").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}

function saveScore() {
    let name = document.getElementById("playerName").value || "Anônimo";

    ranking.push({ name, score });
    ranking.sort((a, b) => b.score - a.score);

    updateRanking();
    restart();
}

function updateRanking() {
    let list = document.getElementById("rankingList");
    list.innerHTML = "";

    ranking.slice(0, 5).forEach(player => {
        let li = document.createElement("li");
        li.textContent = `${player.name} - ${player.score} pontos`;
        list.appendChild(li);
    });
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
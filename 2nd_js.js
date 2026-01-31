let gameseq = [];
let userseq = [];

let btns = ["orange", "green", "yellow", "purple"];
let h2 = document.querySelector("h2");

let started = false;
let level = 0;

// 🧩 High score will only stay until page is open
let highScore = sessionStorage.getItem("highScore");

if (highScore === null) {
  highScore = 0;
} else {
  highScore = Number(highScore);
}

h2.innerText = `Press any key to start (High Score: ${highScore})`;

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    level = 0;
    levelUp();
  }
});

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 200);
}

function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level} (High Score: ${highScore})`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameseq.push(randColor);
  flash(randBtn);
}

function check(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      // ✅ Save only for this session
      sessionStorage.setItem("highScore", highScore);
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>
    High Score: <b>${highScore}</b><br>
    Press any key to restart.`;

    document.body.style.backgroundColor = "red";
    setTimeout(() => (document.body.style.backgroundColor = "white"), 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userflash(btn);

  let userColor = btn.getAttribute("id");
  userseq.push(userColor);
  check(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

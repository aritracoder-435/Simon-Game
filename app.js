let gameseq = [];
let userseq = [];

let btns = ["orange", "green", "yellow", "purple"];
let h2 = document.querySelector("h2");

let started = false;
let levle = 0;

let start_btn = document.querySelector("#start_btn");

// 🏆 High Score feature — Start always at 0 each session
let highScore = 0;

// create high score element (inside outer div)
let outer = document.getElementById("outer");
let highScoreDisplay = document.createElement("h3");
highScoreDisplay.id = "highScoreDisplay";
highScoreDisplay.innerText = `High Score: ${highScore}`;
outer.insertBefore(highScoreDisplay, document.querySelector(".btn-container"));

// ✅ when tab/window closes or refreshes — clear high score storage
window.addEventListener("beforeunload", function () {
  localStorage.removeItem("highScore");
});

start_btn.addEventListener("click", function () {
  if (started == false) {
    console.log("game start");
    started = true;
    levleup();
  }
});

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

// step 1 = game start and flash or  level up 1
function levleup() {
  userseq = [];
  levle++;
  h2.innerText = `level ${levle}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randcolor = btns[randIdx];
  let ranbtn = document.querySelector(`.${btns[randIdx]}`);
  gameseq.push(randcolor);
  console.log(gameseq);
  flash(ranbtn);
}

// step 2 = check user input
function check(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levleup, 1000);
    }
  } else {
    console.log(
      (h2.innerHTML = `game over! Your score was <b> level ${levle}</b> <br>Play again press start`)
    );
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "aqua";
    }, 150);

    // 🏆 High score update (only in this session)
    if (levle > highScore) {
      highScore = levle;
    }
    highScoreDisplay.innerText = `High Score: ${highScore}`;

    reset();
  }
}

function btnPress() {
  let btn = this;
  userflash(btn);

  usercolor = btn.getAttribute("id");
  userseq.push(usercolor);
  check(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btna of allbtns) {
  btna.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  levle = 0;
}

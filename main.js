let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let turnO = true;
let draw = true;

const winnerPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

const resetAll = () => {
  turnO = true;
  cnt = 0;
  draw = true;
  enabledBtn();
  msgContainer.classList.add("hide");
  resetBtn.classList.remove("hide1");
};

const disabledBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const noWinner = () => {
  let cnt = 0;
  for (let box of boxes) {
    if (box.disabled == true) cnt++;
  }
  if (cnt == 9) {
    msg.innerText = `Opps... Match Draw"`;
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hide1");

  }
};

const enabledBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is "${winner}"`;
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide1");
};

const checkWinner = () => {
  for (pattern of winnerPattern) {
    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;
    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 == val2 && val2 == val3) {
        disabledBtn();
        draw = false;
        showWinner(val1);
      }
    }
  }
};

const check = boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      turnO = false;
      box.innerText = "O";
    } else {
      turnO = true;
      box.innerText = "X";
    }
    box.disabled = true;
    checkWinner();
    if (draw) {
      noWinner();
    }
  });
});

newGameBtn.addEventListener("click", resetAll);
resetBtn.addEventListener("click", resetAll);

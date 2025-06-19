let boxes = document.querySelectorAll(".box") as NodeListOf<HTMLButtonElement>;
let resetBtn = document.querySelector("#reset-btn") as HTMLButtonElement;
let newBtn = document.querySelector("#new-btn") as HTMLButtonElement;
let msgContainer = document.querySelector(".msg-container") as HTMLDivElement;
let msg = document.querySelector("#msg") as HTMLParagraphElement;

let turn0 = true; // true for player 1, false for player 2
let moveCount = 0; // To track the number of moves made

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const showWinner = (winner) => {
  msg.innerText = `Congratualations, Winner is ${winner} `;
  msgContainer.classList.remove("hide");
  disableboxes();
};

const resetGame = () => {
  turn0 = true;
  enableboxes();
  moveCount = 0; // Reset move count
  msgContainer.classList.add("hide");
};

const disableboxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableboxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      box.style.color = "#2e86de"; // Blue for O
      turn0 = false;
    } else {
      box.innerText = "X";
      box.style.color = "#e74c3c"; // Red for X
      turn0 = true;
    }
    box.disabled = true;
    moveCount++;
    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
  }

  // Check for Draw
  if (moveCount === 9) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableboxes();
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

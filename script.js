var boxes = document.querySelectorAll('.box');
var resetBtn = document.querySelector('#reset-btn');
var newBtn = document.querySelector('#new-btn');
var msgContainer = document.querySelector('.msg-container');
var msg = document.querySelector("#msg");
var turn0 = true; // true for player 1, false for player 2
var moveCount = 0; // To track the number of moves made
var winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var showWinner = function (winner) {
    msg.innerText = "Congratualations, Winner is ".concat(winner, " ");
    msgContainer.classList.remove("hide");
    disableboxes();
};
var resetGame = function () {
    turn0 = true;
    enableboxes();
    moveCount = 0; // Reset move count
    msgContainer.classList.add("hide");
};
var disableboxes = function () {
    boxes.forEach(function (box) {
        box.disabled = true;
    });
};
var enableboxes = function () {
    boxes.forEach(function (box) {
        box.disabled = false;
        box.innerText = "";
    });
};
boxes.forEach(function (box) {
    box.addEventListener("click", function () {
        if (turn0) {
            box.innerText = "O";
            box.style.color = "#2e86de"; // Blue for O
            turn0 = false;
        }
        else {
            box.innerText = "X";
            box.style.color = "#e74c3c"; // Red for X
            turn0 = true;
        }
        box.disabled = true;
        moveCount++;
        checkWinner();
    });
});
var checkWinner = function () {
    for (var _i = 0, winPatterns_1 = winPatterns; _i < winPatterns_1.length; _i++) {
        var pattern = winPatterns_1[_i];
        var pos1Val = boxes[pattern[0]].innerText;
        var pos2Val = boxes[pattern[1]].innerText;
        var pos3Val = boxes[pattern[2]].innerText;
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
    }
};
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

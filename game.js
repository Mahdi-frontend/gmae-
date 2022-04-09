// create variables
let cells = [...document.querySelectorAll("li")];
let matchCells = [];
let moveCount = 0;
let moveCountSpan = document.querySelector("div.move-count span");
let minute = 0;
let seconds = 0;
let minuteSpan = document.querySelector("span.minute");
let secondSpan = document.querySelector("span.seconds");
let flag = true;
let matchCellsClick = [];
let timeInt = 0;
let modal = document.querySelector("div.modal-container");
let ul = document.querySelector("ul");
let btn = document.querySelector("button");

// random
// let cells = [];
// for (let c of cellsNode) {
//     cells.push(c)
// }

shuffle(cells);
// cells.push("harchi")

for (let cell of cells) {
    ul.appendChild(cell)
}
// console.log(cells)





// function
function show() {
    this.classList.add("show")
    matchCells.push(this);
    countUserMove();
    startTimer();
    if (matchCells.length == 2) {
        checkMatch();
    }
}

function checkMatch() {

    if (matchCells[0].innerHTML == matchCells[1].innerHTML) {
        matchCellsFunction();
    } else {
        unmatchCellsFunction()
    }

}

function matchCellsFunction() {
    matchCells[0].classList.add("match");
    matchCells[1].classList.add("match");
    matchCellsClick.push(matchCells[0], matchCells[1]);
    // console.log(matchCellsClick);
    matchCells = [];
}

function unmatchCellsFunction() {
    matchCells[0].classList.add("unmatch");
    matchCells[1].classList.add("unmatch");
    for (const cell of cells) {
        cell.classList.add("disabled");
    }
    setTimeout(function() {
        matchCells[0].classList.remove("show", "unmatch")
        matchCells[1].classList.remove("show", "unmatch")
        matchCells = [];
        for (const cell of cells) {
            cell.classList.remove("disabled")
        }
    }, 2000)
}

function countUserMove() {
    moveCount++;
    // console.log(moveCount)
    moveCountSpan.textContent = moveCount;
    if (moveCount > 5) {
        moveCountSpan.style.backgroundColor = "pink";
    }
}

function startTimer() {
    if (flag) {
        timeInt = setInterval(function() {
            seconds++;
            // console.log(seconds)
            secondSpan.textContent = seconds;
            if (seconds == 59) {
                minute++;
                minuteSpan.textContent = minute;
                seconds = 0;
            }
        }, 1000)
        flag = false;
    }
}
// game over function
function checkGameOver() {
    if (matchCellsClick.length == 16) {
        // console.log("finished");
        clearInterval(timeInt);
        modal.classList.add("show");

    }
}
// events
for (let cell of cells) {
    cell.addEventListener("click", show);
    cell.addEventListener("click", checkGameOver)
}
btn.addEventListener("click", function() {
    for (const cell of cells) {
        cell.classList.add("show")
    }
    setTimeout(function() {
        for (const cell of cells) {
            cell.classList.remove("show")
        }
    }, 3000)
})
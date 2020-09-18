/**step 1. determine the dif part of the app
step 2. list down the functionality of eaach part
step 3. write down in order what it needs to build
step 4. add more details to step 3. */
/**
FIRST step: When box is clicked display X or O.
--Identify if X has been displayed or not then display O.
SECOND step: Determine the winner.
--Display the winner.
THIRD step: When start button cllicked allow the user to click on each boxes.
--Determine if button is clicked if not play-area should not clickable and color gray.
FOURTH step: When refresh button is clicked the play area character display will 
erase.
--Determine if button refresh is clicked the play are should not be clickable and
turn it into color gray.
*/

const xClass = "x";
const circleClass = "circle";
const winningCombi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board_game");
const restartButton = document.getElementById("restartButton");

let circleTurn 

startGame()

restartButton.addEventListener("click", startGame)

function startGame () {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? circleClass : xClass
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurn()
        setBoardHoverClass()
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) ||
        cell.classList.contains(circleClass)
    })
}

function endGame(draw) {
    if (draw) {
        alert("Draw!")
    } else {
        alert(`${circleTurn ? "O's" : "X's"} Wins!`)
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurn() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    if (circleTurn) {
        board.classList.add(circleClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombi.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
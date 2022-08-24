console.log("Snake Game with JavaScript..!");

// Game Constant and Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('move.mp3');
const gameOverSound = new Audio('move.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('move.mp3');
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 20, y: 22 }
];
let food = { x: 15, y: 20 };

// Game Function
function main(cTime) {
    window.requestAnimationFrame(main);
    // console.log(cTime);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
}
//
function isCollide(snake) {
    // when snake collide with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 30 || snake[0].x <= 0 || snake[0].y >= 30 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // part 1: update the snake array & food
    if (isCollide(snakeArr)) {
        // gameOverSound.play();
        // musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press Any Key to Play Again!");
        snakeArr = [{ x: 20, y: 22 }];
        // musicSound.play();
        score = 0;
    }

    // if snake eat food generate new one
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        // foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "highScore: " + highScoreVal;
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 28;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = snakeArr[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part 2:
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// set high score in local storage
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    let highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else {
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "highScore: " + highScore;
}


// Main Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; // start the game
    // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            console.log("Use Arrow Keys");
            break;
    }
})

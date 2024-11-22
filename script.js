let playBoard = document.querySelector(".play-board");
let updatingScore = document.querySelector(".score");
let highScore=document.querySelector('.high-score');
// adding Score
let score = 1;

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameOver=false;
let setIntervalId;

// creating random position for snake food
let changefoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

// moving Snake Head using arrow key
let changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

let handleGameOver=()=>{
    //clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert(`Game is Over! Your Score is: ${score}  press Ok for Replay`);
    location.reload();
}

// creating snake food
let initGame = () => {
    if(gameOver === true) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;
    // creating snake head

    if (snakeX === foodX && snakeY === foodY) {
        changefoodPosition();
        // Add a new body part at the tail's position
        snakeBody.push([...snakeBody[snakeBody.length - 1]]);
        // updating score
        updatingScore.innerHTML = "Score " + score++;
        console.log(snakeBody);
    }

    snakeBody[0] = [snakeX, snakeY]; // adding first element of snake body

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // shifting forward the values of the element in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    // updating snake Head position based on the current position
    snakeX += velocityX;
    snakeY += velocityY;

    //Checking if snake head is out of wall , Then gameOver will be true;
    if(snakeX <=0 || snakeX > 30 || snakeY <=0 || snakeY > 30){
        gameOver=true;
        highScore.innerHTML="Total Score :"+score;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // adding div for each part of the snake body
        htmlMarkup += `<div class="snakeHead" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;


    }

    playBoard.innerHTML = htmlMarkup;
};


changefoodPosition();
setIntervalId = setInterval(initGame, 150);

// adding keyboard event
document.addEventListener("keydown", changeDirection);


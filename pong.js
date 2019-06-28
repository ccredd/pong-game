let canvas = document.getElementById("my canvas");
let ctx = canvas.getContext("2d");
let aPressed = false;
let zPressed = false;
let kPressed = false;
let mPressed = false;
let spacePressed = false;
let score = 0;
let x = canvas.width/2;
let y = canvas.height/2;
let vx = 3;
let vy = 3;
let paddleMovement = 10;
let leftPaddleY = 0;
let rightPaddleY = 650;
const paddleWidth = 30;
const paddleHeight = 100;
const ballRadius = 10;
const leftPaddleX = 0;
const rightPaddleX = 720;

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(e) {
    if (e.key === "a") aPressed = true;
    else if (e.key === "z") zPressed = true;
    else if (e.key === "k") kPressed = true;
    else if (e.key === "m") mPressed = true;
    else if (e.key === " ") spacePressed = true;
}

function keyUp(e) {
    if (e.key === "a") aPressed = false;
    else if (e.key === "z") zPressed = false;
    else if (e.key === "k") kPressed = false;
    else if (e.key === "m") mPressed = false;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#006400";
    ctx.fill();
    ctx.closePath();
}

function drawPaddles() {
    ctx.beginPath();
    ctx.rect(leftPaddleX, leftPaddleY, paddleWidth, paddleHeight);
    ctx.rect(rightPaddleX, rightPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#8B0000";
    ctx.fill();
    ctx.closePath();
}

function handleCollisions() {
    if (y + ballRadius > canvas.height || y - ballRadius < 0) vy = -vy;

    if (x - ballRadius < paddleWidth && leftPaddleY < y && y < leftPaddleY + paddleHeight) {
        vx = -vx
        x += ballRadius
        score++;
    }
    
    if (x + ballRadius > (canvas.width - paddleWidth) && rightPaddleY < y && y < rightPaddleY + paddleHeight) {
        vx = -vx;
        x -= ballRadius
        score++;
        }
    }
}

function endGame() {
    if (x - ballRadius < 0 || x + ballRadius > canvas.width) {
        alert("YOUR BALL HIT A VERTICAL WALL. CAN YOU BEAT YOUR LAST SCORE? TRY AGAIN");
        document.location.reload();
    }
}

function keepScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Your score: " + score, 8, 20);
}

function startScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.background = "#00FFFF";
    ctx.font = "40px Comic Sans MS";
    ctx.fillStyle = "#8B0000";
    ctx.fillText("ARE YOU READY TO PLAY PONG?", 50, 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Here are the rules:", 270, 100);
    ctx.fillText("Press the Space Bar to Begin", 200, 130);
    ctx.fillText("Press A to move the left paddle up", 200, 160);
    ctx.fillText("Press Z to move the left paddle down", 200, 190);
    ctx.fillText("Press K to move the right paddle up", 200, 220);
    ctx.fillText("Press M to move the right paddle down", 200, 250);
    ctx.fillText("If the ball hits a vertical wall, you lose", 200, 280);
    ctx.fillText("Try and Make it to 100 points", 200, 320);
    ctx.font = "40px Comic Sans MS";
    ctx.fillStyle = "#8B0000";
    ctx.fillText("READY, SET, GO!", 200, 350);
}

function gameScreen() {
    if (spacePressed) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddles();
        keepScore();
        handleCollisions();
        endGame();

        if (aPressed && leftPaddleY > 0) leftPaddleY -= paddleMovement;
        if (zPressed && leftPaddleY  < canvas.height - paddleHeight) leftPaddleY += paddleMovement;
        if (kPressed && rightPaddleY > 0) rightPaddleY -= paddleMovement;
        if (mPressed && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += paddleMovement;

        x += vx;
        y += vy;
    }
}

function draw() {
    startScreen();
    gameScreen();
    requestAnimationFrame(draw);
}

draw();



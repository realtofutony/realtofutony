const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let score = 0;
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const playerSpeed = 8;
let ballSpeedX = 5;
let ballSpeedY = 5;

let playerY = (canvas.height - paddleHeight) / 2;
let opponentY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

const keys = {
    ArrowUp: false,
    ArrowDown: false,
};

document.addEventListener('keydown', (e) => {
    if (e.key in keys) keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key in keys) keys[e.key] = false;
});

canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const touchY = touch.clientY - canvas.getBoundingClientRect().top;
    playerY = touchY - paddleHeight / 2;
});

document.getElementById('restartButton').addEventListener('click', restartGame);

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
}

function restartGame() {
    score = 0;
    ballSpeedX = 5;
    ballSpeedY = 5;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    playerY = (canvas.height - paddleHeight) / 2;
    opponentY = (canvas.height - paddleHeight) / 2;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('gameOver').classList.add('hidden');
    gameLoop();
}

function update() {
    if (keys.ArrowUp) playerY -= playerSpeed;
    if (keys.ArrowDown) playerY += playerSpeed;

    if (playerY < 0) playerY = 0;
    if (playerY + paddleHeight > canvas.height) playerY = canvas.height - paddleHeight;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY + ballSize > canvas.height) {
        ballSpeedY *= -1;
    }

    // Player paddle collision
    if (
        ballX < paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight
    ) {
        ballSpeedX *= -1;
        ballSpeedX *= 1.1;
        ballSpeedY *= 1.1;
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    }

    // Opponent paddle collision
    if (
        ballX > canvas.width - paddleWidth - ballSize &&
        ballY > opponentY &&
        ballY < opponentY + paddleHeight
    ) {
        ballSpeedX *= -1;
    }

    // Ball out of bounds
    // if (ballX < 0 || ballX > canvas.width) {
    //     document.getElementById('finalScore').innerText = score;
    //     document.getElementById('gameOver').classList.remove('hidden');
    //     return;
    // }

    // Opponent AI
    opponentY += ((ballY - (opponentY + paddleHeight / 2)) * 0.05);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, opponentY, paddleWidth, paddleHeight);
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function gameLoop() {
    update();
    draw();
    if (!document.getElementById('gameOver').classList.contains('hidden')) return;
    requestAnimationFrame(gameLoop);
}

gameLoop();

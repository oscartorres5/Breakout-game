let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');
let ballRadius = 9;
let x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3);
let y = canvas.height - 40;
let dx = 2;
let dy = -2;

// Draw Paddle 
let paddleHeight = 15;
let paddleWidth = 72;
let paddleX = (canvas.width - paddleWidth) / 2;

// Event listener for paddle movement
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// Bricks
let rowCount = 5;
let columnCount = 9;
let brickWidth = 54;
let brickHeight = 18;
let brickPadding = 12;
let topOffset = 40;
let leftOffset = 33;
let score = 0;

// Bricks array
let bricks = [];

for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
        // Set position of bricks
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Draw Bricks
function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = c * (brickWidth + brickPadding) + leftOffset;
                let brickY = r * (brickHeight + brickPadding) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// Check ball hit bricks
function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // Check win
                    if (score === rowCount * columnCount) {
                        alert('You win!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Track score
function trackScore() {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('Score: ' + score, 8, 24);
}

// Get the reset button
const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    location.reload();
}

// Main function
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBricks();
    drawBall();
    hitDetection();
    trackScore();

    // Detect left and right walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Detect top wall 
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // Detect paddle hits
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // If ball doesn't hit 
            alert('Game Over!');
            document.location.reload();
        }
    }

    // Bottom wall
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    // Move Ball
    x += dx;
    y += dy;

    // Request animation frame for smoother animation
    requestAnimationFrame(init);
}

// Call init to start the game
init();

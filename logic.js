let canvas = document.getElementById('game'),
ctx = canvas.getContext('2d'),
ballRadius = 9,
x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3);
y= canvas.height - 40,
dx = 2,
dy = -2;


//Draw Paddle 
let paddleHeight = 15,
paddleWidth = 72;

function drawPaddle()
{
    ctx.beginPath();
    ctx.roundRect(paddleX,canvas.height - paddleHeight, paddleWidth,paddleHeight,30);
    ctx.fillStyle = '#333';
    ctx.fillStyle();
    ctx.closePath();
}

//paddle start position
let paddleX = (canvas.width - paddleWidth)/2;

//paddle moving with mouse function 
document.addEvenetListener("mousemove",mouseMoveHandler,false);

function mouseMoveHandler(e)
{
    var relativeX = e.clientx - canvas.offsetLeft;
    if(relativeX > 0 && realative < canvas.width)
    {
        paddleX = relativeX - paddleWidth / 2;
    }
}

//Bricks
let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40, 
    leftOffset = 33,
    score = 0;

//Bricks array
let bricks = [];
for (let c = 0; c < columnCount;c++)
{
    bricks[c] = [];
    for (let r = 0;r<rowCount; r++)
    {
        //Set position of bricks
        bricks[c][r] = {x: 0, y: 0,status: 1};
    }
}

//Draw Bricks
function drawBricks()
{
    for (let c = 0; c < columnCount; c++)
    {
        for (let r = 0; r < rowCount; r++)
        {
            if (bricks[c][r].status === 1)
            {
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX,brickY,brickWidth,brickHeight,30);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//Draw ball
function drawBall()
{
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2)
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

//Main Function 
function init()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPaddle();
    drawBricks();


    //Detect left and right walls
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius)
    {
        dx = - dx;
    }

    //Detect top wall 
    if(y + dy < ballRadius)
    {
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius) 
    {
        //Detect paddle hits
        if(x > paddleX && x < paddleX + paddleWidth)
        {
            dy = -dy;
        } 
        else 
        {
            //If ball Doesn't hit 
            alert('Game Over!');
            document.location.reload();
        }
    }
}

setInterval(init, 10);
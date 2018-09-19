
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// canvas.width = 480
// canvas.height = 320

var x = canvas.width/2;
var y = canvas.height-30;
var radius = 10;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
    	// 碰撞检测会用到
        bricks[c][r] = { x: 0, y: 0 , status: 1};
    }
}

// var move = 20

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);


function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function collisionDetection() {
	for(var c = 0; c<brickColumnCount; c++ ) {
		for(var r = 0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			// if( x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight ) {
			// 	dy = -dy;
			// }
			// 要先判断方块是否存在
			if (b.status==1) {
				// 下切 y-r 和 上切 y+r
				// if(  x>=b.x && x<=(b.x+brickWidth) && ( (y-radius)<=(b.y+brickHeight)&&y>b.y+brickHeight || (y+radius)>=b.y&&y<b.y )  ) {
				// 	dy = -dy;
				// 	b.status = 0;
				// 	score+=1;
				// }
				// 右切 x-r 和 左切 x+r
				// if(  y>=b.y && y<=(b.y+brickHeight) && ( (x-radius)<=(b.x+brickWidth)&&x>b.x+brickWidth || (x+radius)>=b.x&&x<b.x)  ) {
				// 	dy = -dy;
				// 	b.status = 0;
				// 	score+=1;
				// }
				if(  ( x>=b.x && x<=(b.x+brickWidth) && ( (y-radius)<=(b.y+brickHeight)&&y>b.y+brickHeight || (y+radius)>=b.y&&y<b.y ) )   ||  (  y>=b.y && y<=(b.y+brickHeight) && ( (x-radius)<=(b.x+brickWidth)&&x>b.x+brickWidth || (x+radius)>=b.x&&x<b.x)  )  ) {
					dy = -dy;
					b.status = 0;
					score+=1;
					// score变化，即发生碰撞后立即判断是否打掉了所有方块
					// c*r 是错误的，这里会一直变化
					if (score == brickColumnCount*brickRowCount) {
						alert("You Win!!!  Your score:"+score);
						document.location.reload();
					}
				}
			}
		}
	}
}

// context.fillText(text,x,y,maxWidth); 
// x,y开始绘制位置 maxWidth 可选
function drawScore(argument) {
	ctx.font = "16px Arial";
	ctx.fillStyle = "0095DD";
	ctx.fillText("Score:"+score,8,20,);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect( paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight );
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	for(var c = 0; c<brickColumnCount; c++) {
		for(var r = 0; r<brickRowCount; r++) {
			if (bricks[c][r].status==1) {
				var brickX = c*( brickWidth + brickPadding ) + brickOffsetLeft;
				var brickY = r*( brickHeight + brickPadding ) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect( brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	// red()
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	collisionDetection();

	//  = 即相切时，还可以画一次
	if ( x+dx<radius || x+dx>canvas.width-radius) {
		dx=-dx;
	}
	if ( y+dy<radius ) {
		dy=-dy;
	} else if (y+dy>canvas.height-radius) {
		if(x>paddleX && x<paddleX+paddleWidth)
			dy=-dy;
		else {
			alert("Game Over!");
			document.location.reload();
		}
	}
// 若修改，会出现边界有空隙的情况
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
	x += dx;
	y += dy;
}

setInterval(draw,10);
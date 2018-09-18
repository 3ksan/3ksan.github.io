
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// canvas.width = 480
// canvas.height = 320

var x = canvas.width/2
var y = canvas.height-30
var r = 10
var dx = 2
var dy = -2


function drawBall() {
	ctx.beginPath()
	ctx.arc(x,y,r,0,Math.PI*2)
	ctx.fillStyle = "#0095DD"
	ctx.fill()
	ctx.closePath()
}

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBall()

	//  = 即相切时，还可以画一次
	if ( x+dx<r || x+dx>canvas.width-r) {
		dx=-dx
	}
	if ( y+dy<r || y+dy>canvas.height-r) {
		dy=-dy
	}

	x+=dx
	y+=dy

}


setInterval(draw,10)
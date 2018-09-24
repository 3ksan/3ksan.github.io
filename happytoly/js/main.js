var canvas = document.getElementById('canvas')

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

var w = canvas.width/14
var R = 4

var context = canvas.getContext('2d')

context.fillStyle = '#191970'
// context.fillStyle = '#1A237E'
context.fillRect(0,0,canvas.width,canvas.height)


for(var i=0;i<200;i++) {
  // 5~10
  var R = Math.random()*4+4
  var x = Math.random()*canvas.width
  var y = Math.random()*canvas.height
  var rot = Math.random()*360
  drawStar(context, R , R/2.0 , x , y, rot)
}


function drawStar (ctx,R,r,x,y,rot) {
  ctx.beginPath()
  for(var i=0;i<5;i++) {
    ctx.lineTo( Math.cos( (18+i*72-rot)/180*Math.PI )*R + x, -Math.sin( (18+i*72-rot)/180*Math.PI )*R + y)
    ctx.lineTo( Math.cos( (54+i*72-rot)/180*Math.PI )*r + x, -Math.sin( (54+i*72-rot)/180*Math.PI )*r + y)
  }

  ctx.closePath()
  ctx.fillStyle = "#fb3"
  ctx.strokeStyle = "#fd5"
  ctx.lineWidth = 2 
  ctx.fill()
  ctx.stroke()
}


draw()

function draw() {
  var x = w
  var y = canvas.height*1/5
  var num = 4
  for(var k = 0;k<num;k++) {
    drawWord(x,y,k,context)
      x+=canvas.width*3/14
  }
  x = w
  y = canvas.height*3/5

  for(var k = 4;k<8;k++) {
    drawWord(x,y,k,context)
      x+=canvas.width*3/14
  }
}



function  drawWord(x,y,k,ctx){
    ctx.fillStyle="rgb(0,102,153)";
    for(var i=0;i<word[k].length;i++){
        for(var j=0;j<word[k][i].length;j++){
            if(word[k][i][j] == 1){
                ctx.beginPath();
                ctx.fillStyle = "#FFFF00"
                // ctx.fillStyle = "#FFD740"
                ctx.arc(x+j*2*(R+1)+R+1,y+i*2*(R+1)+R+1, R,0,2*Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}




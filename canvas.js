var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");
let width,height;
function fixDPI(canvas) {
    dpi=window.devicePixelRatio;
    let style = {
        height() {
          return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
        },
        width() {
          return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
        }
      }
    width=style.width()*dpi;
    height=style.height()*dpi;
    canvas.setAttribute('width', style.width() * dpi);
    canvas.setAttribute('height', style.height() * dpi);
}
fixDPI(canvas);
let arr=[10,20,40,50,94,100,199,0,20,50,100,30];
ctx.strokeStyle = "#000000";
ctx.fillStyle="#000000";
ctx.lineWidth=2;
ctx.font = "15px Arial";
ctx.textAlign="right";
let x=0,y=0,end=199,head=50,padding=5;
let factor=width/(end+padding);
ctx.beginPath();
ctx.moveTo(x+padding,y);
ctx.lineTo(end*factor,y);
ctx.stroke();
ctx.beginPath();
ctx.arc(head*factor,y+5,5,0,2*Math.PI);
ctx.fill();
x=head*factor;
y=0;
ctx.fillText("head:"+head,x,y+25);
for(let req of arr)
{
    ctx.beginPath();
    ctx.moveTo(x,y);
    if(x>req*factor+padding)
        ctx.textAlign="left";
    else
        ctx.textAlign="right";
    x=req*factor+padding;
    y+=(height-100)/arr.length;
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fill();
    ctx.fillText(req,x,y+25);
}
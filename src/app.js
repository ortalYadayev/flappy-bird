var canvasElement = document.querySelector('canvas');
var context = canvasElement.getContext('2d');
var bg = new Image();
bg.src = "images/bg.png";
function draw() {
    context.drawImage(bg, 0, 0);
}
draw();

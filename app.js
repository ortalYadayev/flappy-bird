const canvasElement = document.querySelector('canvas');

const context = canvasElement.getContext('2d');

const bg = new Image();
bg.src = "images/bg.png"
draw();
function draw() {
    context.drawImage(bg,0,0);
}
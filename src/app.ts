const canvasEl = <HTMLCanvasElement> document.querySelector('canvas');

const context = <CanvasRenderingContext2D> canvasEl.getContext('2d');

const backgroundEl = new Image();
backgroundEl.src = "images/bg.png";

function draw() {
    context.drawImage(backgroundEl,0,0);
}

draw();
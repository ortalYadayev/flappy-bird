const canvasEl = <HTMLCanvasElement> document.querySelector('canvas');

const context = <CanvasRenderingContext2D> canvasEl.getContext('2d');

const backgroundEl = new Image();
backgroundEl.src = "images/background.png";

const foregroundEl = new Image();
foregroundEl.src = "images/foreground.png";

const birdEl = new Image();
birdEl.src = "images/bird.png";

const pipeTopEl = new Image();
pipeTopEl.src = "images/pipe-top.png";

const pipeBottomEl = new Image();
pipeBottomEl.src = "images/pipe-bottom.png";

const GAP = 85;
let PIPES_DISTANCE: number;

function init() {
    PIPES_DISTANCE = pipeTopEl.height + GAP;

    draw();
}

function draw() {
    context.drawImage(backgroundEl,0,0);

    context.drawImage(pipeTopEl, 144, -50);
    context.drawImage(pipeBottomEl, 144, -50 + PIPES_DISTANCE);

    // context.drawImage(pipeBottomEl, pX, pY + gap);
    context.drawImage(foregroundEl, 0, canvasEl.height - foregroundEl.height);
    // context.drawImage(birdEl, bX, bY);

    // requestAnimationFrame(draw);
}

window.onload = init;
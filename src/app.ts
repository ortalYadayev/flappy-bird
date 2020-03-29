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

const gameOverEl = new Image();
gameOverEl.src = "images/game-over.png";

const GAP = 85;
let PIPES_DISTANCE: number;

let birdX = 10;
let birdY = 150;
const gravity = 1.5;
const JUMP = 30;

let gameIsOver = false;
 let score : number;

 let fly = new Audio();
 fly.src = "sounds/fly.mp3";

 let scor = new  Audio();
scor.src = "sounds/score.mp3";

type Pipe = {
    x: number,
    y: number,
};

let pipes: Pipe[] = [];

function canvasClicked(): void {
    if (gameIsOver) {
        init();
    } else {
        birdJump();
        fly.play();
    }
}

function birdJump(): void {
    if (birdY < JUMP) {
        birdY = 0;
        return;
    }

    birdY -= JUMP;
}

function init() {
    PIPES_DISTANCE = pipeTopEl.height + GAP;

    pipes = [];
    gameIsOver = false;
    birdX = 10;
    birdY = 150;
    score = 0;

    pushNewPipe();

    canvasEl.addEventListener("click", canvasClicked);

    draw();
}

function draw() {
    context.drawImage(backgroundEl,0,0);
    context.drawImage(foregroundEl, 0, canvasEl.height - foregroundEl.height);

    pipes.forEach(pipe => {
        drawPipe(pipe);

        pipe.x--;

        if (isPipeCrossed100Px(pipe)) {
            pushNewPipe();
        }

        if(pipeIsEgual5(pipe)){
            growScore();
        }
    });

    context.drawImage(birdEl, birdX, birdY);
    birdY += gravity;

    if (birdTouchesPipes()) {
        gameOver();
    }

    if (birdTouchesForeground()) {
        gameOver();
    }

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : " + score, 10, canvasEl.height- 20);

    if (!gameIsOver) {
        requestAnimationFrame(draw);
    }
}

function pipeIsEgual5(pipe : Pipe): boolean {
    return pipe.x === 5;
}

function growScore(): void {
    score++;
    scor.play();
}

function drawPipe(pipe: Pipe): void {
    context.drawImage(pipeTopEl, pipe.x, pipe.y);
    context.drawImage(pipeBottomEl, pipe.x, pipe.y + PIPES_DISTANCE);
}

function  isPipeCrossed100Px(pipe: Pipe) : boolean{
    return pipe.x === canvasEl.width - 188;
}

function  pushNewPipe(): void {
    pipes.push({
        x: canvasEl.width,
        y: getRandomHeight()
    });
}

function getRandomHeight(): number {
    const min = 0;
    const max = pipeTopEl.height - 150;
    return -(Math.floor(Math.random() * (max - min + 1)) + min);
}

function birdTouchesPipes(): boolean {
    return pipes.some(birdTouchesPipe);
}

function birdTouchesPipe(pipe: Pipe): boolean {
    return birdX + birdEl.width >= pipe.x
        && birdX <= pipe.x + pipeTopEl.width
        && (birdY <= pipe.y + pipeTopEl.height || birdY + birdEl.height >= pipe.y + PIPES_DISTANCE);
}

function birdTouchesForeground(): boolean{
    return birdY + birdEl.height >= canvasEl.height - foregroundEl.height;
}

function gameOver(): void{
    gameIsOver = true;

    const width = canvasEl.width;
    const height = canvasEl.width / 3.9;

    context.drawImage(gameOverEl,0,canvasEl.height/4 - height/2, width, height);
}

window.onload = init;
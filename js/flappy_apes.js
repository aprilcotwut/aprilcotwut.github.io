const c = document.getElementById("game-canvas");
const ctx = c.getContext("2d");
const birdImage = new Image();
birdImage.src = "../img/me3.png";

const BACKGROUND_COLOR = "#DCD6FF";

let birdX = c.width / 3;
let birdY = c.height / 2;
let birdVelocity = 0;
const gravity = 0.5;
const jumpVelocity = -8;
const birdWidth = 50;
const birdHeight = 50;

let PIPE_COLOR = "#3003FE";
let pipeX = c.width;
let pipePassed = false;
let pipeWidth = 80;
let pipeGap = 150;
let pipeSpeed = 7;
let pipeHeight = Math.random() * (c.height - pipeGap);

let score = 0;

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, c.width, c.height);

  // draw the background
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, c.height, c.width);

  // Draw the bird
  ctx.drawImage(birdImage, birdX, birdY, birdWidth, birdHeight);

  // Draw the pipes
  ctx.fillStyle = PIPE_COLOR;
  ctx.fillRect(pipeX, 0, pipeWidth, pipeHeight);
  ctx.fillRect(pipeX, pipeHeight + pipeGap, pipeWidth, c.height - pipeHeight - pipeGap);

  // Draw the score
  ctx.fillStyle = "black";
  ctx.font = "1rem Monospace";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function update() {
  // Update the bird's position
  birdVelocity += gravity;
  birdY += birdVelocity;

  // Update the pipe's position
  pipeX -= pipeSpeed;

  // Check for collision with the pipes
  if (birdX + birdWidth > pipeX && birdX < pipeX + pipeWidth) {
    if (birdY < pipeHeight || birdY + birdHeight > pipeHeight + pipeGap) {
      endGame();
      return;
    }
  }

  // Check if the bird has passed the pipe
  if (birdX > pipeX + pipeWidth && !pipePassed) {
    score++;
    pipePassed = true;
  }

  // Check if the pipe is off the screen
  if (pipeX + pipeWidth < 0) {
    pipeX = c.width;
    pipeHeight = Math.random() * (c.height - pipeGap);
    pipePassed = false;
  }
}

function jump() {
  birdVelocity = jumpVelocity;
}

function endGame() {
  alert(`You died :( Your score is ${score}.`);
  clearInterval(gameLoopIntervalId);
  location.reload();
}

// Handle click events on the canvas
c.addEventListener("click", jump);

// Start the game loop
gameLoopIntervalId = setInterval(function() {
  update();
  draw();
}, 20);

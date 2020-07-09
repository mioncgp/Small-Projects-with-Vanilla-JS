// 1. Create canvas context
// 2. Create and draw ball
// 3. Create and draw paddle
// 4. Create bricks
// 5. Draw score
// 6. Add update() - Animate - requestAnimationFrame(cb)
// 7. Move paddle
// 8. Keyboard event handlers to move paddle
// 9. Move ball
// 10. Add wall bounderies
// 11. Increase score when bricks break
// 12. Lose - redraw bricks, reset score

const rules = document.getElementById("rules");
const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

// create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// draw score
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`);
}

// draw everything
function draw() {
  drawBall();
  drawPaddle();
}

draw();
// event lisneters
rulesBtn.addEventListener("click", (e) => {
  rules.className = "rules show";
});

closeBtn.addEventListener("click", (e) => {
  rules.className = "rules";
});
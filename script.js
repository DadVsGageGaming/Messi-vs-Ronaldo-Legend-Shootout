const canvas = document.getElementById("soccerGame");
const ctx = canvas.getContext("2d");

let ball = { x: 240, y: 160, dx: 4, dy: 4, radius: 10 };
let scoreMessi = 0;
let scoreRonaldo = 0;
let gameOver = false;

function drawField() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Goal areas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 120, 10, 80); // Left goal
  ctx.fillRect(canvas.width - 10, 120, 10, 80); // Right goal
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "18px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Messi (Barca): ${scoreMessi}`, 20, 20);
  ctx.fillText(`Ronaldo (Madrid): ${scoreRonaldo}`, 240, 20);
}

function kick() {
  if (gameOver) return;

  // Random kick direction
  ball.dx = (Math.random() * 8 + 2) * (Math.random() < 0.5 ? -1 : 1);
  ball.dy = (Math.random() * 4 - 2);
}

function resetGame() {
  scoreMessi = 0;
  scoreRonaldo = 0;
  gameOver = false;
  ball.x = 240;
  ball.y = 160;
  loop();
}

function update() {
  if (gameOver) return;

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off top/bottom
  if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
    ball.dy *= -1;
  }

  // Score logic
  if (ball.x < 10) {
    scoreRonaldo++;
    resetBall();
  } else if (ball.x > canvas.width - 10) {
    scoreMessi++;
    resetBall();
  }

  if (scoreMessi === 5 || scoreRonaldo === 5) {
    gameOver = true;
    setTimeout(() => {
      alert(scoreMessi === 5 ? "Messi wins! 🐐" : "Ronaldo wins! 🐐");
    }, 100);
  }
}

function resetBall() {
  ball.x = 240;
  ball.y = 160;
  ball.dx = 0;
  ball.dy = 0;
}

function draw() {
  drawField();
  drawBall();
  drawScore();
}

function loop() {
  update();
  draw();
  if (!gameOver) requestAnimationFrame(loop);
}

loop();

const canvas = document.getElementById("canvas");
canvas.style.border = "2px dashed red";
canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000";
ctx.shadowColor = "#000";
ctx.shadowBlur = 2;

let radius = 4;
let x = canvas.width / 2 - radius;
let y = canvas.height;
let angle = Math.PI / 2;
let speed = canvas.width / 300;

function draw() {
  ctx.moveTo(x, y);
  ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
  ctx.fill();
}

function iterate() {
  radius -= 0.01;

  x -= radius < 3.3 ? (radius - 2.9) * 0.1 : 0.1;
  x += offset;
  y -= speed * Math.sin(angle);
}

let offset = 0;
let offsetStep = 0.005;
function process() {
  ctx.beginPath();
  if (offset <= -0.1) {
    offsetStep = 0.005;
  } else if (offset >= 0.1) {
    offsetStep = -0.005;
  }
  offset += offsetStep;
  x += offset;
  while (radius > 3) {
    draw();
    iterate();
  }
}

function init() {
  radius = 4;
  x = canvas.width / 2 - radius;
  y = canvas.height;
}

let leafAngle = 0;
let leafAngleStep = -1;
let leafAngleBase = Math.PI / 180;
function animate() {
  init();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  process();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(leafAngle * leafAngleBase);
  if (leafAngle <= -10) {
    leafAngleStep = 1;
  } else if (leafAngle >= 10) {
    leafAngleStep = -1;
  }
  leafAngle += leafAngleStep;
  addLeftLeaf();
  addRightLeaf();
  ctx.restore();
  requestAnimationFrame(animate);
}

function addRightLeaf() {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -30, 10, -45, 50, -50);
  ctx.bezierCurveTo(45, -10, 30, 0, 0, 0);
  ctx.lineWidth = 5;
  ctx.fillStyle = "#8cce7f";
  ctx.strokeStyle = "blue";
  ctx.fill();
  ctx.quadraticCurveTo(23, -28, 35, -30);
  ctx.stroke();
}

function addLeftLeaf() {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -30, -10, -45, -50, -50);
  ctx.bezierCurveTo(-45, -10, -30, 0, 0, 0);
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.fillStyle = "#8cce7f";
  ctx.strokeStyle = "blue";
  ctx.fill();
  ctx.quadraticCurveTo(-23, -28, -35, -30);
  ctx.stroke();
}

animate();

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = "right";

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.key == "ArrowLeft" && direction != "right") direction = "left";
  if (event.key == "ArrowRight" && direction != "left") direction = "right";
  if (event.key == "ArrowUp" && direction != "down") direction = "up";
  if (event.key == "ArrowDown" && direction != "up") direction = "down";
}

function reiniciar() {
  direction = "none";
  snake = [];
  snake[0] = {
    x: 8 * box,
    y: 8 * box,
  };
  Swal.fire({
    title: "Game Over",
    text: "Jogar mais uma vez?",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim!",
    cancelButtonText: "Não, obrigado!",
  }).then((result) => {
    if (result.isConfirmed) {
      snake = [];
      snake[0] = {
        x: 8 * box,
        y: 8 * box,
      };
      direction = "right";
    } else {
      window.location.href = "https://www.google.com.br/";
    }
  });
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == "right") reiniciar();
  if (snake[0].x < 0 && direction == "left") reiniciar();
  if (snake[0].y > 15 * box && direction == "down") reiniciar();
  if (snake[0].y < 0 && direction == "up") reiniciar();

  criarBG();
  criarCobrinha();
  drawFood();

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      reiniciar();
    }
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "right") snakeX += box;
  if (direction === "left") snakeX -= box;
  if (direction === "up") snakeY -= box;
  if (direction === "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop(); // retira o ulitmo elemento do Array
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  snake.unshift(newHead); //adiciona um novo elemento
}

let jogo = setInterval(iniciarJogo, 80);

window.addEventListener("load", presentation);

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = "right";
let count_points = 0;

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

function presentation() {
  Swal.fire({
    title:
      "<div style='display:table-cell; vertical-align:middle; text-align:center'><img id='anaconda' src='img/anaconda.png' width = '20%' ></div>",
    html:
      "Este projeto foi desenvolvido para o bootcamp de " +
      "HTML Web Developer da " +
      "<a href='https://digitalinnovation.one/' target = '_blank'>DIO</a>",
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#3085d6",
    denyButtonColor: "#3085d6",
    confirmButtonText: '<i class="fas fa-play"></i>',
    cancelButtonText: '<i class="fab fa-linkedin-in"></i>',
    denyButtonText: '<i class="fab fa-github"></i>',
  }).then((result) => {
    if (result.isConfirmed) {
      prejogo();
    } else if (result.isDenied) {
      //github
      window.open("https://github.com/wellingtonf-souza");
      prejogo();
    } else {
      //linkedin
      window.open("https://www.linkedin.com/in/wellington-ferr-souza/");
      prejogo();
    }
  });
}

function prejogo() {
  Swal.fire({
    title: "Selecione um nível",
    input: "radio",
    inputOptions: ["Fácil", "Médio", "Difícil"],
    inputValidator: (value) => {
      if (!value) {
        return "É necessário informar um nível de dificuldade";
      }
    },
  }).then((result) => {
    if (result.value == 0) {
      let jogo = setInterval(iniciarJogo, 100);
    } else if (result.value == 1) {
      let jogo = setInterval(iniciarJogo, 80);
    } else {
      let jogo = setInterval(iniciarJogo, 60);
    }
  });
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
    text: "Você fez " + count_points + " pontos. Jogar mais uma vez?",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim!",
    cancelButtonText: "Não, obrigado!",
  }).then((result) => {
    if (result.isConfirmed) {
      count_points = 0;
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

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      reiniciar();
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

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
    count_points = count_points + 1;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  snake.unshift(newHead); //adiciona um novo elemento
}

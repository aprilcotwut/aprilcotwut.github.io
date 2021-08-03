const c = document.getElementById("snakeWindow");
const ctx = c.getContext("2d");

const WIDTH = c.width;
const HEIGHT = c.height;

const BACKGROUND_COLOR = "#DCD6FF";
const SNAKE_COLOR = "#3003FE";
const FOOD_COLOR = "#C503FF";
const HIT_COLOR = "#FF0022";

const SNAKE_SIZE = 20;
const SNAKE_SPEED = 50;

class Food {
  constructor(object = None) {
    this.eaten = false;
    this.pos = null;

    var inside = true;
    while (inside) {
      this.generate_food();
      inside = this.inside_body(object);
    }
  }

  inside_body(object) {
    for (var i = 0; i < object.length; i++) {
      for (var j = 0; j < 2; j++) {
        if (object[i][j] == this.pos[j]) {
          return true;
        }
      }
    }
    return false;
  }

  generate_food() {
    var x = Math.floor(Math.random() * (WIDTH/SNAKE_SIZE)) * SNAKE_SIZE;
    var y = Math.floor(Math.random() * (HEIGHT/SNAKE_SIZE)) * SNAKE_SIZE;
    this.pos = [x, y, SNAKE_SIZE, SNAKE_SIZE];
  }
}

class Snake {
  constructor(rect) {
    this.body = [rect];
    this.dead = false;
    this.score = 0;
  }

  move(pos, food) {
    let dx = pos[0]; let dy= pos[1];
    if (dx == 0 && dy == 0) {
      return;
    }

    var head = this.body[0];

    var new_x = head[0] + dx;
    var new_y = head[1] + dy;

    const new_head = [new_x, new_y, SNAKE_SIZE, SNAKE_SIZE];

    this.body.forEach((block) => {
      if (block.every((val, i) => val === new_head[i])) {
        console.log(block);
        console.log(new_head);
        this.hit_x = snake.body[0][0];
        this.hit_y = snake.body[0][1];
        this.dead = true;
      }
    });

    this.body.unshift(new_head);

    if (food.pos.every((val, i) => val === new_head[i])) {
      food.eaten = true;
      snake.score ++;
    } else {
      this.old_tail = this.body.pop();
    }
  }
}

const start_rect = [WIDTH/2, HEIGHT/2, SNAKE_SIZE, SNAKE_SIZE];
var snake = new Snake(start_rect);
var food = new Food(snake.body);

var dx = 0;
var dy = 0;

let update_count = 0;

function event_handler() {
  window.onkeydown = function (e) {
    var key = e.which || e.keyCode || 0;

    if([32, 37, 38, 39, 40].indexOf(key) > -1) {
        e.preventDefault();
    }

    if (key === 39 && dx != -SNAKE_SIZE && update_count < 1) {
      dx = SNAKE_SIZE;
      dy = 0;
      update_count++;
    } else if (key === 37 && dx != SNAKE_SIZE  && update_count < 1) {
      dx = -SNAKE_SIZE;
      dy = 0;
      update_count++;
    } else if (key === 38 && dy != SNAKE_SIZE && update_count < 1) {
      dx = 0;
      dy = -SNAKE_SIZE;
      update_count++;
    } else if (key === 40 && dy != -SNAKE_SIZE && update_count < 1) {
      dx = 0;
      dy = SNAKE_SIZE;
      update_count++;
    }
  }
}

event_handler();
var interval = setInterval(move_event, SNAKE_SPEED);

function game_over() {
  clearInterval(interval);
  // ctx.beginPath();
  // ctx.fillStyle = BACKGROUND_COLOR;
  // ctx.fillRect(0, 0, c.height, c.width);
  ctx.textStyle = SNAKE_COLOR;
  ctx.textAlign = "center";
  ctx.font = "bold 3rem Monospace";
  ctx.fillText("You Died :(", WIDTH/2, HEIGHT/3);
  ctx.fillText("Score: " + snake.score, WIDTH/2, HEIGHT/2.5);
}

function move_event() {
  update_count = 0;
  var alive = true;

  ctx.beginPath();
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, c.height, c.width);

  ctx.beginPath();
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, c.height, c.width);


  var new_move = [dx, dy, SNAKE_SIZE, SNAKE_SIZE];
  snake.move(new_move, food);

  var hit_x = -1;
  var hit_y = -1;

  if (snake.dead) {
    hit_x = snake.hit_x;
    hit_y = snake.hit_y;
    alive = false;
  }

  snake.body.forEach((block) => {
    var x = block[0];
    var y = block[1];
    if (x >= WIDTH || x < 0 || y >= HEIGHT || y < 0) {
      if ((x >= WIDTH || x < 0) && (y < HEIGHT && y >= 0)) {
        hit_x = Math.round(x/WIDTH) * (WIDTH - SNAKE_SIZE);
        hit_y = y;
      } else if ((y >= WIDTH || y < 0) && (x < HEIGHT && x >= 0)) {
        hit_y = Math.round(y/HEIGHT) * (HEIGHT - SNAKE_SIZE);
        hit_x = x;
      } else {
        hit_x = Math.round(x/WIDTH) * (WIDTH - SNAKE_SIZE);
        hit_y = Math.round(y/HEIGHT) * (HEIGHT - SNAKE_SIZE);
      }
      alive = false;
      snake.dead = true;
    }
  });

  snake.body.forEach((block) => {
    ctx.beginPath();
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(block[0], block[1], block[2], block[3]);
  });

  if (snake.dead) {
    // Fill in old tail
    ctx.beginPath();
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(snake.old_tail[0], snake.old_tail[1], SNAKE_SIZE, SNAKE_SIZE);
    // Fill in head in different color
    ctx.beginPath();
    ctx.fillStyle = HIT_COLOR;
    ctx.fillRect(hit_x, hit_y, SNAKE_SIZE, SNAKE_SIZE);
  }

  ctx.beginPath();
  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.pos[0], food.pos[1], food.pos[2], food.pos[3]);

  if (food.eaten) {
    food = new Food(snake.body);
  }

  if (!alive) {
    console.log(snake.old_tail)
    console.log(snake.body);
    console.log("dy");
    console.log(dy);
    console.log("dx");
    console.log(dx);
    game_over();
    return;
  }
}

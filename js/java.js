let background = new Image();
let food = new Image();
let score = 0;

background.src = "img/bckg.png";
let cnv = document.getElementById("cns");

food.src = "img/carrot.png";
let ctx = cnv.getContext("2d");

let zone = 32;
let PosX = 7;
let PosY = 8;

let snake = [];
snake[0] = {
    x: zone * PosX,
    y: zone * PosY,
}
snake[1] = {
    x: zone * (PosX + 1),
    y: zone * PosY,
}

let snakePos = 0; /* 1 -ЛЕво 3- право 2- вверх 4-низ */

let foodDraw = {
    x: Math.floor((Math.random() * 17 + 1)) * zone,
    y: Math.floor((Math.random() * 15 + 3)) * zone,
};
/* лево-37 право-39 вверх-38 вниз-40 */

document.addEventListener("keydown", move);

function move(key) {
    if (key.keyCode == 37) {
        snakePos = 1;
    } else if (key.keyCode == 38) {
        snakePos = 2;
    } else if (key.keyCode == 39) {
        snakePos = 3;
    } else if (key.keyCode == 40) {
        snakePos = 4;
    }
}

function game() {
    
   
    
    ctx.clearRect(0, 0, 608, 608);

    ctx.drawImage(background, 0, 0);

    ctx.drawImage(food, foodDraw.x, foodDraw.y);

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "#006400";
        } else {
            ctx.fillStyle = "#008000";
        }
        ctx.fillRect(snake[i].x, snake[i].y, zone, zone);
    }

    if (snake[0].x == foodDraw.x && snake[0].y == foodDraw.y) {
        score++;

        snake[snake.length] = {
            x: snake[snake.length - 1].x + zone,
            y: snake[snake.length - 1].y,
        }

        foodDraw = {
            x: Math.floor((Math.random() * 17 + 1)) * zone,
            y: Math.floor((Math.random() * 15 + 3)) * zone,
        };

    }

    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    if (snakePos == 1) {
        PosX = PosX - 1;
    } else if (snakePos == 2) {
        PosY = PosY - 1;
    } else if (snakePos == 3) {
        PosX = PosX + 1;
    } else if (snakePos == 4) {
        PosY = PosY + 1;
    }

    if (PosX < 0 || PosX > 18 || PosY < 2 || PosY > 18) {
        alert("Game Over");
        score=0;
        /* clearInterval(g);
         setInterval(game, 100);*/
    }

    snake[0] = {
        x: zone * PosX,
        y: zone * PosY,
    }
    for (let i = 2; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            alert("Game Over");
            score=0;
        }

    }

    ctx.fillStyle = "white";
    ctx.font ="50px Arial";
    ctx.fillText(score, zone*2.5,zone*1.8);   
}



let g = setInterval(game, 100);
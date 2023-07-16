function startSnake() {
    const canvas = document.getElementById("game");
    const scoreboard = document.getElementById("Scoreboard");
    var context = canvas.getContext("2d");
    var highscore = document.cookie;
    var speed = parseInt(localStorage.speed);
    var framerate = parseInt(localStorage.framerate);
    var size = parseInt(localStorage.size);
    if (isNaN(speed)) {
        speed = 5;
    }
    if (isNaN(framerate)) {
        framerate = 60;
    }
    if (isNaN(size)) {
        size = 25;
    }
    
    canvas.removeAttribute("onclick");
    document.getElementById("tip").style.display = "none";

    var grid = size;
    var count = 0;

    var snake = {
        x: 3*grid,
        y: 3*grid,
        dx: grid,
        dy: 0,
        cells: [],
        maxCells: 4,
    };
    var apple = {
        x: 6*grid,
        y: 6*grid,
    };

    var queuedMovements = [];

    document.addEventListener("keydown", function (event) {
        switch (event.code) {
            case "ArrowUp":
                if (snake.dy !== grid) {
                    queuedMovements.push({ dx: 0, dy: -grid });
                }
                break;
            case "ArrowDown":
                if (snake.dy !== -grid) {
                    queuedMovements.push({ dx: 0, dy: grid });
                }
                break;
            case "ArrowLeft":
                if (snake.dx !== grid) {
                    queuedMovements.push({ dx: -grid, dy: 0 });
                }
                break;
            case "ArrowRight":
                if (snake.dx !== -grid) {
                    queuedMovements.push({ dx: grid, dy: 0 });
                }
                break;
        }
    });

    function updateSnakeDirection() {
        if (queuedMovements.length > 0) {
            var nextMovement = queuedMovements.shift();
            snake.dx = nextMovement.dx;
            snake.dy = nextMovement.dy;
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    function loop() {

        requestAnimationFrame(loop);

        if (++count < (framerate / speed)) {
            return;
        }
        if (highscore < snake.cells.length) {
            highscore = snake.cells.length;
            document.cookie = `${highscore}`
        }
        scoreboard.innerHTML = `Speed: ${speed} Score: ${snake.cells.length}\nHighscore: ${highscore}`

        count = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);

        updateSnakeDirection();

        snake.x += snake.dx;
        snake.y += snake.dy;

        if (snake.x < 0) {
            snake.x = canvas.width - grid;
        } else if (snake.x >= canvas.width) {
            snake.x = 0;
        }

        if (snake.y < 0) {
            snake.y = canvas.height - grid;
        } else if (snake.y >= canvas.height) {
            snake.y = 0;
        }

        snake.cells.unshift({ x: snake.x, y: snake.y });

        if (snake.cells.length > snake.maxCells) {
            snake.cells.pop();
        }

        context.fillStyle = "white";
        context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

        context.fillStyle = "black";
        snake.cells.forEach(function (cell, index) {
            context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

            if (cell.x === apple.x && cell.y === apple.y) {
                snake.maxCells++;

                apple.x = getRandomInt(0, 500/size) * grid;
                apple.y = getRandomInt(0, 500/grid) * grid;
            }

            for (var i = index + 1; i < snake.cells.length; i++) {
                if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                    snake.x = 160;
                    snake.y = 160;
                    snake.cells = [];
                    snake.maxCells = 4;
                    snake.dx = grid;
                    snake.dy = 0;

                    apple.x = getRandomInt(0, 25) * grid;
                    apple.y = getRandomInt(0, 25) * grid;
                }
            }
        });
    }

    requestAnimationFrame(loop);
}
const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
let score = 0;
let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };

//start my game
const startGame = () => {
    direction = { x: 1, y: 0 }; // snake starts going to the right
    score = 0;
    scoreDisplay.textContent = score;
    snake = [{ x: 5, y: 5 }];
    placeFood();
    gameLoop();
};

// put food in a random new spot
const placeFood = () => {
    food.x = Math.floor(Math.random() * 10);
    food.y = Math.floor(Math.random() * 10);
};

// move  snake and check for game events
const gameLoop = () => {
    if (checkCollision()) {
        alert("Game Over!"); //  game over 
        return;
    }
    
    // game progresses by giving the snake new height after eating a red blob
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);

    // check if the snake eats its food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        placeFood(); // create new food
    } else {
        snake.pop(); 
    }

    draw();
    setTimeout(gameLoop, 200); // speed changes
};

//  the snake and food on the board
const draw = () => {
    board.innerHTML = ''; // Clear the board each frame

    // Draw the food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    // Draw the snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y + 1;
        snakeElement.style.gridColumnStart = segment.x + 1;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
};

// if snake hits wall or its own butt
const checkCollision = () => {
    const head = snake[0];
    return (
        head.x < 0 || head.x >= 10 || head.y < 0 || head.y >= 10 || // Wall collision
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y) // Self collision
    );
};

// event listener and keybinds for moving snake
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// changed to be enter key to start
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        startGame();
    }
});


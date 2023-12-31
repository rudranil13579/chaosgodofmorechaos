let direction = { x: 0, y: 0 };
let food = {x: 6,y:7};
const board = document.getElementById("container")
const foods = new Audio('./assets/food.mp3');
const moves = new Audio('./assets/move.mp3');
const musics = new Audio('./assets/music.mp3');
const ggbois = new Audio('./assets/gameover.mp3');
let speed = 5;
let score= 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13,y:12}
]


//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    } 
    lastPaintTime = ctime;
    gameEngine();
}


function isColide(sarr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x==snakeArr[0].x && snakeArr[i].y==snakeArr[0].y) {
            return true
        }}

        if (snakeArr[0].x >= 18 || snakeArr[0].y >=18 || snakeArr[0].x <= 0 || snakeArr[0].y <= 0) {
            return true  
        }
        
    
}


function gameEngine() {
    // update snake & food position

    if (isColide(snakeArr)) {
        ggbois.play();
        musics.pause();
        direction={x:0,y:0};
        alert("gg bois");
        snakeArr = [
            {x:13,y:12}
        ];
        musics.play();
        score=0;
    }

    //if snake eat
// Inside the if statement where the snake eats the food
if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foods.play();
    snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
    score += 1;
    scoreb.innerHTML = "score:" + score;

    let w = 0;
    while (w === 0) {
        // Generate new food position
        food = { x: Math.round(1 + 17 * Math.random()), y: Math.round(1 + 17 * Math.random()) };

        // Check for collisions with the snake
        w = 1; // Assume no collision initially
        for (let i = 0; i < snakeArr.length; i++) {
            if (snakeArr[i].x === food.x && snakeArr[i].y === food.y) {
                w = 0; // Reset w to 0 if collision is found
                break; // Exit the loop if collision is found
            }
        }
    }
}



    //moving the snake
    for (let i = snakeArr.length -2;  i>=0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;
    

    //display snake and food
    container.innerHTML =  "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x; 
        if (index === 0) {
            snakeElement.classList.add('shead');
        }
        else{
            snakeElement.classList.add('sbody');
        }
        container.appendChild(snakeElement);
    })

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x; 
        foodElement.classList.add('food');
        container.appendChild(foodElement);
}









//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    direction ={x:0,y:1}
    moves.play();
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y =  1;
            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }
});

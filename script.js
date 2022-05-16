gsap.from("h1", {
    y: -100,
    duration: 2.7,
    opacity:0,
    ease:"bounce.out",
    delay: .7
})
//


const canvas = document.querySelector('#game');
const ctx = canvas.getContext("2d");

const ground = new Image();         // Создание объекта
ground.src = "1.png";               // Указываем нужное изображение

const foodImg = new Image();        // Создание объекта еды
foodImg.src = "apple.png";         // Указываем нужное изображение

let box = 32;                      //размер миниквадрата(шага)
let score = 0;                     //переменная, которая хранит общий счёт в игре


                      //переменная, с координатами еды:
let food = {         
    x: Math.floor((Math.random() * 17 + 1)) * box,           // т.к. 17 клеточек в строке по горизонтали в canvas и умножаем на размер квадратика(он равен 32)
    y:Math.floor((Math.random() * 15 + 3)) * box,           // т.к. 15 клеточек в строке по вертикали в canvas и умножаем на размер квадратика (+3, чтобы картинка не заходила вверх на неигровое поле)
    }


                   //массив данных, с координатами самой змейки:
 let snake = [];
 snake[0] = {
     x: 9 * box,    //  9 клеточек отступ от края по горизонтали,чтобы змейка была посередине(исходя из размера нашей картинки)
     y: 10 * box    //  10 клеточек отступ от края по вертикали,чтобы змейка была посередине
 };

                   //ставим прослушку на клавиатуру
document.addEventListener('keydown', direction);
let dir;
function direction(e) {
    if(e.keyCode === 37 && dir != "right")
    dir = "left";
    else if(e.keyCode === 38 && dir != "down")
    dir = "up";
    else if(e.keyCode === 39 && dir != "left")
    dir = "right";
    else if(e.keyCode === 40 && dir != "up")
    dir = "down";
   // else if(e.keyCode === 32)
   
}
//  const btnUp = document.querySelector('#btnUp');
//  btnUp.addEventListener('click', getUp)
//  function getUp(){
// //     //как указать напрвление "вверх"
// move
// }
const btnUp = document.querySelector('#btnUp'); 
const btnLeft = document.querySelector('#btnLeft'); 
const btnRight = document.querySelector('#btnRight'); 
const btnDown = document.querySelector('#btnDown'); 

btnUp.addEventListener('click', () => { 
    dir = "up"; 
}); 

btnLeft.addEventListener('click', () => { 
    dir = "left"; 
}); 

btnRight.addEventListener('click', () => { 
    dir = "right"; 
}); 

btnDown.addEventListener('click', () => { 
    dir = "down"; 
});


                   // если змейка врезается в свой хвост:
function eatTail(head, tail) {
    for( let i = 0; i < tail.length; i++) {
        if(head.x === tail[i].x && head.y === tail[i].y) {
            clearInterval(game);
            gameOver();
        }
    }
}


             //создаём функцию, которая будет рисовать объекты внутри canvas 
 function drawGame() {
     ctx.drawImage(ground, 0, 0);  //functıon drawImage помогает нарисовать определенную
                                   //картинку в координатах x, y
     ctx.drawImage(foodImg, food.x, food.y);  // переносим "яблоко" на поле в рандомном порядке

     for(let i = 0; i < snake.length; i++) {  
      //   ctx.fillStyle = "green";   //fillStyle-создаём квардатик из которого будет состоять тело змейки зелёного цвета
         ctx.fillStyle = i === 0 ? "green": "red"; //fillStyle-создаём квардатик из которого будет состоять тело змейки(голова - зелёная, тело красное)
         ctx.fillRect(snake[i].x, snake[i].y, box, box);
     }
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana" ;
    ctx.fillText(score, box * 2.5, box * 1.7);            // текст вверху игрового поля по оси Х,У
                 //рисуем змейку
    let snakeX = snake[0].x;           // координаты для нашего первого элемента по Х
    let snakeY = snake[0].y;            // координаты для нашего первого элемента по У

             //змейка заглатывает еду
if(snakeX === food.x && snakeY === food.y) {
    score++;
    food = {         
        x: Math.floor((Math.random() * 17 + 1)) * box,  // т.к. 17 клеточек в строке по горизонтали в canvas и умножаем на размер квадратика(он равен 32)
        y: Math.floor((Math.random() * 15 + 3)) * box,    // т.к. 15 клеточек в строке по вертикали в canvas и умножаем на размер квадратика (+3, чтобы картинка не заходила вверх на неигровое поле)
        };
} 
else {
    snake.pop();    //удаляем последний элемент внутри змейки
}

    if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {    //если змейка выходит за пределы игрового поля, остановка игры
        clearInterval(game);
        gameOver();
    }
    
    if(dir === "left") snakeX -= box;
    if(dir === "right") snakeX += box;
    if(dir === "up") snakeY -= box;
    if(dir === "down") snakeY += box;

    //добавляем новый элемент "голову" змейки
    let newHead = {
        x: snakeX,
        y: snakeY
    };
eatTail(newHead, snake);

    snake.unshift(newHead)
}

 let game = setInterval(drawGame, 150);      // чтобы отображалась наша картинка в браузере


function gameOver() {
    alert('GAME OVER!')
}
 
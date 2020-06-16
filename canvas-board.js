/*------ DOM References -------*/
// movement display
let movementDisplay = document.getElementById("movement");
// status of game
let gameStatus = document.getElementById("status");
// canvas
let game = document.getElementById("game");
game.width = 800;
game.height = 400;

let ctx = game.getContext("2d");

// let counter = 0;
// document.getElementById("itemCounter").innerText = `${counter} items found!`

/* ------- Dramatis Personae ------- */
// Constructor function below
function Crawler(x, y, color, width, height) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.width = width;
  this.height = height;
  this.alive = true;
  this.render = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let hero = new Crawler(0, 0, "hotpink", 64, 64);
let enemy = new Crawler(500, 100, "#bada55", 64, 64);
let item1 = new Crawler(200, 100, "blue", 64, 64);
let item2 = new Crawler(650, 300, "red", 64, 64);
let item3 = new Crawler(700, 50, "yellow", 64, 64);
/*--------- Game Loop stuffs -------*/

const gameTick = () => {
  // Clear the canvas
  ctx.clearRect(0, 0, game.width, game.height);
  movementDisplay.innerText = `X:${hero.x} Y:${hero.y}`;
  // set or display hero x/y
  // check if ogre is allive
  // if alive, render ogre
  // TODO: CLEAN THIS UP!!
  hero.render();
  enemy.render();
  if (item1.alive){
  item1.render();
  } if (item2.alive) {
  item2.render();
  } if (item3.alive) {
    item3.render();
  } if (enemy.alive) {
    // check for colision
    detectEnemyHit();
    detectItem1Hit();
    detectItem2Hit();
    detectItem3Hit();
  } else {

    setInterval(loadEncounter, 2000);
  }
}

const detectEnemyHit = () => {
  // if collision set ogre.alive = false;
  // if hero's right side is greater than ogre's left side
  // if hero's left side is less than ogre's right side
  // if hero's top is less than ogre's bottom
  // if hero's bottom is greater than ogre's top
  if(hero.x + hero.width > enemy.x 
    && hero.x < enemy.x + enemy.width
    && hero.y < enemy.y + enemy.height
    && hero.y + hero.height > enemy.y) {
    enemy.alive = false;
    // change game message
    gameStory.innerText = "An enemy approaches!!"
  } 
}

const detectItem1Hit = () => {
  if (hero.x + hero.width > item1.x
  && hero.x < item1.x + item1.width
  && hero.y < enemy.y + item1.height
  && hero.y + hero.height > item1.y) {
    item1.alive = false;
    ctx.clearRect(200, 100, 64, 64)
    gameStory.innerText = "We found one of the 3 items need to battle the enemy!"
  }
}
const detectItem2Hit = () => {
  if (hero.x + hero.width > item2.x
  && hero.x < item2.x + item2.width
  && hero.y < enemy.y + item2.height
  && hero.y + hero.height > item2.y) {
    item2.alive = false;
    ctx.clearRect(650, 300, 64, 64)
    gameStory.innerText = "We found one of the 3 items need to battle the enemy!"
  }
}

const detectItem3Hit = () => {
  if (hero.x + hero.width > item3.x
  && hero.x < item3.x + item3.width
  && hero.y < enemy.y + item3.height
  && hero.y + hero.height > item3.y) {
    item3.alive = false;
    ctx.clearRect(700, 50, 64, 64)
    gameStory.innerText = "We found one of the 3 items need to battle the enemy!"
  }
}
const loadEncounter = () => {
  window.location = "battle-screen.html";
}

let gameLoop = setInterval(gameTick, 60);

/* -------- Moving and Shakin -----*/

const movementHandler = (e) => {
  switch(e.key) {
    case "w":
      // hero y decrement
      hero.y -= 10;
      break;
    case "d":
      // hero x increment
      hero.x += 10;
      break;
    case "s":
      // hero y increment
      hero.y += 10;
      break;
    case "a":
      // hero x decrement
      hero.x -= 10;
      break;
  }
}

document.addEventListener("keydown", movementHandler);

// // const updateCounter = () => {
//   document.getElementById("itemCounter").innerText = `${counter} items found!`
// }
// enemy = {
//   alive: true
// }

// item1 = {
//   alive: true
// }

// item2 = {
//   alive: true
// }

// item3 = {
//   alive: true
// }

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
let enemy = new Crawler(500, 100, "#bada55", 150, 200);
let item1 = new Crawler(200, 100, "blue", 64, 64);
let item2 = new Crawler(300, 300, "red", 64, 64);
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
  if (enemy.alive) {
    // check for colision
    detectEnemyHit()
  } else {

    setInterval(loadEncounter, 2000);
  } 
  // else, vall end game
  // render our crawlers
  hero.render();
  enemy.render();
  item1.render();
  item2.render();
  item3.render();
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
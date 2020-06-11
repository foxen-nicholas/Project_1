// let hero = {
//   level: 1,
//   health: 50
// }

// let baseAttack = hero.level;

// const attackModifier = () => {
//   let moddedAttack = Math.floor(Math.random() * 10);
//   return moddedAttack;
// }

// const heroAttack = () => {
//   let attack = baseAttack + attackModifier();
//   return attack;
// }

// console.log(heroAttack());




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

let hero = new Crawler(0, 0, "hotpink", 40, 50);
hero.catchySlogan = "You're anout to become french onion soup";
let ogre = new Crawler(500, 100, "#bada55", 150, 200);

/*--------- Game Loop stuffs -------*/

const gameTick = () => {
  // Clear the canvas
  ctx.clearRect(0, 0, game.width, game.height);
  movementDisplay.innerText = `X:${hero.x} Y:${hero.x}`;
  // set or display hero x/y
  // check if ogre is allive
  // if alive, render ogre
  // TODO: CLEAN THIS UP!!
  if (ogre.alive) {
    // check for colision
    detectHit()
  } else {
    endGame();
  } 
  // else, vall end game
  // render our crawlers
  hero.render();
  ogre.render();
}

const detectHit = () => {
  // if collision set ogre.alive = false;
  // if hero's right side is greater than ogre's left side
  // if hero's left side is less than ogre's right side
  // if hero's top is less than ogre's bottom
  // if hero's bottom is greater than ogre's top
  if(hero.x + hero.width > ogre.x 
    && hero.x < ogre.x + ogre.width
    && hero.y < ogre.y + ogre.height
    && hero.y + hero.height > ogre.y) {
      ogre.alive = false;
      // change game message
    gameStatus.innerText = "Bye Shrek!"
  } 
  // change game message

}

const endGame = () => {
  clearInterval(gameLoop);
  console.log("Game over bra");
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
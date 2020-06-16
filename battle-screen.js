/* Start by creating hero  and enemy var */

let hero = {
   level: 1,
   health: 50,
   mana: 30,
   alive: true
}

let enemy = {
  level: hero.level,
  health: 40,
  mana: 20,
  alive: true
}
/*---------- Base action stats plus modifiers and functions ---------*/
let baseAttack = hero.level;
let baseMagic = hero.level * 3;
let baseHealth = hero.health;
let baseMana = hero.mana;
let needManaText;
let magicActionTextCleared;
let counter = 0;
let attack;
let magic;
let moddedMagic;
let moddedAttack;

let enemyBaseAttack = enemy.level;
let enemyAttack;
let enemyMagic;
let enemyMagicAttack;
let enemyModdedAttack;

// Health and Mana display text for hero and enemies
document.getElementById("heroHealth").innerText = `Health: ${hero.health}`;
document.getElementById("heroMana").innerText = `Mana: ${hero.mana}`;
document.getElementById("enemyHealth").innerText = `Health: ${enemy.health}`;
document.getElementById("enemyMana").innerText = `Mana: ${enemy.mana}`

const enemyAttackModifier = () => {
  enemyModdedAttack = Math.floor(Math.random() * 10);
  if (enemyModdedAttack <= 1) {
    console.log("The enemy missed!")
    return enemyModdedAttack
  } else {
    return enemyModdedAttack
  }
}

const enemyAttackAction = () => {
  enemyAttack = enemyBaseAttack + enemyAttackModifier();
  if (enemyModdedAttack >= 1) {
    hero.health -= enemyAttack;
    console.log(hero.health);
    updateHeroHealth();
    enemyAttackDamageText();
    enemyAttackActionTextCleared = setTimeout(clearEnemyActionText, 2000);
  }
}



// Create attack modifier with chance to hit self
const attackModifier = () => {
  moddedAttack = Math.floor(Math.random() * 10);
  if (moddedAttack < 1) {
    hero.health -= 10;
    console.log(hero.health + " Ouch, we hit ourself.")
    updateHeroHealth(); 
    return moddedAttack;
  } else {
  return moddedAttack;
  }
}
// Create a function that calculates hero attack damage
// Needs to show how much damage the hero does to the enemy or himself
// Needs to clear action box
const heroAttack = () => {
  attack = baseAttack + attackModifier();
  if (moddedAttack >= 1) {
    enemy.health -= attack;
    updateEnemyHealth();
    heroAttackDamageText();
    attackActionTextCleared = setTimeout(clearHeroActionText, 2000);
    enemyAlive();
    enemyAttackAction();
    return attack;
  } else {
    console.log(attack);
    heroAttackDamageTextToSelf();
    attackActionTextCleared = setTimeout(clearHeroActionText, 2000);
  }
}
// Base magic modifier that either hits the enemy or the hero because of low % miscast
const magicModifier = () => {
  moddedMagic = Math.floor(Math.random() * 20);
  if (moddedMagic <= 2 && hero.mana > 6) {
    hero.health -= 10;
    console.log(hero.health + " Bruh, you need some more practice!");
    updateHeroHealth();
    return moddedMagic;
  } else {
  return moddedMagic;
  }
}
// Create a function that calculates the magic action damage or what happens overall
// Needs to  show how much damage it does to either the hero or the enemy
// Needs to check if the moddedMagic was 2 or less to print that the hero hits himself
// Needs a check for if mana is too low to cast
// Needs to clear the action text box
const heroMagic = () => {
  magic = baseMagic + magicModifier();
  if (moddedMagic > 2) {
    if (hero.mana < 6) {
      needMana();
      magicActionTextCleared = setTimeout(clearHeroActionText, 2000);
      counter ++;
      if (counter === 3) {
        needToRest();
        counter = 0;
        magicActionTextCleared = setTimeout(clearHeroActionText, 2500);
      }
    } else {
    hero.mana -= 7;
    enemy.health -= magic;
    updateHeroMana();
    console.log(enemy.health)
    updateEnemyHealth();
    heroMagicDamageText();
    magicActionTextCleared = setTimeout(clearHeroActionText, 2000);
    enemyAlive();
    return magic;
    }
  } else {
    hero.mana -= 7;
    updateHeroMana();
    heroMagicDamageTextToSelf();
    magicActionTextCleared = setTimeout(clearHeroActionText, 2000);
    return magic;
  }

}

 //Create a rest function to regain health and mana.
const heroRest = () => {
  hero.health += Math.floor(50/3);
  hero.mana += Math.floor(30/3);
  if (hero.health > 50) {
    hero.health = baseHealth;
  }
  if (hero.mana > 30) {
    hero.mana = baseMana;
  }
  updateHeroStatus();
  console.log(hero.health);
}

// Health and Mana display text for hero and enemies
// document.getElementById("heroHealth").innerText = `Health: ${hero.health}`;
// document.getElementById("heroMana").innerText = `Mana: ${hero.mana}`;
// document.getElementById("enemyHealth").innerText = `Health: ${enemy.health}`;
// document.getElementById("enemyMana").innerText = `Mana: ${enemy.mana}`


document.getElementById("attack").addEventListener("click", heroAttack);
document.getElementById("magic").addEventListener("click", heroMagic);
document.getElementById("rest").addEventListener("click", heroRest);

// Hero Status update functions
const updateHeroHealth = () => {
  document.getElementById("heroHealth").innerText = `Health: ${hero.health}`;
}
const updateHeroMana = () => {
  document.getElementById("heroMana").innerText = `Mana: ${hero.mana}`;
} 

const updateHeroStatus = () => {
  updateHeroHealth();
  updateHeroMana();
}

// Enemy status update functions
const updateEnemyHealth = () => {
  if (enemy.health < 0) {
    enemy.heath = 0;
    document.getElementById("enemyHealth").innerText = `Health: ${enemy.health}`
  }
  document.getElementById("enemyHealth").innerText = `Health: ${enemy.health}`
}

const updateEnemyMana = () => {
  document.getElementById("enemyMana").innerText = `Mana: ${enemy.mana}`;
}

const updateEnemyStatus = () => {
  updateEnemyHealth();
  updateEnemyMana();
}

// Set Intervals/Time out functions for action text.
const heroAttackDamageText = () => {
  document.getElementById("heroActionText").innerText = `Hero hits the enemy for ${attack}!`
}

const heroAttackDamageTextToSelf = () => {
  document.getElementById("heroActionText").innerText = "Hero hits himself for 10 damage!"
}

const needMana = () => {
  document.getElementById("heroActionText").innerText = "We need more mana, bro!";
}

const heroMagicDamageText = () => {
  document.getElementById("heroActionText").innerText = `Hero hits the enemy for ${magic} damage!`;
}

const heroMagicDamageTextToSelf = () => {
  document.getElementById("heroActionText").innerText = "Hero hits himself for 10 magical damage!";
}

const clearHeroActionText = () => {
  document.getElementById("heroActionText").innerText = "";
}

const needToRest = () => {
  document.getElementById("heroActionText").innerText = "We should rest for some mana!"
}

const enemyAttackDamageText = () => {
  document.getElementById("enemyActionText").innerText = `Enemy hits hero for ${enemyAttack}  damage!`
}


const clearEnemyActionText = () => {
  document.getElementById("enemyActionText").innerText = "";
}
// Game state checks/End game function
const enemyAlive = () => {
  if (enemy.health <= 0) {
    enemy.alive = false;
    console.log(enemy.alive);
    enemyBeaten = setInterval(enemyDeadText, 2000);
    loadWinScreen = setInterval(winScreen, 3500);
  }
}

const enemyDeadText = () => {
  document.getElementById("heroActionText").innerText = "You have beaten the enemy!";
}

const heroAlive = () => {
  if (hero.health <= 0) {
    hero.alive = false;
    console.log(hero.alive)
  }
}

const winScreen = () => {
  window.location = "win-screen.html";
}
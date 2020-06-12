/* Start by creating hero  and enemy var */

let hero = {
   level: 1,
   health: 50,
   mana: 30 
}

let enemy = {
  level: hero.level,
  health: 40
}
/*---------- Base action stats plus modifiers and functions ---------*/
let baseAttack = hero.level;
let baseMagic = hero.level * 3;

const attackModifier = () => {
  let moddedAttack = Math.floor(Math.random() * 10);
  return moddedAttack;
}

const heroAttack = () => {
  let attack = baseAttack + attackModifier();
  console.log(attack);
  return attack;
}

const magicModifier = () => {
  let moddedMagic = Math.floor(Math.random() * 20);
  if (moddedMagic <= 2) {
    hero.health -= 10;
    console.log(hero.health + " Bruh, you need some more practice!");
  } else {
  return moddedMagic;
  }
}

const heroMagic = () => {
  let magic = baseMagic + magicModifier();
  return magic;
}

const heroRest = () => {
  hero.health += Math.floor(50/3);
  console.log(hero.health);
}
// Event Listeners for clickables
document.getElementById("heroHealth").innerText = `Health: ${hero.health}`;
document.getElementById("heroMana").innerText = `Mana: ${hero.mana}`;
document.getElementById("attack").addEventListener("click", heroAttack);
document.getElementById("magic").addEventListener("click", heroMagic);
document.getElementById("rest").addEventListener("click", heroRest);
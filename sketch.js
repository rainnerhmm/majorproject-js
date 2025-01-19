// majorproject
// Rainn Morphy
// Nov 18th, 2024
//
// Extra for Experts:
// - describe what you did to take this project `above and beyond`

// links 
// https://p5js.org/examples/
// https://editor.p5js.org/codingtrain/collections
// https://editor.p5js.org/codingtrain/sketches/hZWcc0Vi-
// https://editor.p5js.org/codingtrain/sketches/YzFpEGdsl
// https://editor.p5js.org/michellu0929/sketches/KL0ydodUa
// https://p5js.org/tutorials/creating-styling-html/
//

// Creature Class is responsible for the location of creature, its lifestate, displaying it, the info
// Health, hunger, and whatever other meters

// the class will be split into sub classes that represent its lifestate, egg, young, adult, old

class Creature {
  constructor(x, y, creature, sound) {
    this.x = x;
    this.y = y;
    this.counter = 0;
    this.egg = CREATURE_EGG;
    this.creature = creature;
    this.sound = sound;
    this.death = CREATURE_GRAVE;
    this.status = this.egg;
    this.name = ``;
    this.health = MAX_HEALTH;
    this.hunger = MAX_HUNGER;
  }

  update(x, y) {
    this.display();
    this.food();
  }

  display() {
    fill('black');
    // creature life cycle
    textSize(windowWidth / 5);
    text(this.status, this.x, this.y);

    // creature click counter
    if (this.status === CREATURE_EGG) {
      textSize(windowWidth / 10);
      text(this.counter, this.x, this.y);
    }

    if (this.status === this.creature) {
      textSize(windowWidth / 25);
      text(`creature name: ${this.name}`, windowWidth / 2, windowHeight / 1.3);

      // health meter
      fill('grey');
      arc(width, height, height * 0.7, height * 0.7, PI, PI + HALF_PI);
      fill('#ff0054ff');
      arc(width, height, height * 0.7, height * 0.7, PI, PI + HALF_PI * this.health / MAX_HEALTH);

      fill('black');
      arc(width, height, height * 0.5, height * 0.5, PI, PI + HALF_PI);
      image(healthSymbol, width * 0.919, height * 0.84, healthSymbol.width / 6, healthSymbol.height / 6);

      push();
      // hunger meter
      scale(-1, 1); // scale -1, 1 reverses the x axis, keep y the same.
      fill('grey');
      arc(0, height, height * 0.7, height * 0.7, PI, PI + HALF_PI);
      fill('#ffb800ff');
      arc(0, height, height * 0.7, height * 0.7, PI, PI + HALF_PI * this.hunger / MAX_HUNGER);

      fill('black');
      arc(0, height, height * 0.5, height * 0.5, PI, PI + HALF_PI);
      pop();
      image(hungerSymbol, width * 0.01, height * 0.82, hungerSymbol.width / 6, hungerSymbol.height / 6);
    }
  }

  life() {
    if (this.status === CREATURE_EGG || this.status === this.creature) {
      soundEffects();
    }
    if (this.status === CREATURE_EGG) { // code for the egg state of your creatures life
      this.counter++;
      if (this.counter >= 5) {
        console.log('lifeSound');

        dinoSound.play();

        lastSwitchedTime = millis();

        this.status = this.creature;
        theTextSystem.update();
      }
    }

    if (this.status === this.creature) {
      console.log(this.creature);
      if (this.health >= 0) {
        this.health -= 5;
        console.log(this.health);
        if (this.health <= 0) {
          this.health = 0;
          this.status = this.death;
          soundEffects();
        }
      }
    }
  }

  food() {
    if (this.status === this.creature) {
      if (millis() > lastSwitchedTime + SECOND_DURATION * 5 && this.hunger >= 0) {
        if (this.hunger <= 0) {
          this.hunger = 0;
        }
        lastSwitchedTime = millis();
        console.log(lastSwitchedTime);
        this.hunger -= 1;
        console.log(this.hunger);
      }
    }
    else {
      lastSwitchedTime = millis();
    }
  }
};

class TextSystem {
  constructor(min, max) {
    this.min = min || 1;
    this.max = max || 12;
    this.textInput = ``;
    this.textLength;
    this.finalString = ``;
  }

  input(input) {
    if (keyboardState === `type` && this.textLength <= this.max) {
      this.textInput += input;
    }
    if (keyboardState === `delete` && this.textLength >= this.min) {
      this.textInput = input;
    }
  }

  disp() {
    textSize(windowWidth / 30);
    text(`${this.textInput}_`, windowWidth / 2, windowHeight / 1.2);
  }

  update() {
    textFlag = true;
  }

  enter() {
    if (keyboardState === `enter` && this.textLength >= this.min) {
      textFlag = false;
      this.finalString = this.textInput;
      console.log(this.finalString);
      newCreature.name = this.finalString;
    }
  }
}  // possibly consider switch cases instead of if statments later on

class Menus {
  // must track mouse movements, and register 
  constructor(state) {
    this.state = state;
    this.xTrack = mouseX;
    this.yTrack = mouseY;
    this.head = ``;
    this.subhead = ``;
  }

  update() {
    this.disp();
    this.paused();
    this.title();
  }

  input() {
    this.state = `play`;
  }

  disp() {
    textSize(windowWidth / 45);
    text(this.head, width / 2, height / 2);
    text(this.subhead, width / 2, height / 1.7);
  }

  title() {
    if (this.state === `title`) {
      this.head = `majorproject`;
      this.subhead = `click to start`;
    }
  }

  paused() {
    console.log(`paused`);
    this.head = `paused`;
    this.subhead = `paused`;
  }
}

let newCreature, theTextSystem, theMenus;

const CREATURE_EGG = `🥚`;
const CREATURE_GRAVE = `🪦`;

let textFlag = false;
let keyboardState = `null`;

let lastSwitchedTime = 0;

const MAX_HUNGER = 100; // Max amount of the Hunger meter
const MAX_HEALTH = 100; // Max amount of the Health meter

const SECOND_DURATION = 1000; // Multiply by an desired amount of seconds to get it

let hitSound, rockSound, chickenSound, lobsterSound, dogSound, catSound, horseSound, penguinSound, dinoSound, humanSound, sheepSound, deathSound;
let healthSymbol, hungerSymbol;

let creatureTypes = [
  ["rock", '🪨'],
  ["chicken", `🐓`],
  ["lobster", `🦞`],
  ["dog", `🐕`,],
  ["cat", '🐈',],
  ["horse", '🐎'],
  ["penguin", '🐧'],
  ["dinosaur", '🦕'],
  ["sheep", '🐑'],
  ["human", '🧍'],
];

function preload() {
  hitSound = loadSound(`assets/sounds/hitSound.mp3`);
  hitSound.amp(0.5);
  humanSound = loadSound(`assets/sounds/humanSound.mp3`);
  humanSound.amp(1.5);
  dinoSound = loadSound(`assets/sounds/dinoSound.mp3`);
  dinoSound.amp(1.5);
  deathSound = loadSound(`assets/sounds/deathSound.mp3`);
  deathSound.amp(0.3);

  healthSymbol = loadImage(`healthSymbol.png`);
  hungerSymbol = loadImage(`hungerSymbol.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER, CENTER);
  // creating classes
  let randomNumber = round(random(0, 9));
  newCreature = new Creature(width / 2, height / 2, creatureTypes[randomNumber][1]);
  theTextSystem = new TextSystem;
  theMenus = new Menus;

  theMenus.state = `title`;
}

function draw() {
  background(220);
  if (theMenus.state === `title`) {
    theMenus.update();
  }

  if (theMenus.state === `play`) {
    newCreature.update();
    theTextSystem.disp();
    // displays notable info (debug only)
    if (theMenus.state === `paused`) {
      theMenus.update();
      dispFrameRate();
      text(keyboardState, windowWidth / 2, windowHeight / 1.1);

    }
  }
}

function soundEffects() {
  if (newCreature.status === CREATURE_EGG || newCreature.status === newCreature.creature) {
    console.log('hitSound');
    hitSound.play();
  }
  if (newCreature.status === CREATURE_GRAVE) {
    console.log('deathSound');
    deathSound.play();
  }
}

function dispFrameRate() {
  let frameRateInput = `FPS: ${Math.round(frameRate())}`;
  textSize(windowWidth / 45);
  text(frameRateInput, windowWidth * 0.05, windowHeight * 0.05);

}

function time() {
  let hourOf = hour();
  let minuteOf = minute();
  let secondOf = second();

  let yearOf = year();
  let monthOf = month();
  let dayOf = day();

  textSize(windowWidth / 25);
  text(`Time: ${hourOf}:${minuteOf}:${secondOf} p.m.`, windowWidth / 2, windowHeight / 5);
  textSize(windowWidth / 45);
  text(`Date: ${yearOf}-${monthOf}-${dayOf}`, windowWidth / 2, windowHeight / 3.7);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  if (theMenus.state !== `play` || theMenus.state !== `paused`) {
    theMenus.input();
  }
  newCreature.life();
}

function keyPressed() {
  // use keycodes to determine if key is allowed
  if (keyCode === 27) {
    theMenus.update();
    if (theMenus.state === `paused`) {
      theMenus.state = `play`;
    }
    if (theMenus.state === `play`) {
      theMenus.state = `paused`;
    }
  }

  if (textFlag) {
    theTextSystem.textLength = theTextSystem.textInput.length;
    if (keyCode >= 65 && keyCode <= 90 || keyCode === 32) {
      keyboardState = `type`;
      fill(`black`);
      theTextSystem.input(key);
    }

    else if (keyCode === 8) {
      keyboardState = `delete`;
      theTextSystem.input(theTextSystem.textInput.slice(0, theTextSystem.textInput.length - 1));
    }

    else if (keyCode === 13) {
      keyboardState = `enter`;
      theTextSystem.enter();
    }
  }
}

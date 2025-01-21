// majorproject
// Rainn Morphy
// Nov 18th, 2024

// links I never ended up using
// https://p5js.org/examples/
// https://editor.p5js.org/codingtrain/collections
// https://editor.p5js.org/codingtrain/sketches/hZWcc0Vi-
// https://editor.p5js.org/codingtrain/sketches/YzFpEGdsl
// https://editor.p5js.org/michellu0929/sketches/KL0ydodUa
// https://p5js.org/tutorials/creating-styling-html/


// Creature Class is responsible for the location of creature, its lifestate, displaying it, the info
// Health, hunger, and whatever other meters

// the class will be split into sub classes that represent its lifestate, egg, young, adult, old (Didn't do)

let scaler = 0.07;

class Creature {
  constructor(x, y, creature, sound) {
    this.x = x;
    this.y = y;
    this.counter = 0;
    this.egg = creatureTypes[10][0];
    this.creature = creature;
    this.sound = sound;
    this.death = creatureTypes[11][0];
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
    imageMode(CENTER);
    fill(`black`);
    // creature life cycle
    textSize(windowWidth / 5);

    // creature click counter
    if (this.status === this.egg) {
      image(creatureTypes[10][1], this.x, this.y, 0.2 * width, 0.2 * creatureTypes[10][1].height * width / creatureTypes[10][1].width);
      textSize(windowWidth / 10);
      text(this.counter, this.x, this.y);
    }

    if (this.status === this.creature) {
      image(creatureTypes[randomNumber][1], this.x, this.y, 0.3 * width, 0.3 * creatureTypes[randomNumber][1].height * width / creatureTypes[randomNumber][1].width);
      textSize(windowWidth / 25);
      text(`creature name: ${this.name}`, windowWidth / 2, windowHeight / 1.3);

      // health meter
      fill(`grey`);
      arc(width, height, height * 0.7, height * 0.7, PI, PI + HALF_PI);
      fill(`#ff0054ff`);
      arc(width, height, height * 0.7, height * 0.7, PI, PI + HALF_PI * this.health / MAX_HEALTH);

      fill(`black`);
      arc(width, height, height * 0.5, height * 0.5, PI, PI + HALF_PI);
      image(healthSymbol, width * 0.95, height * 0.9, scaler * width, scaler * healthSymbol.height * width / healthSymbol.width);

      push();
      // hunger meter
      scale(-1, 1); // scale -1, 1 reverses the x axis, keep y the same.
      fill(`grey`);
      arc(0, height, height * 0.7, height * 0.7, PI, PI + HALF_PI);
      fill(`#ffb800ff`);
      arc(0, height, height * 0.7, height * 0.7, PI, PI + HALF_PI * this.hunger / MAX_HUNGER);

      fill(`black`);
      arc(0, height, height * 0.5, height * 0.5, PI, PI + HALF_PI);
      pop();
      image(hungerSymbol, width * 0.05, height * 0.9, scaler * width, scaler * hungerSymbol.height * width / hungerSymbol.width);
    }

    if (this.status === this.death) {
      image(creatureTypes[11][1], this.x, this.y);
    }
  }

  life() {
    if (this.status === this.egg || this.status === this.creature) {
      soundEffects();
    }
    if (this.status === this.egg) { // code for the egg state of your creatures life
      this.counter++;
      if (this.counter >= 5) {
        console.log(`lifeSound`);

        creatureTypes[randomNumber][2].play();

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

let textFlag = false;
let keyboardState = `null`;

let lastSwitchedTime = 0;

const MAX_HUNGER = 100; // Max amount of the Hunger meter
const MAX_HEALTH = 100; // Max amount of the Health meter

const SECOND_DURATION = 1000; // Multiply by an desired amount of seconds to get it

let hitSound, rockSound, chickenSound, alienSound, dogSound, catSound, horseSound, penguinSound, dinoSound, humanSound, sheepSound, deathSound;
let healthSymbol, hungerSymbol;

let creatureTypes = [
  [`rock`],
  [`human`],
  [`dog`],
  [`cat`],
  [`horse`],
  [`chicken`],
  [`sheep`],
  [`penguin`],
  [`dinosaur`],
  [`alien`],
  [`egg`],
  [`grave`]
];
let randomNumber;

function preload() {
  hitSound = loadSound(`assets/sounds/hitSound.mp3`);
  hitSound.amp(0.5);

  creatureTypes[10].push(loadImage(`assets/graphics/eggGraphic.png`));
  creatureTypes[11].push(loadImage(`assets/graphics/graveGraphic.png`));

  creatureTypes[0].push(loadImage(`assets/graphics/rockGraphic.png`)); // rockGraphic
  creatureTypes[0].push(loadSound(`assets/sounds/rockSound.mp3`)); // rockSound
  creatureTypes[0][2].amp(1.5);

  creatureTypes[1].push(loadImage(`assets/graphics/humanGraphic.png`)); // humanGraphic
  creatureTypes[1].push(loadSound(`assets/sounds/humanSound.mp3`)); // humanSound
  creatureTypes[1][2].amp(1.5);

  creatureTypes[2].push(loadImage(`assets/graphics/dogGraphic.png`)); // dogGraphic
  creatureTypes[2].push(loadSound(`assets/sounds/dogSound.mp3`)); // dogSound
  creatureTypes[2][2].amp(1.5);

  creatureTypes[3].push(loadImage(`assets/graphics/catGraphic.png`)); // catGraphic
  creatureTypes[3].push(loadSound(`assets/sounds/catSound.mp3`)); // catSound
  creatureTypes[3][2].amp(1.5);

  creatureTypes[4].push(loadImage(`assets/graphics/horseGraphic.png`)); // horseGraphic
  creatureTypes[4].push(loadSound(`assets/sounds/horseSound.mp3`)); // horseSound
  creatureTypes[4][2].amp(1.5);

  creatureTypes[5].push(loadImage(`assets/graphics/chickenGraphic.png`)); // chickenGraphic
  creatureTypes[5].push(loadSound(`assets/sounds/chickenSound.mp3`)); // chickenSound
  creatureTypes[5][2].amp(1.5);

  creatureTypes[6].push(loadImage(`assets/graphics/sheepGraphic.png`)); // sheepGraphic
  creatureTypes[6].push(loadSound(`assets/sounds/sheepSound.mp3`)); // sheepSound
  creatureTypes[6][2].amp(1.5);

  creatureTypes[7].push(loadImage(`assets/graphics/penguinGraphic.png`)); // penguinGraphic
  creatureTypes[7].push(loadSound(`assets/sounds/penguinSound.mp3`)); // penguinSound
  creatureTypes[7][2].amp(1);

  creatureTypes[8].push(loadImage(`assets/graphics/dinoGraphic.png`)); // dinoGraphic
  creatureTypes[8].push(loadSound(`assets/sounds/dinoSound.mp3`)); // dinoSound
  creatureTypes[8][2].amp(1.5);

  creatureTypes[9].push(loadImage(`assets/graphics/alienGraphic.png`)); // alienGraphic
  creatureTypes[9].push(loadSound(`assets/sounds/alienSound.mp3`)); // alienSound
  creatureTypes[9][2].amp(1.5);

  deathSound = loadSound(`assets/sounds/deathSound.mp3`);
  deathSound.amp(1);

  healthSymbol = loadImage(`assets/graphics/healthSymbol.png`);
  hungerSymbol = loadImage(`assets/graphics/hungerSymbol.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER, CENTER);
  // creating classes
  randomNumber = round(random(0, 9));
  newCreature = new Creature(width / 2, height / 2, creatureTypes[randomNumber][1]);
  theTextSystem = new TextSystem;
  theMenus = new Menus;

  theMenus.state = `title`;
}

function soundEffects() {
  if (newCreature.status === newCreature.egg || newCreature.status === newCreature.creature) {
    console.log(`hitSound`);
    hitSound.play();
  }

  if (newCreature.status === newCreature.death) {
    console.log(`deathSound`);
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
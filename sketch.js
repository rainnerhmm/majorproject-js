// majorproject
// Rainn Morphy
// Nov 18th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// links 
// https://p5js.org/examples/
// https://editor.p5js.org/codingtrain/collections
// https://editor.p5js.org/codingtrain/sketches/hZWcc0Vi-
// https://editor.p5js.org/codingtrain/sketches/YzFpEGdsl
// https://editor.p5js.org/michellu0929/sketches/KL0ydodUa

let hourOf;
let minuteOf;
let secondOf;

let newCreature = ``;
let stateFlag = `type`;


// Creature Class is responsible for the location of creature, its lifestate, displaying it, the info
// Health, hunger, and whatever other meters

// the class will be split into sub classes that represent its lifestate, egg, young, adult, old
class Creature {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = color(random(255), random(255), random(255));
    this.health = 100;
    this.hunger = 100;
    this.counter = 0;
    this.creatureegg = `🥚`;
    this.creature = `🇨🇭`;
    this.status = this.creatureegg;
    this.name = ``;
  }

  update(x, y) {
    this.display();
  }

  display() {
    noStroke();

    // creatureegg
    textAlign(CENTER, CENTER);
    textSize(windowWidth / 5);
    text(this.status, this.x, this.y);
    textSize(windowWidth / 10);
    text(this.counter, this.x, this.y);

    // if (this.status === this.creature) {
    //   textSize(windowWidth / 25);
    //   text(`creature name: ${this.name}`, windowWidth / 2, windowHeight / 1.3);
    // }
  }

  egg() {
    if (this.status === this.creatureegg) {
      this.counter++;
    }

    if (this.counter >= 1) {
      this.status = this.creature;
      this.counter = ``;
    }
  }

  // info(theInfo) {
  //   if (this.status === this.creature) {
  //     this.name += input;
  //   }
  // }
  // birthInfo(intextput) {

  // }
};

let creatureName = ``;
let keyboardState = 'null';

const TEXT_DURATION = 500;

let lastSwitchedTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newCreature = new Creature(width / 2, height / 2, width / 50);
}

function draw() {
  background(220);
  newCreature.update();
  time();
  text(Math.round(frameRate()), windowWidth / 2, windowHeight / 9);
  text(`creature name: ${creatureName}`, windowWidth / 2, windowHeight / 1.3);
  text(keyboardState, windowWidth / 2, windowHeight / 1.1);
  if (stateFlag === `type`) {
    textSystem();
  }
}

function time() {
  hourOf = hour();
  minuteOf = minute();
  secondOf = second();
  textSize(windowWidth / 25);
  text(`Time: ${hourOf}:${minuteOf}:${secondOf} p.m.`, windowWidth / 2, windowHeight / 5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  newCreature.egg();
}


function inputInfo(input) {
  let inputState = `creatureName`; // what will be input, acts as a throughline to input information
  if (inputState === `creatureName` && keyboardState === `type`) {
    creatureName += input;
  }
  if (keyboardState === `delete`) {
    creatureName = input;
  }
}  // possibly consider switch cases instead of if statments later on



function textSystem() {
  if (keyboardState === 'type') {
    creatureName += key;
  }
  if (keyboardState === 'delete' && creatureName.length >= 1) {
    creatureName = creatureName.slice(0, creatureName.length - 1);
  }
}

function keyPressed() {
  lastSwitchedTime = millis();
  if (keyCode === 8) {
    keyboardState = `delete`;
  }
  else if (keyCode >= 65 && keyCode <= 90) {
    keyboardState = `type`;
  }
}

function keyReleased() {
  if (millis() > lastSwitchedTime + TEXT_DURATION) {
    if (keyCode === 8) {
      keyboardState = `null`;
    }
    if (keyCode >= 65 && keyCode <= 90) {
      keyboardState = `null`;
    }
  }
}

// use keycodes to determine if key is allowed

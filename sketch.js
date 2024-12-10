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

let newCreature = ``;
let flag = false;
let keyboardState = 'null';

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
    this.creature = `🐔`;
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

    // birth info
    textSize(windowWidth / 30);
    text(`creature name: ${this.name}`, windowWidth / 2, windowHeight / 1.3);

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
      flag = true;
    }
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  newCreature = new Creature(width / 2, height / 2, width / 50);
}

function draw() {
  background(220);
  newCreature.update();


  // displays notable info (debug only)
  dispFrameRate();
  time();
  text(keyboardState, windowWidth / 2, windowHeight / 1.1);
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
  textSize(windowWidth / 25);
  text(`Time: ${hourOf}:${minuteOf}:${secondOf} p.m.`, windowWidth / 2, windowHeight / 5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  newCreature.egg();
}

function textSystem(input) {
  if (keyboardState === `type`) {
    newCreature.name += input;
  }
  if (keyboardState === `delete` && newCreature.name.length >= 1) {
    newCreature.name = input;
  }
  if (keyboardState === `enter` && newCreature.name.length >= 1) {
    newCreature.name = input;
  }
}  // possibly consider switch cases instead of if statments later on


function keyPressed() {
  // use keycodes to determine if key is allowed
  if (flag) {
    if (keyCode >= 65 && keyCode <= 90 || keyCode === 32) {
      keyboardState = `type`;
      fill(`black`);
      textSystem(key);
    }

    // use keycodes to determine if key is allowed
    if (keyCode === 8) {
      keyboardState = `delete`;
      textSystem(newCreature.name.slice(0, newCreature.name.length - 1));
    }
  }
}
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

let newCreature;
let theTextSystem;
let theMenus;

let textFlag = false;
let keyboardState = `null`;

let lastSwitchedTime = 0;

const MAX_HUNGER = 100;

const SECOND_DURATION = 1000; // Multiply by an desired amount of seconds to get it

// Creature Class is responsible for the location of creature, its lifestate, displaying it, the info
// Health, hunger, and whatever other meters

// the class will be split into sub classes that represent its lifestate, egg, young, adult, old

class Creature {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.health = 100;
    this.hunger = 100;
    this.counter = 0;
    this.egg = `🥚`;
    this.creature = `🐔`;
    this.status = this.egg;
    this.name = ``;
    this.hunger = MAX_HUNGER;
  }

  update(x, y) {
    this.display();
    this.food();
  }

  display() {
    // creature life cycle
    textSize(windowWidth / 5);
    text(this.status, this.x, this.y);

    // creature click counter
    textSize(windowWidth / 10);
    text(this.counter, this.x, this.y);

    if (this.status === this.creature) {
      textSize(windowWidth / 25);
      text(`creature name: ${this.name}`, windowWidth / 2, windowHeight / 1.3);

      // hunger meter
      push();
      fill('black');
      rect(50, 50, 50, height / 4 * (MAX_HUNGER / 100));
      pop();

      push();
      fill('yellow');
      rect(50, 50, 50, height / 4 * (this.hunger / 100));
      pop();

      push();
      textSize(10);
      text(this.hunger, 75, 85);
      pop();

    }
  }

  life() {
    if (this.status === this.egg) {
      this.counter++;
    }

    if (this.counter >= 5) {
      this.status = this.creature;
      this.counter = ``;
      theTextSystem.update();
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

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER, CENTER);

  // creating classes
  newCreature = new Creature(width / 2, height / 2, width / 50);
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

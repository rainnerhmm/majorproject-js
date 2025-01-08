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
let returnFlag = false;
let keyboardState = `null`;

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
    this.time = 0;
  }

  update(x, y) {
    this.display();
  }

  display() {
    noStroke();

    // creatureegg
    textSize(windowWidth / 5);
    text(this.status, this.x, this.y);
    textSize(windowWidth / 10);
    text(this.counter, this.x, this.y);

    if (this.status === this.creature) {
      textSize(windowWidth / 25);
      text(`creature name: ${this.name}`, windowWidth / 2, windowHeight / 1.3);
    }
  }

  egg() {
    if (this.status === this.creatureegg) {
      this.counter++;
    }

    if (this.counter >= 5) {
      this.status = this.creature;
      this.counter = ``;
      theTextSystem.update();
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
      returnFlag = true;
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
    if (this.state === `paused`) {
      this.head = `paused`;
      this.subhead = 'paused';
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  newCreature = new Creature(width / 2, height / 2, width / 50);
  theTextSystem = new TextSystem;
  theMenus = new Menus;
  textAlign(CENTER, CENTER);
  theMenus.state = `title`;
}

function draw() {
  background(220);
  if (theMenus.state === `title`) {
    theMenus.update();
  }

  else if (theMenus.state === `play`) {
    newCreature.update();


    // displays notable info (debug only)
    dispFrameRate();
    time();
    text(keyboardState, windowWidth / 2, windowHeight / 1.1);
    theTextSystem.disp();
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
  theMenus.input();
  newCreature.egg();
}

function keyPressed() {
  // use keycodes to determine if key is allowed
  if (keyCode === 27) {
    if (theMenus.state === `paused`) {
      theMenus.state = `play`;
    }
    else {
      theMenus.update();
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

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

let hourOf;
let minuteOf;
let secondOf;

let newCreature;

class Creature {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = color(random(255), random(255), random(255));
    this.health = 100;
    this.hunger = 100;
    this.counter = 0;
    this.creatureegg = '🥚';
    this.creature = '🇨🇭';
    this.status = this.creatureegg;
    this.name = '';
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

    if (this.status === this.creature) {
      textSize(windowWidth / 25);
      text(`creature name: ${this.name}`, windowWidth / 2, windowHeight / 1.3);
    }
  }

  egg() {
    if (this.status === this.creatureegg) {
      this.counter++;
    }

    if (this.counter >= 1) {
      this.status = this.creature;
      this.counter = '';
    }
  }

  inputs(input) {
    if (this.status === this.creature) {
      this.name += input;
    }
  }
  // birthInfo(intextput) {

  // }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  newCreature = new Creature(width / 2, height / 2, width / 50);
}

function draw() {
  background(220);
  newCreature.update();
  time();

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

function repaint() {
  background(200);
  let msg = input.value();
  text(msg, 5, 50);
}

function keyPressed() {
  // use keycodes tp detirmine if key is allowed
  if (keyCode >= 65 && keyCode <= 90) {
    newCreature.inputs(key);
  }
  else if (keyCode === 8) {
    newCreature.inputs('');
  }

}

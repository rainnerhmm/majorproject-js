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
    this.status = '🥚';
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
    textSize(windowWidth / 7);
    text(this.counter, this.x, this.y);
  }

  egg() {
    if (this.status === '🥚') {
      this.counter++;
    }

    if (this.counter >= 100) {
      this.status = '🦃';
      this.counter = 0;
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
  time();

}

function time() {
  hourOf = hour();
  minuteOf = minute();
  secondOf = second();
  textSize(windowWidth / 25);
  text(`Time: ${hourOf}:${minuteOf}:${secondOf} p.m.`, windowWidth / 2, 400);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  newCreature.egg();
}

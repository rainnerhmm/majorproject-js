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

let newCreature;

class Creature {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.radius = r;
    this.color = color(random(255), random(255), random(255));
    this.health = 100;
    this.hunger = 100;
    this.mouseJoint = false;
    this.fallState = false;
  }

  update(x, y) {
    this.display();
    this.move();
    this.wrap();

  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
    if (!this.mouseJoint && mouseIsPressed) {

      let posA = [this.x, this.y];
      let posB = [mouseX, mouseY];
      console.log(posA);

      // We can get the two anchor points
      let v1 = [posA[0], posA[1]];
      let v2 = [posB[0], posB[1]];
      // And just draw a line
      stroke(this.color);
      strokeWeight(2);

      line(v1[0], v1[1], v2[0], v2[1]);
    }
  }

  move() {
    // causes the creature to fall
    if (this.y < height) {
      this.fallState = true;
      if (this.fallState) {
        this.speed++;
        this.y = this.y + this.speed;
      }
    }
    else if (this.y >= height) {
      this.fallState = false;
      if (!this.fallState) {
        this.y = height - this.radius
      }
    }


    if (mouseIsPressed) { // for debugging, teleports creature to mouse coords
      this.speed = 1;
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  wrap() {
    // teleports across the screen if you fall off
    if (this.x - this.radius > width) { // right
      this.x -= width;
    }

    if (this.x + this.radius < 0) { // left
      this.x += width;
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

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// majorproject
// Rainn Morphy
// Nov 18th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// links 
// https://p5js.org/examples/
// https://editor.p5js.org/codingtrain/sketches/hZWcc0Vi-

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
  }

  dispCreature() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  moveCreature() {
    // causes the creature to fall
    if (this.y - this.speed < this.y) {
      this.speed++;
      this.y = this.y + this.speed;
    }

    if (mouseIsPressed) { // for debugging, teleports creature to mouse coords
      this.speed = 1;
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  wrapCreature() {
    // teleports across the screen if you fall off
    if (this.x - this.radius > width) { // right
      this.x -= width;
    }

    if (this.x + this.radius < 0) { // left
      this.x += width;
    }

    if (this.y - this.radius > height) { // bottom
      this.y -= height;
    }

    if (this.y + this.radius < 0) { // top
      this.y += height;
    }
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  newCreature = new Creature(width / 2, height / 2, width / 50);
}

function draw() {
  background(220);
  newCreature.dispCreature();
  newCreature.moveCreature();
  newCreature.wrapCreature();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

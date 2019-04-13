let stars = [];
let speed;

function setup() {
  createCanvas(windowWidth*1.5, windowHeight);
  
  function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    
    this.display = function() {
      noStroke();
      fill(255);
      let sx = map(this.x / this.z, 0, 1, 0, width);
      let sy = map(this.y / this.z, 0, 1, 0, height);
      let r = map(this.z, 0, width, 12, 0);
      ellipse(sx, sy, r, r);
    } // display
    
    this.update = function() {
      this.z -= speed;
      
      if(this.z < 1) {
        this.z = width;
        this.x = random(-width, width);
        this.y = random(-height, height);
      }
    } // update
  } // Star
  
  for(let i = 0; i < 500; i += 1) {
    stars[i] = new Star();
  }
} // setup

function draw() {
  background(0);
  translate(width/2, height/2);
  speed = map(mouseX, 0, width, 2, 20);
  for(let i = 0; i < stars.length; i += 1) {
    stars[i].display();
    stars[i].update();
  }
} // draw
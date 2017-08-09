var i = 0;

var mousemovex = []; // Initialize arrays for the mouse delay buffer
var mousemovey = [];

var canvasx = 1300;
var canvasy = 800;

function setup() {
  var c = createCanvas(canvasx, canvasy);
  c.position(100, 50);
  frameRate(15);
  textSize(15);
  noStroke();
  whiteBall = new target();
  redBall = new actuator();

  // Create the sliders
  bandSlider = createSlider(1, 100, 1);
  bandSlider.position(100, 900);

  sampSlider = createSlider(1, 50, 1);
  sampSlider.position(300, 900);

  delaySlider = createSlider(1, 30, 1);
  delaySlider.position(500, 900);

  words = createDiv('Target Bandwidth');
  words.position(100, 880);

  words = createDiv('Target Sample Time');
  words.position(300, 880);

  words = createDiv('Mouse Delay');
  words.position(500, 880);
}

function draw() {
  background(51);
  // Grab current values from the sliders
  var bandwidth = bandSlider.value();
  var sampleperiod = sampSlider.value();
  var delaylength = delaySlider.value();

  // Update mouse buffer with current delay length
  mousepos = redBall.update(delaylength);

  // If it is time for a new sample
  //  Update the location of the target
  //  Set the drawing output to the new sample location
  //  Redraw the white ball
  // Else if it isn't time for a new sampleperiod
  //  Update the the location of the target
  //  Redraw the white ball using the previous sample location
  i++
  if (i >= sampleperiod) {
    i = 0;
    whiteBall.update(mousepos, bandwidth);
    whiteBall.run();
    whiteBall.show();
  } else if (i < sampleperiod) {
    whiteBall.update(mousepos, bandwidth);
    whiteBall.show();
  }
  // Draw the red ball
  redBall.show();
}

function actuator() {
  this.diameter = 10; // Diameter of the red ball

  this.update = function(delaylength) {
    // Grab current mouse location
    this.x = mouseX;
    this.y = mouseY;

    // Append mouse location to end of mouse array
    mousemovex.push(this.x);
    mousemovey.push(this.y);

    // Make sure mouse array doesn't continue to grow
    // Remove array elements that are no longer needed
    if (mousemovex.length > delaylength) {
      mousemovex.splice(0, mousemovex.length - delaylength);
    }
    if (mousemovey.length > delaylength) {
      mousemovey.splice(0, mousemovey.length - delaylength);
    }
    return [mousemovex[0], mousemovey[0]];
  }

  // Draw a red circle
  this.show = function() {
    fill(255, 0, 100);
    ellipse(mousemovex[0], mousemovey[0], this.diameter, this.diameter);
  }
}

function target() {
  // Initialize target at center of canvas
  this.x = canvasx / 2;
  this.y = canvasy / 2;

  this.diameter = 40; // Diameter of white target ball
  this.scorediam = 1500; // Starting diameter of grey scoring circle
  this.shrink = 5; // Speed at which the scoring circle shrinks

  // The target moves at a linear speed at an ever changing angle
  // This sets the initial angle, speed, and delta angle
  this.angle = 0;
  this.deltaangle = 0;
  this.linearspeed = 0;

  this.minscore = 1500; // Initial minimum score

  this.update = function(mousepos, bandwidth) {
    // The way the target moves is governed by the bandwidth
    this.maxspeed = bandwidth / 2;
    this.maxangularvel = bandwidth / 150;
    this.angularaccel = bandwidth / 250;
    this.linearaccel = bandwidth / 10;

    // Change the speeds by a random amount that is bounded by max acceleration
    this.deltaangle = this.deltaangle + random(-this.angularaccel, this.angularaccel);
    this.linearspeed = this.linearspeed + random(-this.linearaccel, this.linearaccel);

    // Constrain the speeds by the max values
    this.deltaangle = constrain(this.deltaangle, -this.maxangularvel, this.maxangularvel);
    this.linearspeed = constrain(this.linearspeed, 0, this.maxspeed);

    // Update the current angle of the target motion
    this.angle = this.angle + this.deltaangle;

    // Determine the delta for x and y position
    this.xspeed = this.linearspeed * cos(this.angle);
    this.yspeed = this.linearspeed * sin(this.angle);

    // Update the current x and y position
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;

    // Figure out how far the target is from the actuator
    this.mx = (mousepos[0] - this.x) * (mousepos[0] - this.x);
    this.my = (mousepos[1] - this.y) * (mousepos[1] - this.y);
    this.distance = this.mx + this.my;

    // Set the diameter of the scoring circle
    this.errordiam = Math.sqrt(this.distance) * 2;

    // Determine if the mouse is within the canvas
    if (mousepos[0] < width && mousepos[0] > 0) {this.mousein = 1;}
    else{this.mousein = 0;}

    if (mousepos[1] < height && mousepos[1] > 0) {this.mousein = this.mousein;}
    else{this.mousein = 0;}

    // If mouse is on canvas and out of scoring circle, increase scoring circle
    // Otherwise, skrink scoring circle
    if (this.errordiam > this.scorediam && this.mousein) {
      this.scorediam = this.errordiam;
    } else {
      this.scorediam = this.scorediam - this.shrink;
      this.scorediam = constrain(this.scorediam, 1, 3000);
    }

    // If mouse is off canvas then reset scoring circle
    if (this.mousein == 0) {this.scorediam = 1500;}

    // If the target hits the canvas wall, cause it to bounce off
    if (this.x > canvasx - this.diameter/2) {
      this.xspeed = -Math.abs(this.xspeed);
      this.angle = atan2(this.yspeed, this.xspeed);
      this.x = canvasx - this.diameter/2;
    }
    if (this.x < this.diameter/2) {
      this.xspeed = Math.abs(this.xspeed);
      this.angle = atan2(this.yspeed, this.xspeed);
      this.x = this.diameter/2;
    }
    if (this.y > canvasy - this.diameter/2) {
      this.yspeed = -Math.abs(this.yspeed);
      this.angle = atan2(this.yspeed, this.xspeed);
      this.y = canvasy - this.diameter/2;
    }
    if (this.y < this.diameter/2) {
      this.yspeed = Math.abs(this.yspeed);
      this.angle = atan2(this.yspeed, this.xspeed);
      this.y = this.diameter/2;
    }
  }

  this.run = function() {
    // Update the drawing position with the current position
    this.runx = this.x;
    this.runy = this.y;
  }

  this.show = function() {
    // Draw the scoring circle
    fill(100);
    ellipse(this.runx, this.runy, this.scorediam, this.scorediam);

    // Draw the target circle
    fill(255);
    ellipse(this.runx, this.runy, this.diameter, this.diameter);

    // Display the score
    textSize(20);
    text("Current score: " + floor(this.scorediam), 10, 40);
    this.minscore = Math.min(this.minscore, this.scorediam);
    text("Minimum score: " + floor(this.minscore), 10, 70);
  }
}

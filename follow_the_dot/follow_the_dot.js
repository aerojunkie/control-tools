var i = 0;
var mousemovex = [];
var mousemovey = [];

var canvasx = 1300;
var canvasy = 800;

function setup() {
   var c = createCanvas(canvasx, canvasy);
   frameRate(15);
  textSize(15);
  noStroke();
   c.position(100, 50);
   whiteball = new Ball();
   redball = new grabmouse();
   bandSlider = createSlider(1, 100, 1);
   bandSlider.position(100, 900);

   sampSlider = createSlider(1, 50, 1);
   sampSlider.position(300, 900);

   delaySlider = createSlider(1, 30, 1);
   delaySlider.position(500, 900);
}

function draw() {
   background(51);
   var bandwidth = bandSlider.value();
   var sampleperiod = sampSlider.value();
   var delaylength = delaySlider.value();

   mousepos = redball.update(delaylength);

   i++
   if (i >= sampleperiod) {
      i = 0;
      whiteball.update(mousepos, bandwidth);
      whiteball.run();
      whiteball.show();
   } else if (i < sampleperiod) {
      whiteball.update(mousepos, bandwidth);
      whiteball.show();
   }
     redball.show();

   words = createDiv('Target Bandwidth');
   words.position(100, 880);

   words = createDiv('Target Sample Time');
   words.position(300, 880);

   words = createDiv('Mouse Delay');
   words.position(500, 880);

}

function grabmouse() {
   this.diameter = 10;

   this.update = function(delaylength) {
      this.x = mouseX;
      this.y = mouseY;
      mousemovex.push(this.x);
      mousemovey.push(this.y);

      if (mousemovex.length > delaylength) {
         mousemovex.splice(0, mousemovex.length - delaylength);
      }
      
      if (mousemovey.length > delaylength) {
         mousemovey.splice(0, mousemovey.length - delaylength);
      }
      return [mousemovex[0], mousemovey[0]];

   }

   this.show = function() {
      fill(255, 0, 100);
      ellipse(mousemovex[0], mousemovey[0], this.diameter, this.diameter);
   }
}

function Ball() {
   this.x = canvasx / 2;
   this.y = canvasy / 2;
   this.diameter = 40;
   this.scorediam = 200;
   this.shrink = 5;
   this.angle = 0;
   this.speed = 0;
   this.angvel = 0;
   this.linvel = 0;
   this.minscore = 1500;

   this.update = function(mousepos, bandwidth) {
      this.maxspeed = bandwidth / 2;
      this.maxangvel = bandwidth / 150;
      this.angaccel = bandwidth / 250;
      this.linaccel = bandwidth / 10;

      this.angvel = this.angvel + random(-this.angaccel, this.angaccel);
      this.linvel = this.linvel + random(-this.linaccel, this.linaccel);

      this.angvel = constrain(this.angvel, -this.maxangvel, this.maxangvel);
      this.linvel = constrain(this.linvel, 0, this.maxspeed);

      this.angle = this.angle + this.angvel;

      this.xspeed = this.linvel * cos(this.angle);
      this.yspeed = this.linvel * sin(this.angle);

      this.x = this.x + this.xspeed;
      this.y = this.y + this.yspeed;

      this.mx = (mousepos[0] - this.x) * (mousepos[0] - this.x);
      this.my = (mousepos[1] - this.y) * (mousepos[1] - this.y);
      this.total = this.mx + this.my;

      this.errordiam = Math.sqrt(this.total) * 2;

      if (mousepos[0] < width && mousepos[0] > 0) {this.mousein = 1;}
      else{this.mousein = 0;}

      if (mousepos[1] < height && mousepos[1] > 0) {this.mousein = this.mousein;}
      else{this.mousein = 0;}


      if (this.errordiam > this.scorediam && this.mousein) {
         this.scorediam = this.errordiam;
      } else {
         this.scorediam = this.scorediam - this.shrink;
         this.scorediam = constrain(this.scorediam, 1, 3000);

      }

      if (this.mousein == 0) {this.scorediam = 1500;}

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
      this.runx = this.x;
      this.runy = this.y;
   }

   this.hold = function() {
      this.runx = this.runx;
      this.runy = this.runy;
   }

   this.show = function() {
      fill(100);
      ellipse(this.runx, this.runy, this.scorediam, this.scorediam);
      fill(255);
      ellipse(this.runx, this.runy, this.diameter, this.diameter);
      textSize(20);
      text("Current score: " + floor(this.scorediam), 10, 40);
      this.minscore = Math.min(this.minscore, this.scorediam);
      text("Minimum score: " + floor(this.minscore), 10, 70);

   }
}
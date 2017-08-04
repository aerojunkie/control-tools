
var sampleperiod = 1;
var bandwidth = 1; 
var delaylength = 1;

var i = 0;
var mousemovex = [];
var mousemovey = [];

var canvasx = 1300;
var canvasy = 800;

function setup() {
   createCanvas(canvasx, canvasy);
   whiteball = new Ball();
   redball = new grabmouse();
}

function draw() {
   background(51);

   mousepos = redball.update();

   i++
   if (i >= sampleperiod) {
      i = 0;
      whiteball.update(mousepos);
      whiteball.run();
      whiteball.show();
   } else if (i < sampleperiod) {
      whiteball.update(mousepos);
      whiteball.show();
   }
   
   redball.show();

}

function grabmouse() {
   this.diameter = 10;

   this.update = function() {
      this.x = mouseX;
      this.y = mouseY;
      mousemovex.push(this.x);
      mousemovey.push(this.y);

      if (mousemovex.length > delaylength) {
         mousemovex.splice(0, 1);
      }
      
      if (mousemovey.length > delaylength) {
         mousemovey.splice(0, 1);
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
   this.shrink = 3;
   this.angle = 0;
   this.speed = 0;
   this.maxspeed = bandwidth / 2;
   this.maxangvel = bandwidth / 150;
   this.angvel = 0;
   this.linvel = 0;
   this.angaccel = bandwidth / 250;
   this.linaccel = bandwidth / 10;

   this.update = function(mousepos) {
      console.log(mousepos);
      this.angvel = this.angvel + random(-this.angaccel, this.angaccel);
      this.linvel = this.linvel + random(-this.linaccel, this.linaccel);

      this.angvel = constrain(this.angvel, -this.maxangvel, this.maxangvel);
      this.linvel = constrain(this.linvel, 0, this.maxspeed);

      this.angle = this.angle + this.angvel;

      this.xspeed = this.linvel * cos(this.angle);
      this.yspeed = this.linvel * sin(this.angle);

      this.x = this.x + this.xspeed;
      this.y = this.y + this.yspeed;

      this.mx = Math.pow((mousepos[0] - this.x), 2);
      this.my = Math.pow((mousepos[1] - this.y), 2);
      this.total = this.mx + this.my;

      this.errordiam = Math.sqrt(this.total) * 2;

      if (this.errordiam > this.scorediam) {
         this.scorediam = this.errordiam;
      } else {
         this.scorediam = this.scorediam - this.shrink;
      }

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
   }
}
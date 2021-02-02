var i = 0;

var mousemovex = []; // Initialize arrays for the mouse delay buffer
var mousemovey = [];

var canvasx = 1300;
var canvasy = 800;

var sx0 = 550;
var sy0 = 450;
var zx0 = 950;
var zy0 = 450;
var axiswidth = 250;

var sscale = 25;
var zscale = 170;

var grid = 1;

function setup() {
  var c = createCanvas(canvasx, canvasy);
  c.position(100, 50);
  frameRate(15);
  textSize(3);
  noStroke();

  words = createDiv('-2');
  words.position(sx0 - 1 * sscale + 65, sy0 + 65);

  words = createDiv('-4');
  words.position(sx0 - 3 * sscale + 65, sy0 + 65);

  words = createDiv('-6');
  words.position(sx0 - 5 * sscale + 65, sy0 + 65);

  words = createDiv('-8');
  words.position(sx0 - 7 * sscale + 65, sy0 + 65);

  words = createDiv('-10');
  words.position(sx0 - 9 * sscale + 65, sy0 + 65);

  words = createDiv('-12');
  words.position(sx0 - 11 * sscale + 65, sy0 + 65);

  words = createDiv('-14');
  words.position(sx0 - 13 * sscale + 65, sy0 + 65);

  words = createDiv('-16');
  words.position(sx0 - 15 * sscale + 65, sy0 + 65);


  words = createDiv('-2');
  words.position(sx0 + 70, sy0 + 1 * sscale + 65);
  words = createDiv('-4');
  words.position(sx0 + 70, sy0 + 3*sscale + 65);
  words = createDiv('-6');
  words.position(sx0 + 70, sy0 + 5*sscale + 65);
  words = createDiv('-8');
  words.position(sx0 + 70, sy0 + 7*sscale + 65);
  words = createDiv('2');
  words.position(sx0 + 75, sy0 - 1 * sscale + 15);
  words = createDiv('4');
  words.position(sx0 + 75, sy0 - 3*sscale + 15);
  words = createDiv('6');
  words.position(sx0 + 75, sy0 - 5*sscale + 15);
  words = createDiv('8');
  words.position(sx0 + 75, sy0 - 7*sscale + 15);

  words = createDiv('0');
  words.position(zx0 + 110, zy0 + 55);
  words = createDiv('1');
  words.position(zx0 + 110 + zscale, zy0 + 55);
  words = createDiv('-1');
  words.position(zx0 + 110 - zscale, zy0 + 55);
  words = createDiv('-1');
  words.position(zx0 + 110, zy0 + 55 + zscale);
  words = createDiv('1');
  words.position(zx0 + 110, zy0 + 55 - zscale);

  whiteBall = new z_target();
  redBall = new s_target();
}

function draw() {
  background(51);
  // Draw the s-plane and z-plane
  fill(225);
  textSize(25);
  text('S-PLANE', sx0 - 260, sy0 - axiswidth - 20);
  text('Z-PLANE', zx0 - 60, sy0 - axiswidth - 20);
  textSize(25);
  text('With T = 2 seconds', 540, 750);
  textSize(40);
  text('Mapping to z-plane', 490, 50);


  nudge = 130;
  drop = 20;
  text('z = e', 480 + nudge, 115 + drop);
  textSize(23);
  text('sT', 570 + nudge, 95 + drop);

  rect(sx0 - axiswidth - 200, sy0 - axiswidth, axiswidth * 2, axiswidth * 2);
  rect(zx0 - axiswidth, zy0 - axiswidth, axiswidth * 2, axiswidth * 2);

  fill(200);
  rect(sx0 - axiswidth - 200, sy0 - axiswidth, axiswidth + 200, axiswidth * 2);

  if (grid == 1){
  stroke(175);
  for (i = -9; i < 10; i++) {
    line(sx0 - axiswidth - 199, sy0 + i*sscale, sx0 + axiswidth - 201, sy0 + i*sscale);
  };

  for (i = -17; i < 1; i++) {
    line(sx0 + i*sscale, sy0 - axiswidth + 1, sx0 + i*sscale, sy0 + axiswidth - 1);
  };
}
  stroke(0);


  line(sx0, sy0 - axiswidth, sx0, sy0 + axiswidth);
  line(sx0 - axiswidth - 200, sy0, sx0 + axiswidth - 200, sy0);
  for (i = -9; i < 10; i++) {
    line(sx0 - 10, sy0 + i*sscale, sx0 + 10, sy0 + i*sscale);
  };

  for (i = -17; i < 1; i++) {
    line(sx0 + i*sscale, sy0 - 10, sx0 + i*sscale, sy0 + 10);
  };

  fill(200);
  ellipse(zx0, zy0, 2*zscale, 2*zscale);

  if (grid) {
    stroke(175);
  dt = 0.1;
  for (i = -8; i < 0; i=i+dt) {
    for (j = -3.2/2; j < 3.1/2; j=j+dt) {
      z_spot = getMapExp([i, j]);
      z_spot_old_i = getMapExp([i, j-dt]);
      line(z_spot_old_i[0]*zscale + zx0, z_spot_old_i[1]*zscale + zy0, z_spot[0]*zscale + zx0, z_spot[1]*zscale + zy0);
      z_spot_old_j = getMapExp([i-dt, j]);
      line(z_spot_old_j[0]*zscale + zx0, z_spot_old_j[1]*zscale + zy0, z_spot[0]*zscale + zx0, z_spot[1]*zscale + zy0);
    }
  }
}
  stroke(0);
  noFill();
  ellipse(zx0, zy0, 2*zscale, 2*zscale);
  fill(200);

  line(zx0, zy0 - axiswidth, zx0, zy0 + axiswidth);
  line(zx0 + axiswidth, zy0, zx0 - axiswidth, zy0)

  // Draw the red ball
  mousepos = redBall.update();
  redBall.show();

  // Draw the white ball
  whiteBall.update(mousepos);
  whiteBall.show();
}

function s_target() {
  this.diameter = 10; // Diameter of the red ball

  this.update = function() {
    this.x = mouseX;
    this.y = mouseY;

  // Force red ball to be within the s-plane
  if (this.x < sx0 + axiswidth - 200 && this.x > sx0 - axiswidth - 200) {
    mousein = 1;
  }
  else{
    mousein = 0;}

  if (this.y < sy0 + axiswidth && this.y > sy0 - axiswidth && mousein == 1) {
    mousein = 1;
  }
  else{
    mousein = 0;
  }

  if (mousein == 1) {
    mousemovex[0] = this.x;
    mousemovey[0] = this.y;
  }
  else{
    mousemovex[0] = sx0;
    mousemovey[0] = sy0;
  }

  return [mousemovex[0], mousemovey[0]];
  }

  // Draw a red circle
  this.show = function() {
    fill(255, 0, 100);
    ellipse(mousemovex[0], mousemovey[0], this.diameter, this.diameter);
    textSize(15);
    posx = (mousemovex[0] - sx0) / sscale;
    posy = -(mousemovey[0] - sy0) / sscale;
    text(posx + ', ' + posy, mousemovex[0] + 5, mousemovey[0] - 5);
  }
}

function z_target() {
  this.diameter = 10; // Diameter of white target ball

  this.update = function(mousepos) {
    this.sr = (mousepos[0] - sx0)/sscale;
    this.si = (mousepos[1] - sy0)/sscale;
    z_spot = getMapExp([this.sr, this.si]);
    this.zr = z_spot[0];
    this.zi = z_spot[1];

  }

  this.show = function() {
    fill(50);
    ellipse(this.zr*zscale + zx0, this.zi*zscale + zy0, this.diameter, this.diameter);
    textSize(15);
    warpTr = this.zr;
    if (Math.abs(warpTr) < 0.01) { warpTr = 0;}
    warpTr = warpTr.toString();
    warpTi = -this.zi;
    if (Math.abs(warpTi) < 0.01) { warpTi = 0;}
    warpTi = warpTi.toString();
    text(warpTr.substring(0, 4) + ', ' + warpTi.substring(0, 5), this.zr*zscale + zx0 + 5, this.zi*zscale + zy0 - 5);
  }
}

function getMap(s_spot) {
  this.sr = s_spot[0];
  this.si = s_spot[1];
  this.zr = (1 - this.sr*this.sr - this.si*this.si) /
  (1 - 2*this.sr + this.sr*this.sr + this.si*this.si);
  this.zi = (2*this.si) /
  (1 - 2*this.sr + this.sr*this.sr + this.si*this.si);
  return [this.zr, this.zi];
}

function getMapExp(s_spot) {
  this.sr = s_spot[0];
  this.si = s_spot[1];
  this.zr = Math.exp(this.sr*2) * Math.cos(this.si*2);
  this.zi = Math.exp(this.sr*2) * Math.sin(this.si*2);
  return [this.zr, this.zi];
}

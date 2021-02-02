var i = 0;

var mousemovex = []; // Initialize arrays for the mouse delay buffer
var mousemovey = [];

var canvasx = 1300;
var canvasy = 800;

var sx0 = 550;
var sy0 = 450;
var zx0 = 650;
var zy0 = 430;
var axiswidth = 350;

var sscale = 25;
var zscale = 300;

var grid = 0;

function setup() {
  var c = createCanvas(canvasx, canvasy);
  c.position(100, 50);
  frameRate(15);
  textSize(3);
  noStroke();

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

  // Create the sliders
  warpSlider = createSlider(0, 100, 0);
  warpSlider.position(150, 600);
}

function draw() {
  background(51);

  var warp = warpSlider.value();
  warp = warp * PI/2/100;
  warpT = warp;
  warpT = warpT.toString();

  // Draw the s-plane and z-plane
  fill(225);
  textSize(40);
  text('The pre-warping effect', 460, 50);
  textSize(20);
  text('Warp at critical frequency', 50, 495);
  text(warpT.substring(0, 4) + ' rad/s', 50, 525);

  nudge = 130;
  drop = 20;

  rect(zx0 - axiswidth, zy0 - axiswidth, axiswidth * 2, axiswidth * 2);
  stroke(0);

  fill(200);
  ellipse(zx0, zy0, 2*zscale, 2*zscale);
  line(zx0, zy0 - axiswidth, zx0, zy0 + axiswidth);
  line(zx0 + axiswidth, zy0, zx0 - axiswidth, zy0);

  if (grid > 0) {
    stroke(175, 100, 0);
  dt = PI/30;
  for (i = -8; i < 0; i=i+0.1) {
    for (j = -PI; j < 0; j=j+dt) {
      z_spot = getMapExp([i, j]);
      z_spot_old_i = getMapExp([i, j-dt]);
      line(z_spot_old_i[0]*zscale + zx0, z_spot_old_i[1]*zscale + zy0, z_spot[0]*zscale + zx0, z_spot[1]*zscale + zy0);
      z_spot_old_j = getMapExp([i-dt, j]);
      line(z_spot_old_j[0]*zscale + zx0, z_spot_old_j[1]*zscale + zy0, z_spot[0]*zscale + zx0, z_spot[1]*zscale + zy0);
    }
    }

  stroke(0);
  z_1 = getMapExp([-0.01, 0.7]);
  z_2 = getMapExp([-0.01, -0.7]);
  z_3 = getMapExp([-0.01, 0.0995]);
  z_4 = getMapExp([-0.01, -0.0995]);
  fill(175, 100, 0);
  ellipse(z_1[0] * zscale + zx0, z_1[1] * zscale + zy0, 16, 16);
  ellipse(z_2[0] * zscale + zx0, z_2[1] * zscale + zy0, 16, 16);
  ellipse(z_3[0] * zscale + zx0, z_3[1] * zscale + zy0, 16, 16);
  ellipse(z_4[0] * zscale + zx0, z_4[1] * zscale + zy0, 16, 16);

  ellipse(1050, 150, 16, 16);
  stroke(255);
  fill(255);
  text('Pole locations with', 1070, 157);
  text('z = e^sT transform', 1070, 180);
}
if (grid > 1) {
  stroke(100, 23, 45);
  for (i = -8; i < 0; i=i+0.1) {
    for (j = -PI; j < PI; j=j+dt) {
      z_spot = getMap([i, j], warp);
      z_spot_old_i = getMap([i, j-dt], warp);
      line(z_spot_old_i[0]*zscale + zx0, z_spot_old_i[1]*zscale + zy0, z_spot[0]*zscale + zx0, z_spot[1]*zscale + zy0);
      z_spot_old_j = getMap([i-dt, j], warp);
      line(z_spot_old_j[0]*zscale + zx0, z_spot_old_j[1]*zscale + zy0, z_spot[0]*zscale + zx0, z_spot[1]*zscale + zy0);
    }
  }

  fill(100, 23, 45);
  stroke(0);
  z_1 = getMap([-0.01, 0.7], warp);
  z_2 = getMap([-0.01, -0.7], warp);
  z_3 = getMap([-0.01, 0.0995], warp);
  z_4 = getMap([-0.01, -0.0995], warp);
  ellipse(z_1[0] * zscale + zx0, z_1[1] * zscale + zy0, 16, 16);
  ellipse(z_2[0] * zscale + zx0, z_2[1] * zscale + zy0, 16, 16);
  ellipse(z_3[0] * zscale + zx0, z_3[1] * zscale + zy0, 16, 16);
  ellipse(z_4[0] * zscale + zx0, z_4[1] * zscale + zy0, 16, 16);

  stroke(0);
  ellipse(1050, 250, 16, 16);
  stroke(255);
  fill(255);
  text('Pole locations with', 1070, 257);
  text('bilinear transform', 1070, 280);
}
  stroke(0);
  noFill();
  ellipse(zx0, zy0, 2*zscale, 2*zscale);
  fill(200);
}


function getMap(s_spot, warp) {
  print(warp);
  if (warp == 0) {
    w = 1;
  } else {
    w = Math.tan(warp)/warp;
  }
  this.sr = s_spot[0];
  this.si = s_spot[1];
  this.zr = (1 - w*w*this.sr*this.sr - w*w*this.si*this.si) /
  (1 - 2*w*this.sr + w*w*this.sr*this.sr + w*w*this.si*this.si);
  this.zi = (2*w*this.si) /
  (1 - 2*w*this.sr + w*w*this.sr*this.sr + w*w*this.si*this.si);
  return [this.zr, this.zi];
}

function getMapExp(s_spot) {
  this.sr = s_spot[0];
  this.si = s_spot[1];
  this.zr = Math.exp(this.sr*2) * Math.cos(this.si*2);
  this.zi = Math.exp(this.sr*2) * Math.sin(this.si*2);
  return [this.zr, this.zi];
}

function mouseClicked() {
    grid = grid + 1;
    if (grid == 3) {grid = 2};
}

var tree = [];
var leaves = [];
var leavesColours = [];
let snowflakes = [];

var count = 0;
var season = 3;
var times = 10;
var rSlider, lSlider;
var a, b;
var dimension;

function setup() {
  createCanvas(windowWidth - 100, windowHeight - 100);
  dimension = (windowHeight * 2) / 3;

  textFont("Courier New");
  textAlign(CENTER, CENTER);

  lSlider = createSlider(0, PI, PI / 4, PI / 12);
  lSlider.addClass("slider1");
  lSlider.size(150);
  lSlider.position((width - dimension) / 2, (height + dimension) / 2 + 10);
  lSlider.class("form-range");

  rSlider = createSlider(0, PI, PI / 4, PI / 12);
  rSlider.addClass("slider2");
  rSlider.size(150);
  rSlider.position(
    (width + dimension) / 2 - 150,
    (height + dimension) / 2 + 10
  );
  rSlider.style("background-color", "rgb(0, 0, 50)");
  rSlider.class("form-range");

  a = createVector(width / 2, (height + dimension) / 2 - dimension / 4);
  b = createVector(width / 2, (height + dimension) / 2 - dimension / 2);
  var root = new Branch(a, b);
  tree[0] = root;

  let iButton = createButton("pass the time");
  iButton.size(150, 35);
  iButton.position((width - 150) / 2 - 100, (height + dimension) / 2 + 45);

  let rButton = createButton("restart");
  rButton.size(150, 35);
  rButton.position((width - 150) / 2, (height + dimension) / 2 + 95);
  rButton.style("background-color", "rgb(163, 100, 37)");

  let gButton = createButton("generate randomly");
  gButton.size(150, 35);
  gButton.position((width - 150) / 2 + 100, (height + dimension) / 2 + 45);

  iButton.mousePressed(() => {
    grow_tree(0);
  });

  rButton.mousePressed(() => {
    delete_tree();
  });

  gButton.mousePressed(() => {
    grow_tree(1);
  });
}

function delete_tree() {
  tree = [];
  leaves = [];
  leavesColours = [];
  var root = new Branch(a, b);
  tree[0] = root;
  season = 3;
  count = 0;
}

function grow_tree(isRandom) {
  if (count < times) {
    if (isRandom) {
      var rightAngle = random(0, PI);
      var leftAngle = random(0, PI);
      rSlider.value(rightAngle);
      lSlider.value(leftAngle);
    }
    for (var i = tree.length - 1; i >= 0; --i) {
      if (!tree[i].finished) {
        tree.push(tree[i].branch(rSlider.value()));
        tree.push(tree[i].branch(-lSlider.value()));
      }
      tree[i].finished = true;
    }
  }
  season++;
  if (season == 5) {
    season = 1;
  }
  count++;

  if (season == 1) {
    for (var i = 0; i < tree.length; ++i) {
      if (!tree[i].finished) {
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
        var colour = createVector(
          random(150, 255),
          random(0, 255),
          random(0, 1.01)
        );
        leavesColours.push(colour);
      }
    }
  }

  if (season == 4) {
    leaves = [];
  }
}

function make_snow() {
  let t = frameCount / 60;

  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake());
  }

  for (let flake of snowflakes) {
    flake.update(t);
    flake.display();
  }
}

function draw() {
  background(255);
  fill(0);
  strokeWeight(1.5);
  stroke(0);
  text("Fractal Tree", width / 2, (height - dimension) * 0.25);
  strokeWeight(0);

  var rDegrees = round((rSlider.value() * 180) / PI);
  var lDegrees = round((lSlider.value() * 180) / PI);

  textSize(20);
  textAlign(LEFT);
  strokeWeight(1);
  text(
    "right angle: " + rDegrees + "°",
    (width + dimension) / 2 + 30,
    (height + dimension) / 2 + 22
  );
  text(
    "left angle: " + lDegrees + "°",
    (width - dimension) / 2 - 200,
    (height + dimension) / 2 + 22
  );

  strokeWeight(0);
  textSize(32);
  textAlign(CENTER, CENTER);

  var colour;

  switch (season) {
    case 1:
      colour = createVector(144, 238, 144);
      break;
    case 2:
      colour = createVector(255, 80, 80);
      break;
    case 3:
      colour = createVector(153, 51, 0);
      break;
    case 4:
      colour = createVector(173, 216, 230);
      break;
    default:
      colour = createVector(255, 255, 255);
  }

  fill(colour.x, colour.y, colour.z, 100);
  noStroke();
  rect(
    (width - dimension) * 0.5,
    (height - dimension) * 0.5,
    dimension,
    dimension,
    20
  );

  strokeWeight(2.7);
  tree[0].show();
  strokeWeight(1.7);

  for (var i = 1; i < tree.length; ++i) {
    tree[i].show();
  }

  strokeWeight(2.7);
  stroke(43, 29, 20);
  line(
    width / 2,
    (height + dimension) / 2,
    width / 2,
    (height + dimension) / 2 - dimension / 4 + 1
  );

  if (season == 1) {
    for (var i = 0; i < leaves.length; ++i) {
      fill(0, leavesColours[i].y, 0, 100);
      strokeWeight(0);
      ellipse(leaves[i].x, leaves[i].y, 5, 5);
    }
    strokeWeight(1.5);
    fill(colour.x, colour.y, colour.z);
    stroke(colour.x, colour.y, colour.z);
    textFont("arial");
    textSize(50);
    text(
      "S\n p\n  r\n   i\n    n\n     g\n",
      (width - dimension) / 4,
      dimension / 2 + 80
    );
    textFont("Courier New");
    textSize(32);
  }

  var millisecond = millis();

  if (season == 2) {
    for (var i = 0; i < leaves.length; ++i) {
      fill(
        leavesColours[i].x * round(leavesColours[i].z),
        leavesColours[i].y,
        0,
        100
      );
      strokeWeight(0);
      ellipse(leaves[i].x, leaves[i].y, 8, 8);
    }
    strokeWeight(1.5);
    fill(colour.x, colour.y, colour.z);
    stroke(colour.x, colour.y, colour.z);
    textFont("arial");
    textSize(50);
    text(
      "S\n u\n  m\n   m\n    e\n     r\n",
      (width - dimension) / 4,
      dimension / 2 + 80
    );
    textFont("Courier New");
    textSize(32);
  }

  if (season == 3) {
    snowflakes = [];
    for (var i = 0; i < leaves.length; ++i) {
      fill(leavesColours[i].x, leavesColours[i].y, 0, 100);
      strokeWeight(0);
      ellipse(leaves[i].x, leaves[i].y, 8, 8);
      leaves[i].y = min((height + dimension) / 2, leaves[i].y + random(0, 2));
    }
    strokeWeight(1.5);
    stroke(colour.x, colour.y, colour.z);
    fill(colour.x, colour.y, colour.z);
    textFont("arial");
    textSize(50);
    text(
      "A\n u\n  t\n   u\n    m\n     n\n",
      (width - dimension) / 4,
      dimension / 2 + 80
    );
    textFont("Courier New");
    textSize(32);
  }

  if (season == 4) {
    strokeWeight(0);
    make_snow();
    strokeWeight(1.5);
    //fill(0);
    stroke(173, 216, 230);
    fill(173, 216, 230);
    textFont("arial");
    textSize(50);
    text(
      "W\n i\n  n\n   t\n    e\n     r\n",
      (width - dimension) / 4,
      dimension / 2 + 80
    );
    textFont("Courier New");
    textSize(32);
  }
}

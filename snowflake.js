function snowflake() {
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function (time) {
    let w = 0.6;
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);
    this.posY += pow(this.size, 0.5);

    if (this.posY > (height - dimension) * 0.5 + dimension) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function () {
    if (this.posX > (width - dimension) * 0.5 && this.posX < (width - dimension) * 0.5 + dimension && 
    this.posY > (height - dimension) * 0.5 && this.posY < (height - dimension) * 0.5 + dimension) {
      fill(256, 256, 256);
      ellipse(this.posX, this.posY, this.size);
    }
  };
}

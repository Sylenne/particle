function Particles(x, y, x_target, y_target, color) {
    this.pos = createVector(x, y);
    this.target = createVector(x_target, y_target);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxspeed = random(10,50);
    this.maxforce = 5;
    this.color = color;
  }
  
Particles.prototype.behaviors = function() {
    var arrive = this.arrive(this.target);  
    arrive.mult(1);    
    this.applyForce(arrive);
};
  
Particles.prototype.applyForce = function(f) {
    this.acc.add(f);
};
  
Particles.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
};
  
Particles.prototype.show = function() {
    stroke(this.color);
    point(this.pos.x, this.pos.y);
};
  
Particles.prototype.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;

    if (d < 100) {
        speed = map(d, 0, 100, 0, this.maxspeed);
    }

    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
};
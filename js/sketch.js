var offset_x, offset_y;
p5.disableFriendlyErrors = true;

var img = [];

var nb_img = 4; //changer le nombre en fonction de combien tu en as

function preload() {
  for (var i = 0; i < nb_img; i++) {
    img[i] = loadImage("js/assets/img_"+i+".jpg"); 
  }
}
      
var particles = [];

var boxSize = 200 / 2;

function setup() {
  createCanvas(displayWidth, displayHeight);
  offset_x = random(displayWidth/2 - img[0].width);
  offset_y = random(displayHeight/2 - img[0].height);

  for(var y = 0; y < img[0].height; y++) {
    for(var x = 0; x < img[0].width; x++) {
      var index = y * img[0].width + x;
      particles[index] = new Particles(random(width), random(height), x + offset_x, y + offset_y, img[0].get(x,y));
    }
  }  

}

function draw() {
  //background(0,255,127,150);
  background(0,0,0,50);
  for(var i = 0; i < particles.length; i = i + 4) {
    var v = particles[i];
    v.behaviors();
    v.update();
    v.show();
  }

  

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
    if (
        mouseX > particles[0].pos.x && 
        mouseX < particles[0].pos.x + boxSize &&
        mouseY > particles[0].pos.y  && 
        mouseY < particles[0].pos.y + boxSize ) 
        {

            var img_index = int(random(0,nb_img));
            offset_x = random(displayWidth - img[img_index].width);
            offset_y = random(displayHeight - img[img_index].height);
      
            for(var y = 0; y < img[img_index].height; y++) {
                for(var x = 0; x < img[img_index].width; x++) {
                    var index = y * img[img_index].width + x;
                    particles[index] = new Particles(particles[index].pos.x, particles[index].pos.y, x + offset_x, y + offset_y, img[img_index].get(x,y));
                }     
            }
    }
}

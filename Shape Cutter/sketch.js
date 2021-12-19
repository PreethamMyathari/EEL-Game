const shapeCutter = p => {
let width = 550;
let height = 600;
let clipSound;
let drumSound;

p.preload = function() {
  p.soundFormats('mp3');
  clipSound = p.loadSound('Scissors-Clipping-opening-and-closing-3-www.FesliyanStudios.com.mp3');
  drumSound = p.loadSound('Ba-Bum-Tss-Joke-Drum-A1-www.fesliyanstudios.com.mp3');
}

p.setup = function() {
  p.createCanvas(width, height);
  
  let backButton = p.createButton('Back');
  backButton.position(10, 10);
  backButton.mousePressed(switchToMainMenu);
  backButton.size(60,30);
  
  drawBackground(p.color(17, 24, 219), p.color(34, 36, 89));
  drawShape();
}
  
function switchToMainMenu() {
  window.location.href = "https://editor.p5js.org/mpreetham/present/4O217RqCM";
}

function drawBackground(from, to) {
  for(let i = 0; i <= height; i++) {
    p.stroke(p.lerpColor(from, to, i / height));
    p.line(0, i, width, i);
  }
}

let cX;
let cY;
let pc = [];
let activeTouches = new Map();

function drawShape() {
  let unique;
  
  do {
    cX = p.random(width * 0.1, width * 0.9);
    cY = p.random(height * 0.1, height * 0.9);
    unique = true;
    
    for(let i = 0; i < pc.length; i++) {
        if(p.dist(cX, cY, pc[i][0], pc[i][1]) < 100)
          unique = false;
    }
  } while(!unique);
  
  p.stroke("black");
  p.strokeWeight(5);
  p.circle(cX, cY, 50);
  pc.push([cX, cY]);
}

p.touchStarted = function(event) {
  if(!event.changedTouches)
    return
    
  for(let i = 0; i < event.changedTouches.length; i++) {
    let touch = event.changedTouches.item(i);
    
    if(p.dist(touch.pageX, touch.pageY, cX, cY) >= 75) {
      activeTouches.set(touch.identifier, new ActiveTouch(touch.pageX, touch.pageY, touch.pageX, touch.pageY))
    }
  }
  
  return false;
}

p.touchMoved = function(event) {
  if(!event.changedTouches)
    return
    
  for(let i = 0; i < event.changedTouches.length; i++) {
    let touch = event.changedTouches.item(i);
    let activeTouch = activeTouches.get(touch.identifier);
    
    if(activeTouch) {
      activeTouch.currentX = touch.pageX;
      activeTouch.currentY = touch.pageY;
    }
  }
  
  if(pc == null || activeTouches.size != 2)
    return false;
  
  let iterator = activeTouches.values();
  let touch1 = iterator.next().value;
  let touch2 = iterator.next().value;
  let d1 = p.dist(touch1.currentX, touch1.currentY, cX, cY);
  let d2 = p.dist(touch2.currentX, touch2.currentY, cX, cY);
  
  if(d1 <= 50 && d2 <= 50) {
    clipSound.play(0, 1, 1, 0.3);
    p.strokeWeight(5);
    p.stroke("red");
    p.line(touch1.startX, touch1.startY, touch2.startX, touch2.startY);
      
    if(pc.length >= 10) {
      clipSound.stop();
      drumSound.play();
      pc = null;
      drawBackground(p.color("green"), p.color("black"));
      p.fill("white");
      p.strokeWeight(1);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(32)
      p.text("You won!", width / 2, height / 2);
    } else {
      drawShape();
    }
  }
  
  return false;
}

p.touchEnded = function(event) {
  if(!event.changedTouches)
    return
  
  for(let i = 0; i < event.changedTouches.length; i++) {
    let touch = event.changedTouches.item(i);
    activeTouches.delete(touch.identifier);
  }
  
  return false;
}

class ActiveTouch {
  constructor(startX, startY, currentX, currentY) {
    this.startX = startX;
    this.startY = startY;
    this.currentX = currentX;
    this.currentY = currentY;
  }
}
}

new p5(shapeCutter);
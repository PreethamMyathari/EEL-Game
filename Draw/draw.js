const s = p => {
let circX = 275;
let circY = 300;
let diam = 300;

let rectX = 175;
let rectY = 200;
let side1 = 200;
let side2 = 200;

let triX1 = 275;
let triY1 = 175;
let triX2 = 412.5;
let triY2 = 375;
let triX3 = 137.5;
let triY3 = 375;

let buffer = 12.5;
  
let clearButton;
let circButton;
let rectButton;
let triButton;
let easyButton;
let medButton;
let hardButton;
let backButton;
  
p.setup = function() {
  let width = 550;
  let height = 600;
  let from = p.color(17, 24, 219);
  let to = p.color(34, 36, 89);
  p.createCanvas(550, 600);
  

  for(i = 0; i <= height; i++) {
    p.stroke(p.lerpColor(from, to, i / height));
    p.line(0, i, width, i);
  }
  
  clearButton = p.createButton('Clear');
  clearButton.position( 205, 50);
  clearButton.mousePressed(clearMethod);
  clearButton.size(60,40);
   
  circButton = p.createButton('Circle');
  circButton.position( 100, 500);
  circButton.mousePressed(circMethod);
  circButton.size(60,40);
  
  rectButton = p.createButton('Square');
  rectButton.position( 200, 500);
  rectButton.mousePressed(rectMethod);
  rectButton.size(60,40);
  
  triButton = p.createButton('Triangle');
  triButton.position( 300, 500);
  triButton.mousePressed(triMethod);
  triButton.size(60,40);
  
  easyButton = p.createButton('Easy');
  easyButton.position( 100, 550);
  easyButton.mousePressed(easyDifficulty);
  easyButton.size(60,40);
  
  medButton = p.createButton('Medium');
  medButton.position( 200, 550);
  medButton.mousePressed(medDifficulty);
  medButton.size(60,40);
  
  
  hardButton = p.createButton('Hard');
  hardButton.position( 300, 550);
  hardButton.mousePressed(hardDifficulty);
  hardButton.size(60,40);
  
  backButton = p.createButton('Back');
  backButton.position( 50, 25);
  backButton.mousePressed(switchToMainMenu);
  backButton.size(60,30);
}

function switchToMainMenu(){
  backButton.hide();
  let otherPageLink='https://editor.p5js.org/mpreetham/present/4O217RqCM'
  
  window.location.href = otherPageLink;
}
  
function easyDifficulty(){
  clearMethod();
  easyButton.style('background-color', p.color(0, 255, 0));
  buffer = 20;
}
  
function medDifficulty(){
  clearMethod();
  medButton.style('background-color', p.color(0, 255, 0));
  buffer = 12.5;
}
  
function hardDifficulty(){
  clearMethod();
  hardButton.style('background-color', p.color(0, 255, 0));
  buffer = 5;
}
function clearMethod(){
  p.setup();
  if (flag == "circ"){
    drawCircle(circX, circY, diam);
    circButton.style('background-color', p.color(0, 255, 0));
  }
  if (flag == "rect"){
    drawRect(rectX, rectY, side1, side2);
    rectButton.style('background-color', p.color(0, 255, 0));
  }
  if (flag == "tri"){
    drawTri(triX1, triY1,triX2, triY2,triX3, triY3);
    triButton.style('background-color', p.color(0, 255, 0));
  }
}
function circMethod(){
  p.setup();
  drawCircle(circX, circY, diam);
  circButton.style('background-color', p.color(0, 255, 0));
}
function rectMethod(){
  p.setup();
  drawRect(rectX, rectY, side1, side2);
  rectButton.style('background-color', p.color(0, 255, 0));
}
function triMethod(){
  p.setup();
  drawTri(triX1, triY1,triX2, triY2,triX3, triY3);
  triButton.style('background-color', p.color(0, 255, 0));
}

function drawCircle(x, y, d){
  flag = "circ";
  p.noFill();
  p.noStroke();
  p.circle(x, y, d);
  //add dashed line to draw on
  
  p.fill(255, 255, 255);
  for(i=0; i <= 240; i+=5){
    p.ellipse(x + d/2*p.cos(i),y + d/2*p.sin(i), 6, 6);
  }
  
}

function drawRect(x, y, s1, s2){
  flag = "rect";
  p.noFill();
  p.noStroke();
  p.rect(x, y, s1, s2);
  //add dashed line to draw on
  
  p.fill(255, 255, 255);
  for(i=0; i <= s2; i+=10){
    p.ellipse(x+i,y, 6, 6);
    p.ellipse(x,y+i, 6, 6);
    p.ellipse(x+i,y+s2, 6, 6);
    p.ellipse(x+s2,y+i, 6, 6);
  }
  
}

function drawTri(x1, y1, x2, y2, x3, y3){
  flag = "tri";
  p.noFill();
  p.noStroke();
  p.triangle(x1, y1, x2, y2, x3, y3);
  //add dashed line to draw on
  
  p.fill(255, 255, 255);
  for(i=0; i <= 200; i+=10){
    p.ellipse(x1+6.875*(i/10),y1+i, 6, 6);
    p.ellipse(x1-6.875*(i/10),y1+i, 6, 6);
    p.ellipse(x3+13.75*(i/10),y3, 6, 6);
    
  }
}

function shapeFlagSet(x){
  flag = x;
}

function shapeFlagGet(){
  return flag;
}

function circDistance(x1, x2, y1, y2){
  return p.sqrt(p.sq(x1-x2) + p.sq(y1-y2))-diam/2;
}

function rectDistance(rectX, rectY, x, y) {
  let dx = Math.max(rectX + 10 - x, 0, x - (rectX-10+side1));
  let dy = Math.max(rectY + 10 - y, 0, y - (rectY-10+side2));
  return Math.sqrt(dx*dx + dy*dy);
}

function triDistance(x, y) {
  firstSide = p.abs((triX2-triX1)*(triY1-y) - (triX1-x)*(triY2-triY1))/p.sqrt(p.sq(triX2-triX1) + p.sq(triY2-triY1));
  secondSide = p.abs((triX3-triX2)*(triY2-y) - (triX2-x)*(triY3-triY2))/p.sqrt(p.sq(triX3-triX2)+ p.sq(triY3-triY2));
  thirdSide = p.abs((triX1-triX3)*(triY3-y) - (triX3-x)*(triY1-triY3))/p.sqrt(p.sq(triX1-triX3)+ p.sq(triY1-triY3));
  return Math.min(firstSide, secondSide, thirdSide);
}

function triVertexDistance(x, y){
  if(p.pmouseX < triX3 - buffer /*&& p.pmouseY > triY3 + buffer*/){
    return true;
  }
  if(p.pmouseX > triX2 + buffer /*&& p.pmouseY > triY2 + buffer*/){
    return true;
  }
  if(p.pmouseY < triY1 - buffer){
    return true;
  }
  else{
    return false;
  }
}

function mouseFlag(x){
  mouseFlagState = x;
  if(mouseFlagState){
     
     }
}

p.mouseDragged = function() {
  if(flag == "circ"){
    if(circDistance(p.pmouseX, circX, p.pmouseY, circY) > buffer  || circDistance(p.pmouseX, circX, p.pmouseY, circY) < -buffer ){
      p.stroke(255, 0, 0);
      p.strokeWeight(5);
      if (p.mouseIsPressed === true) {
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    return false;
    }
    else{
      p.stroke(0, 255, 0);
      p.strokeWeight(5);
      if (p.mouseIsPressed === true) {
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    return false;
    }
  }
  if(flag == "rect"){
    if(rectDistance(rectX, rectY, p.pmouseX, p.pmouseY) > (buffer + 10)|| rectDistance(rectX, rectY, p.pmouseX, p.pmouseY) == 0){
      p.stroke(255, 0, 0);
      p.strokeWeight(5);
      if (p.mouseIsPressed === true) {
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    return false;
    }
    else{
      p.stroke(0, 255, 0);
      p.strokeWeight(5);
      if (p.mouseIsPressed === true) {
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    return false;
    }
  }
  if(flag == "tri"){
      if((triDistance(p.pmouseX, p.pmouseY) > buffer|| triDistance(p.pmouseX, p.pmouseY) < -buffer) || triVertexDistance(p.pmouseX, p.pmouseY) == true){
      p.stroke(255, 0, 0);
      p.strokeWeight(5);
      if (p.mouseIsPressed === true) {
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    return false;
    }
    else{
      p.stroke(0, 255, 0);
      p.strokeWeight(5);
      if (p.mouseIsPressed === true) {
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    return false;
    }
    
  }
}
}
new p5(s);
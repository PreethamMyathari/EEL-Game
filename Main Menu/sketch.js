
   


let img
let img1
let img2
  function preload(){
    
    img = loadImage('Eel2.jpeg');
    img1 = loadImage('Shape C 2.jpg');
    img2 = loadImage('Drawing.jpg');
  }


let currentActivity = 0;
let button1;
let button2;
let button3;
function mainMenu(){
  button1.show();
  button2.show();
  button3.show();
  
  
  let width = 550;
  let height = 600;
  let from = color(17, 24, 219);
  let to = color(34, 36, 89);
  createCanvas(550, 600);
  
  for(i = 0; i <= height; i++) {
    stroke(lerpColor(from, to, i / height));
    line(0, i, width, i);
     image(img, 80,290,100,100);
     image(img1,230,290,100,100);
    image(img2,370,290,100,100);

     fill(0);
    rect(170,10,190,90);
    fill(255,255,255);
    textSize(23);
   
    text('Main Menu', 210, 65);
  }
}







function switchToE1(){
  currentActivity = 1;
  button1.hide();
  button2.hide();
  button3.hide();
  window.location.href = otherPageLink;
}

function switchToE2(){
  currentActivity = 2;
  
  button1.hide();
  button2.hide();
  button3.hide();
  window.location.href = otherPageLink1;
}

function switchToE3(){
  currentActivity = 3;
 button1.hide();
  button2.hide();
  button3.hide();
  
  window.location.href = otherPageLink2;

}


function setup() {
 
  createCanvas(550, 600);
  
    

  button1 = createButton('EEL');
  button1.position( 80, 400);
  button1.mousePressed(switchToE1);
    button1.size(100,70);
   button1.style('color:red');
 
  button2 = createButton('Shape Cutter');
  button2.position(230,400);
   button2.mousePressed(switchToE2);
  button2.size(100,70);
  button2.style('color:red');
  
  button3 = createButton('Drawing');
  button3.position(370,400);
   button3.mousePressed(switchToE3);
  button3.size(100,70);
  button3.style('color:red');
  
 

}


let otherPageLink='https://editor.p5js.org/mpreetham/present/OupUerXgZ'
let otherPageLink1='https://editor.p5js.org/Lulu.Alrewaily/present/oJFC5pr9M'
let otherPageLink2='https://editor.p5js.org/ap4godfrey/present/WCZpgjMIJ'
function mouseClicked(){
  
}
function draw() {
 
    
  

  switch(currentActivity){
    case 0:
      text('click here ', 50, 50);
      mainMenu();
      break;
    case 1:
      exercise1();
      break;
    case 2:
      exercise2();
      break;
    case 3:
      exercise3();
      break;
      case 4:
      mainMenu();
      break;
  }

}


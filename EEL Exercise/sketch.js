const eel = p => {

var s;
var scl = 20;
var food;
const width = 550;
const height = 600;

p.setup = function () 
{
  p.createCanvas(550, 600);
  s = new Snake();
  p.frameRate(9); 
  pickLocation(); 
  buttonUp = p.createButton('UP');
  buttonUp.position(400,100);
  buttonUp.size(60,30);
  buttonLeft = p.createButton('LEFT');
  buttonLeft.position(340,130);
  buttonLeft.size(60,30);
  buttonRight = p.createButton('RIGHT');
  buttonRight.position(460,130);
  buttonRight.size(60,30);
  buttonDown = p.createButton('DOWN');
  buttonDown.position(400,130);
  buttonDown.size(60,30);
  buttonUp.mousePressed(switch_up);
  buttonDown.mousePressed(switch_down);
  buttonLeft.mousePressed(switch_left);
  buttonRight.mousePressed(switch_right);
}

//function to store food's location on the grid
function pickLocation() {
  food = p.createVector(p.floor(p.random(0,27)),p.floor(p.random(19,29)));
	food.mult(scl);//to expand it back out


}

function drawBackground()
{
  let from = p.color(17, 24, 219);
  let to = p.color(34, 36, 89);
  for(i = 0; i <= height; i++)
  {
    p.stroke(p.lerpColor(from, to, i / height));
    p.line(0, i, width, i);
  }
   p.fill('cyan');
  p.text('EEL GAME', 180, 50);
  p.textSize(30);
  p.fill(204,204,255);
  p.text("SCORE:",75,125);
  p.text(s.total,200,125);
}

p.draw = function () {
  
  drawBackground();
  p.stroke(3);
  p.fill('black');
  p.line(0,200,550,200);
  p.noFill();
  //if snake eat food, pick location
  if (s.eat(food)) {
  	pickLocation();
  }
  s.death();
  s.update();
  s.show();
 
  
	
  //drawing snake food
  p.fill(255, 102, 204);
  p.rect(food.x, food.y, scl, scl);
  
}
function switch_up()
{
    s.dir(0,-1);
}
function switch_down()
{
  s.dir(0,1);
}
function switch_left()
{
  s.dir(-1,0);
}
function switch_right()
{
  s.dir(1,0);
}


p.keyPressed = function () 
{
  if (p.keyCode === p.UP_ARROW) 
  {
    if(s.dir.y === 1)
      s.dir(0,1);
    else
      s.dir(0, -1); //moves 0 along x and -1 (up) along y axis
  } 
  else if (p.keyCode === p.DOWN_ARROW) 
  {
    s.dir(0, 1);
  } else if (p.keyCode === p.RIGHT_ARROW) 
  {
    s.dir(1, 0);
  } else if (p.keyCode === p.LEFT_ARROW) 
  {
    s.dir(-1, 0);
  }
}


//function to create snake object, with location and speed
  function Snake() 
{
      this.x = 0;
      this.y = 200;
      this.xspeed = 1;
      this.yspeed = 0;
    	this.total = 0; //to track the lenght of snake. 
    	this.tail = [10];//an array for the tail
    

  	this.eat = function(pos) 
    {
      var d = p.dist(this.x, this.y, pos.x, pos.y);
      
      if (d < 10) //if the snake has reached the food
      {
        
        this.total++;//total goes up to one
      	return true;
      } 
      else 
      {
       	return false;
      }  
    }
    
   
    this.dir = function(x, y)   
    {
    	this.xspeed = x;
      this.yspeed= y;
    }
    
    
    this.death = function() 
    {
    	for (var i = 0; i < this.tail.length; i++) 
        {
      	var pos = this.tail[i];
        var d = p.dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) 
        {
          endGame(this.total);        
          this.total = 0;
          this.tail= [];
        }
      }
    }
    function endGame()
  {
    p.noLoop();
   p.background('black');
    p.fill('red');
    p.textSize(50);
  p.text('GAME OVER', 130, 200);
  p.textSize(40);
  p.text("SCORE:",180,350);
  p.text(s.total,340,350);
    buttonUp.hide();
    buttonDown.hide();
    buttonRight.hide();
    buttonLeft.hide();  
  }
  
 

    
    this.update = function() 
    {
      
      if (this.total === this.tail.length) 
      {
      	for (var i = 0; i < this.tail.length-1; i++) 
        { 
        	this.tail[i] = this.tail[i+1];
      	}
	  }   
      
      this.tail[this.total-1] = p.createVector(this.x, this.y);
      
      this.x = this.x + this.xspeed*scl;
      this.y = this.y + this.yspeed*scl;
      
      //to constrain snake getting off the grid
      this.x = p.constrain(p.floor(this.x), 0, p.floor(550-20));
      this.y = p.constrain(p.floor(this.y), 200, 600-20);
    }
    
    this.show = function () {
      p.fill('black');
      //draw the tail on current location
      	for (var i = 0; i < this.tail.length; i++){
      		p.rect(this.tail[i].x, this.tail[i].y, scl, scl);
      	}
      
      //draw the food on current location
        p.fill('black');
        p.rect(this.x, this.y, scl, scl);
  }
}  
}
new p5(eel);

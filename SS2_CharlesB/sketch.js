//Charles B
//A Transitioning Sun
//This is the same as the previous homework, however it has a day-night cycle that is controlled by the mouse and keyboard.
//"let" is a varriable, allows you to be more dynamic with things
let r = 110; //red = 0 to 255
let g = 200; //green = o to 255
let b = 400; //blue = 0 to 255
let y = 255; //(attempt at) yellow = 255
function setup()
{ createCanvas(800, 400); // creates a canvas
}
function draw(){
    background(r, g, b);
// changes the color of the background
fill(0, 155, 0)
rect(0, 300, 800, 300);

line(0, 300, 800, 300);
// Creates a line on the background

fill(0, 155, 0);

triangle(0, 400, 250, 150, 550, 400);
// Makes a Triangle, requires 3 points
triangle(250, 400, 550, 150, 750, 400);

fill(y);
ellipse(90, 90, 90);
// This is the sun, but it can also change into the moon with variable "y".
fill(150, 250, 150);
triangle(700, 250, 525, 600, 775, 250);
// landmass on the verge of a breakaway
triangle(150, 350, 175, 300, 200, 350);
triangle(150, 300, 175, 250, 200, 300);
triangle(350, 350, 475, 300, 500, 350);
triangle(250, 350, 275, 300, 300, 350);
// Tree analogs/simplest form of trees
}

function mousePressed() //code block runs once, only when moused is pressed, then returns to draw() loop. Click to slowly change the time of day.
{
	r -= 10;		
	g -= 10;	
	b -= 10;
    y -= 3.5;
}

function keyPressed() //code block runs once, only when any key is pressed, then returns to draw() loop. Press to Instantly change back to day time.
{
	r = 110
    g = 200
    b = 400
    y = 255 //tried to do a Collor Yellow, but.. kinda failed.
}

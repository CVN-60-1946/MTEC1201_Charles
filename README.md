# MTEC1201_Charles
homework #1 (it got messed up, don't exactly know how to fix this, just copy everything from "function setup" down in code form.)

This is a line comment, Use these to make your code readable, Control/Command, slash is a quick-comment style system.

we NEED to include a setup function so that everything works fine, or else othing works at all.

ALWAYS PUT A SEMI-COLON (;) IN FRONT OF THE CODE OR IT WONT WORK (outside of p5.js)

    function setup()
    {
    
    createCanvas(800, 400);
    //creates a canvas
    
    background(110, 200, 235);
    // changes the color of the background
    fill(0, 155, 0)
    rect(0, 300, 800, 300)

    line(0, 300, 800, 300);
    // Creates a line on the background
  
    fill(0, 155, 0);

    triangle(0, 400, 250, 150, 550, 400);
    // Makes a Triangle, requires 3 points
    triangle(250, 400, 550, 150, 750, 400);

    fill(255, 255, 0);
    ellipse(90, 90, 90);
    // here comes da sun. -japan, 1945
    fill(150, 250, 150);
    triangle(700, 250, 525, 600, 775, 250);
    // landmass on the verge of a breakaway
    triangle(150, 350, 175, 300, 200, 350);
    triangle(150, 300, 175, 250, 200, 300);
    triangle(350, 350, 475, 300, 500, 350);
    triangle(250, 350, 275, 300, 300, 350);
    // Tree analogs/simplest form of trees
    }

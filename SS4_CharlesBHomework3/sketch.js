// Charles B.
// Observing the Stars under Midnight
// Press the Mouse button to make the sky eepy and start the show, Press the W key to wake yo ass up(rise the sun).
// I've always been fascinated by 4 things in life: History, Railways, Military(technology), and Space. I've always wanted to do a space themed star-viewing thing, so here it is.

// Basic "let" value starting points, starting at daylight.
let x = 740;
let y = 100;
let xMove = 0;
let yMove = 0;
let r = 255;
let g = 255;
let b = 0;

function setup() {
    createCanvas(1487, 706);

    //starts the sun at it's peak location "noon" on the canvas
    x = width / 2;
    x = height / 1;
}

function draw()
{
    background(100, 100, 255);
    //Code for the Sun
    fill(r, g, b);
    ellipse(x, y, 100, 100);
    
    //creating the ground
    fill(23, 175, 50);
    rect(0, 650, 1487, 706);
    
}

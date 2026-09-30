//NOTE: I wasn't able to get this to work. I tried to make the sun slowly drop when you click, but when i tried to move it down using the yMove, it didn't work.
//I was trying to go with a setting where the sun sets, and then the Moon Rises with small stars moving around. However, like i said, I wasn't able to get it to work, and i do not know why.
//(dont ask if i considered using AI, nope, negative, not in this class.)
//This is what i did:


// Charles B.
// Observing the Stars under Midnight
// Press the Mouse button to make the sky darker and set up the stars, Press any button on the keyboard to rise the sun up and hide the  stars.
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

function draw() {
    background(100, 100, 255);
    //Code for the Sun
    fill(r, g, b);
    ellipse(x, y, 100, 100);
    
    //creating the ground
    fill(23, 175, 50);
    rect(0, 650, 1487, 706);
    
}

function mousePressed() {
    
    r -= 20;		
	g -= 20;	
	b += 10;
    y -= 5; //sets the sun, Y is supposed to decrease by 5

    function draw() {
        background(5, 11, 2);
        //Night-time sky backdrop.
        fill(r, g, b);
        ellipse(x, y, 75, 75);

    //creating the ground, but it is darker.
    fill(10, 153, 34);
    rect(0, 650, 1487, 706);
    }

    //Creating A Star, though more could be many more.
    fill(255, 255, 255);
    ellipse(yMove, xMove, 20, 20); 
    //Star movements, to randomize it.
    yMove = random(5, -5);
    xMove = random(5, -5);
}

//when the key is pressed, the whole thing SHOULD reset to daytime (it doesn't.)
function keyPressed() {
    let r = 255;
    let g = 255;
    let b = 0;

    function draw() {
    background(100, 100, 255);
    //Copied Code for the Sun
    fill(r, g, b);
    ellipse(x, y, 100, 100);
    
    //creating the ground
    fill(23, 175, 50);
    rect(0, 650, 1487, 706);
    }
}
// Charles B.
//10/28/26 (Update)
// Title: K4 Pacific Locomotive MIDTERM
//Just a simple bunch of pictures of the K4 Pacific of the PRR that you can cyle through, I didn't really know what to add for a timer system to work, so i just didn't add one.

//This is my Midterm Assignment where i add onto an existing project.

let folder;
let pictures = []; //the brackets are like holding cells for the numbers assigned to the pictures, learned that through blind luck and some classic "f'ing around and finding out"
//^ Best part is that it is super easy to expand
let showingFolder = true; // true = shows the placeholder folder png, false = show one of the picture's of the K4 in order instead of the folder
let next = 0; // which picture will pull up on the next click.
let openSound; //the sound of the opening of the file
let closeSound; //the sound of the closing of the file
let K4sounds = [];  //random K4 sounds
let steam;  //steam looping sounds
let steamStarted = false;
let autoCycle = false;   // shift toggles this
let nextChange = 0;      // when the auto-cycle should switch pictures
let slideTime = 400;       // how long each slide takes (milliseconds)
let slideDirection = 1;    // side the picture will leave toward: 1 = right, -1 = left
let inDirection = -1;      // side the new picture enters from
let lastChange = -10000;   // when the last swap happened
let desk; //The WorkDesk
let showInstructions = false;

let manualPending = false;   // true while a clicked picture is sliding out
let bob = 0;


async function setup()
{
    createCanvas(1000, 600);
    background(105, 105, 105);
    imageMode(CENTER);
    textAlign(CENTER);
    folder = await loadImage("assets/placeholder_folder.png");
    pictures[0] = await loadImage("assets/K4_Blueprints.png");
    pictures[1] = await loadImage("assets/K4_Statistics.png");
    pictures[2] = await loadImage("assets/K4_IRL.png"); 
    pictures[3] = await loadImage("assets/K4A.png");
    pictures[4] = await loadImage("assets/K4_curved_pacific.png");
    pictures[5] = await loadImage("assets/K4_city_pacific.png");
    pictures[6] = await loadImage("assets/K4_propo.png");
    pictures[7] = await loadImage("assets/K4_coalfired.png");
    pictures[8] = await loadImage("assets/K4_Poster.png");

    pictures[9] = await loadImage("assets/K4_redarrowaccident.png");
    pictures[10] = await loadImage("assets/K4_redarrowdamage.png");
    pictures[11] = await loadImage("assets/K4_turntable_well.png");
    pictures[12] = await loadImage("assets/K4_derailed.png");
    pictures[13] = await loadImage("assets/K4_Flooded.png");
    desk = await loadImage("assets/Workdesk.png");
    textSize(20);

    openSound = new Audio("assets/page_open.mp3"); //loads the MP3 file from Assets, and ".play()" plays the audio.
    closeSound = new Audio("assets/folder_close.mp3"); 
    //obtained audio from here: https://pixabay.com/sound-effects/search/page-turn/

    K4sounds[0] = new Audio("assets/k4_whistle.mp3"); //couldn't find a K4 Whistle (that didn't require me to pay 3k+, so i asked an AI to make one for me)
    K4sounds[1] = new Audio("assets/k4_bell.mp3");
    K4sounds[2] = new Audio("assets/k4_chug.mp3");
    K4sounds[3] = new Audio("assets/Coupling_sound.mp3");

    steam = new Audio("assets/steam_hiss.mp3");
    steam.loop = true;   // repeats forever
    steam.volume = 0.3;  // 0 to 1, keeps it in the background
}

function draw() {
  image(desk, width / 2, height / 2, width, height);
  
    // swap pictures when the timer runs out, or when a click's slide-out finishes
    if ((autoCycle || manualPending) && millis() > nextChange)
    {
        if (manualPending)
        {
            next = (next + 1) % pictures.length;   // clicking goes in order
            manualPending = false;
        }
        else
        {
            pickNext();                            // auto-cycle stays random
        }

        openSound.currentTime = 0;
        openSound.play();
        inDirection = -slideDirection;
        slideDirection = random([1, -1]);
        lastChange = millis();
        nextChange = millis() + random(2000, 4000);
    }

    let slideOffset = 0;
    let untilChange = nextChange - millis();
    let sinceChange = millis() - lastChange;

    if ((autoCycle || manualPending) && untilChange < slideTime)
        slideOffset = slideDirection * (1 - untilChange / slideTime) * width;  // sliding out
    else if (sinceChange < slideTime)
        slideOffset = inDirection * (1 - sinceChange / slideTime) * width;     // sliding in
        
    bob = sin(millis() / 600) * 8;   // gently moves between -8 and +8 pixels
    cursor(overFolder() ? HAND : ARROW); //Sets the cursor from an arrow to a hand when passing over the hitbox

    if (showingFolder)
    {
        image(folder, width / 2, height / 2 + bob);
    }
    else
    {
        drawScaled(pictures[next], width / 2 + slideOffset, height / 2 + bob);
    }

    // small hint, always visible
  fill(255);
  textSize(16);
  text("Hold B for instructions", width / 2, height - 20);

  // instructions, only while B is held
  if (showInstructions)
    {
        fill(0, 0, 0, 200);   // dark, slightly see-through box
        rect(width / 2 - 300, 100, 600, 170, 15);

        fill(255);
        textSize(15);
        text("CLICK = open a picture\nSPACE = close the picture\nSHIFT = auto-cycle on/off\nH = Whistle | N = Bell | C = Chuffing | S = Coupling\nUPDATE 2: Added a Bobbing + Folder Hitbox\nRedone some controls\nAdded 5 new images\nRescaled ALL Images.", width / 2, 140);
    }
}

function overFolder() //Hitbox function
{
    return showingFolder &&
    mouseX > width / 2 - folder.width / 2 &&
    mouseX < width / 2 + folder.width / 2 &&
    mouseY > height / 2 + bob - folder.height / 2 &&
    mouseY < height / 2 + bob + folder.height / 2;
}
  if (showingFolder)
    {
        if (overFolder())          // only opens if the click lands on the folder
        {
            showingFolder = false;
            openSound.currentTime = 0;
            openSound.play();
        }
    }
  else if (!manualPending)
    {
        manualPending = true;
        nextChange = millis() + slideTime;
    }

function mousePressed() {
startSteam();
if (showingFolder)
    {
        if (overFolder())          // only opens if the click lands on the folder
        {
            showingFolder = false;
            openSound.currentTime = 0;
            openSound.play();
        }
    }
  else if (!manualPending)         // ignores clicks while a slide-out is running
    {
        manualPending = true;
        nextChange = millis() + slideTime;
    }
}

function keyPressed() {
  startSteam();

  if (key === "b" || key === "B")
    {
        showInstructions = true;
    }
  else if (key === "Shift")
    {
    // toggle's auto-cycle on and off
    autoCycle = !autoCycle;
    if (autoCycle)
    {
            showingFolder = false;
            nextChange = millis() + random(2000, 4000); //radomizes the pictures shown when timer runs out
            lastChange = -10000;   // so no slide-in plays when you first press Shift
            nextChange = millis() + random(2000, 4000);
    }
    }
    
    else if (key === " ")
    {
    if (!showingFolder)
        {
            showingFolder = true;
            autoCycle = false;
            closeSound.currentTime = 0;
            closeSound.play();
    }
  }
  else if (!showingFolder)
  {
      let k = key.toLowerCase();   // "H" and "h" both become "h"

      if (k === "h") playK4(0);    // whistle
      if (k === "n") playK4(1);    // bell
      if (k === "c") playK4(2);    // chug
      if (k === "s") playK4(3);    // coupling
  }
}

// choose a random picture, but never the same one twice in a row.
function pickNext()
{
    let n;
    do
    {
        n = floor(random(pictures.length));
    }
    
    while (n === next && pictures.length > 1);
    next = n;
}

function startSteam() {
    if (!steamStarted) 
    {
        steam.play();
        steamStarted = true;
    }
}

function keyReleased() {
  if (key === "b" || key === "B")
    {
        showInstructions = false;
    }
}

function playK4(i) //K4 Sounds for the above code
{
    K4sounds[i].currentTime = 0;
    K4sounds[i].play();
}

function drawScaled(img, x, y) //the "Image scaler" system
{
    let maxW = width * 0.5;    // biggest allowed width: half the canvas (500)
    let maxH = height * 0.5;   // biggest allowed height: half the canvas (300)

    // how much to shrink so it fits in the box; the 1 stands for "never enlarge"
    let s = min(maxW / img.width, maxH / img.height, 1);

    image(img, x, y, img.width * s, img.height * s);
}
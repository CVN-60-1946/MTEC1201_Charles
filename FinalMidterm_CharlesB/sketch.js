// Charles B.
//10/21/26
// Title: K4 Pacific Locomotive MIDTERM
//Just a simple bunch of pictures of the K4 Pacific of the PRR that you can cyle through, I didn't really know what to add for a timer system to work, so i just didn't add one.
//CONTROLS: CLICK once to open 1 picture, then press SPACE to close the Picture, then CLICK again to open another.
//NEW CONTROLS (ADD-ONS): Press Shift to automatically shift between the slides, Press H to hear random K4 Sounds.

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
  
  // autoCycle variable will switch to a random picture every few seconds
    if (autoCycle && millis() > nextChange)
    {
        pickNext();
        openSound.currentTime = 0;
        openSound.play();
        inDirection = -slideDirection;     // new picture enters from the side the old one left
        slideDirection = random([1, -1]);  // pick the exit side for the next swap
        lastChange = millis();
        nextChange = millis() + random(2000, 4000);
    }
    
    let slideOffset = 0;
    
    if (autoCycle)
    {
        let untilChange = nextChange - millis();
        let sinceChange = millis() - lastChange;

        if (untilChange < slideTime)
            slideOffset = slideDirection * (1 - untilChange / slideTime) * width;  // sliding out
        else if (sinceChange < slideTime)
            slideOffset = inDirection * (1 - sinceChange / slideTime) * width;     // sliding in
    }

    if (showingFolder)
    {
        image(folder, width / 2, height / 2);
    }
  
    else
    {
        image(pictures[next], width / 2 + slideOffset, height / 2);
        //It's basically saying "if your showing the folder, show the placeholder_folder and show that text"
        //Otherwise, go to the next picture.
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
        textSize(20);
        text("CLICK = open a picture\nSPACE = close the picture\nSHIFT = auto-cycle on/off\nH = random K4 sound", width / 2, 140);
    }
}

function mousePressed() {
  if (showingFolder)
    {
        // go from the placeholder_folder to the K4 Picture once you click.
        startSteam(); //starts steam sounds upon clicking
        pickNext();
        showingFolder = false;
        openSound.currentTime = 0; //restarts the audio file from the beginning, only plays when something happens because of the "if" statement.
        openSound.play();
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
  else if (!showingFolder && (key === "h" || key === "H"))
  {
      // H key while a picture is showing: play random K4 sound
      let s = random(K4sounds);
      s.playbackRate = random(0.8, 1.2);
      s.currentTime = 0;
      s.play();
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
// Charles B.
// 10/7/26 - 10/14/26
// Title: K4 Pacific Locomotive Examination
//Just a simple bunch of pictures of the K4 Pacific of the PRR that you can cyle through, I didn't really know what to add for a timer system to work, so i just didn't add one.
//CONTROLS: CLICK once to open 1 picture, then press SPACE to close the Picture, then CLICK again to open another.
//NEW CONTROLS (ADD-ONS): Press Shift to automatically shift between the slides, Press H to hear random K4 Sounds

//This is the Updated form of Homework 4, since i don't know how to rename files in Github, this is my Midterm Assignment where i add onto an existing project.

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

    textSize(20);

    openSound = new Audio("assets/page_open.mp3"); //loads the MP3 file from Assets, and ".play()" plays the audio.
    closeSound = new Audio("assets/folder_close.mp3"); 
    //obtained audio from here: https://pixabay.com/sound-effects/search/page-turn/

    K4sounds[0] = new Audio("assets/k4_whistle.mp3"); //couldn't find a K4 Whistle (that didn't require me to pay 3k+, so i asked an AI to make one for me)
    K4sounds[1] = new Audio("assets/k4_bell.mp3");
    K4sounds[2] = new Audio("assets/k4_chug.mp3");

    steam = new Audio("assets/steam_hiss.mp3");
    steam.loop = true;   // repeats forever
    steam.volume = 0.3;  // 0 to 1, keeps it in the background
}

function draw() {
  background(50, 50, 50);
  fill(0);
  
  // autoCycle variable will switch to a random picture every few seconds
    if (autoCycle && millis() > nextChange)
    {
        pickNext();
        openSound.currentTime = 0;
        openSound.play();
        nextChange = millis() + random(2000, 4000);
    }

    if (showingFolder)
    {
        image(folder, width / 2, height / 2);
        text("Click to open a picture, SPACE = close, Click to open another. SHIFT = Auto cycle, H = K4 Sounds", width / 2, height / 9);
    }
  
    else
    {
        image(pictures[next], width / 2, height / 2);
        //It's basically saying "if your showing the folder, show the placeholder_folder and show that text"
        //Otherwise, go to the next picture.
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

  if (key === "Shift")
    {
    // toggle's auto-cycle on and off
    autoCycle = !autoCycle;
    if (autoCycle)
        {
            showingFolder = false;
            nextChange = millis() + random(2000, 4000); //radomizes the pictures shown when timer runs out
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
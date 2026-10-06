// Charles B.
//Just a simple bunch of pictures of the K4 Pacific of the PRR that you can cyle through.
//CONTROLS: CLICK once to open 1 picture, then press SPACE to close the Picture, then CLICK again to open another.


let folder;
let pictures = []; //the brackets are like holding cells for the numbers assigned to the pictures, learned that through YT and some classic "f'ing around and finding out"
//^ Best part is that it is super easy to expand
let showingFolder = true; // true = show the placeholder folder, false = show a picture instead of the folder
let next = 0;             // which picture will pull up on the next click.
let openSound; //the sound of the opening of the file
let closeSound; //the sound of the closing of the file

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

    textSize(20);

    openSound = new Audio("assets/page_open.mp3"); //loads the MP3 file from Assets, and ".play()" plays the audio.
    closeSound = new Audio("assets/folder_close.mp3"); 
    //obtained audio from here: https://pixabay.com/sound-effects/search/page-turn/
}

function draw() {
  background(105, 105, 105);
  fill(0);

    if (showingFolder)
    {
        image(folder, width / 2, height / 2);
        text("Let's what's inside. (Click to open a picture from Folder, press SPACE to close it, and click to select another)...", width / 2, height / 9);
    }
  
    else
    {
        image(pictures[next], width / 2, height / 2);
        //It's basically saying "if your showing the folder, show the placeholder_folder and show that text"
        //Otherwise, go to the next picture and
        text("So these are what an American K4 Pacific looks like...", width / 2, height / 10);
  }
}

function mousePressed() {
  if (showingFolder)
    {
        // go from the placeholder_folder to the K4 Picture once you click.
        showingFolder = false;
        openSound.currentTime = 0; //restarts the audio file from the beginning, only plays when something happens because of the "if" statement.
        openSound.play();
    }
}

function keyPressed() {
  if (key === " " && !showingFolder)// go back to the folder when you press "SPACEBAR", and line up the next picture.
    {  
        showingFolder = true;
        next = (next + 1) % pictures.length; //I asked AI for help with this particular part since i couldn't get it to work properly, All it does is make [next] wrap back to 0 after the final pic.
        closeSound.currentTime = 0;
        closeSound.play();
    }
}
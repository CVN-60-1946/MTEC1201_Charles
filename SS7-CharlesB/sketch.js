// Charles B - SS7
// 11/18/26 - Cats. Just-all over the place.
// I like cats, no other context us needed.

let nekos = [];  //object array
nekos.length = 40
let neko1; //variable for storing objects
let neko2;

function setup() {
    createCanvas(600, 600);
    //init. objects in setup by calling constructor

    for(let i = 0; i < nekos.length; i++)
    {
        nekos[i] = new NekoFace(random(width), random(-200, height + 200), 65) 
    }
}

function draw()
{
    background(200);
    
    for(let i = 0; i < nekos.length; i++)
    {
        nekos[i].display();
        nekos[i].fall();
        nekos[i].grow();

    }

}

class NekoFace {
    constructor(tempx, tempy, tempdiameter)//like the setup function but it's in class. tempR, tempG, tempB
    {
        this.x = tempx
        this.y = tempy
        this.diameter = tempdiameter
    }

    display() //method
    {
        triangle(this.x, this.y, this.x+25, this.y, this.x+25, this.y+100);
        ellipse(this.x+25, this.y, this.diameter, this.r, this.g, this.b);
    }

    fall() //method
    {
        if(this.y>height+100)
        {
            this.y=-100;
        }
        else
        {
            this.y++;
        }
    }

    grow()
    {
        this.diameter = constrain(this.diameter, 0, width);
    }
    if (keyIsPressed) 
		{
      if (key === '1') 
			{
        this.diameter++;
      } 
			else if (key ==='2') 
			{
        this.diameter--;
            }
        }
    }
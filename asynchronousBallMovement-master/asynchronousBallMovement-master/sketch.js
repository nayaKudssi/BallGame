var ball;
var database;
var positions;

function setup()
{
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPositionRef = database.ref('ball/positions');
    ballPositionRef.on("value",readPosition);
}

function draw()
{
    background("white");

    if(keyDown(LEFT_ARROW))
    {
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW))
    {
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW))
    {
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW))
    {
      writePosition(0,+1);
    }

    drawSprites();
}

function writePosition(x,y)
{
  database.ref('ball/positions').set(
  {x:positions.x+x, y:positions.y+y})
}

function readPosition(data)
{
  positions = data.val();
  ball.x = positions.x;
  ball.y = positions.y;
}

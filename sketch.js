var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberI, climberGroup;
var ghost, ghostImage;
var invisibleBlock, blockGroup;
var spookySound;
var gameState = "PLAY";

function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png")
  climberI = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 3;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.4;
  
  spookySound.loop();
  
  climberGroup = new Group();
  doorGroup = new Group();
  blockGroup = new Group();
}

function draw() {
   background(0);
  
  if(gameState === "PLAY"){
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x -3;
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x +3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
                      
  ghost.velocityY = ghost.velocityY +0.8;
  
  if(blockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "END";
  }
  
  
  spawnDoors();
  
  drawSprites();
  }
  if(gameState === "END"){
    stroke("yellow");
    fill("yellow");
    textSize(20);
    text("GAME OVER", 230,250);
  }
}

function spawnDoors() {
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    climber = createSprite(200,10);
    door.addImage(doorImage);
    climber.addImage(climberI);
    door.velocityY = 3;
    climber.velocityY = 3;
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    door.lifetime = 800;
    climber.lifetime = 800;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 3;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    blockGroup.add(invisibleBlock);
  }
}
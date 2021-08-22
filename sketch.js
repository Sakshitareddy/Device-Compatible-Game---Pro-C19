var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 8;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  //if(gameState===PLAY){
  //background(0);
  //boy.x = World.mouseX;
  
  //edges= createEdgeSprites();
  //boy.collide(edges);
  
  //code to reset the background
  //if(path.y > 400 ){
    //path.y = height/2;
  //}
  
    //createCash();
    //createDiamonds();
    //createJwellery();
    //createSword();

    //if (cashG.isTouching(boy)) {
      //cashG.destroyEach();
      //treasureCollection=treasureCollection+50;
    //}
    //else if (diamondsG.isTouching(boy)) {
      //diamondsG.destroyEach();
      //treasureCollection=treasureCollection+100;
      
    //}else if(jwelleryG.isTouching(boy)) {
      //jwelleryG.destroyEach();
      //treasureCollection=treasureCollection+150;
      
    //}else{
      //if(swordGroup.isTouching(boy)) {
        
      //setting game state to end
      //gameState=END;

      //changing boy's animation to game over
      //boy.addAnimation("SahilRunning", endImg);
      //boy.scale = 0.9;
      //boy.x=200;
      //boy.y=300;

      //destroying cash group
      //cashG.destroyEach();
      //cashG.setVelocityYEach(0);
     
      //destorying diamond group
      //diamondsG.destroyEach();
      //diamondsG.setVelocityYEach(0);

      //destorying jwellery group
      //jwelleryG.destroyEach();
      //jwelleryG.setVelocityYEach(0);

      //destorying sword group
      //swordGroup.destroyEach();
      //swordGroup.setVelocityYEach(0);

    //}
  //}
  
  //drawSprites();
  //textSize(20);
  //fill(255);
  //text("Treasure: "+ treasureCollection,150,30);
  //}

  //OR OR OR OR 

   if(gameState===PLAY){
    background(0);
    boy.x = World.mouseX;
    
    edges= createEdgeSprites();
    boy.collide(edges);
    
    //code to reset the background
    if(path.y > height){
      path.y = height/2;
    }
    
      createCash();
      createDiamonds();
      createJwellery();
      createSword();
  
      if (cashG.isTouching(boy)) {
        cashG.destroyEach();
        treasureCollection=treasureCollection+50;

        //speeding the path to look like boy is getting more energy
        path.velocityY = path.velocityY + 2;

      }
      else if (diamondsG.isTouching(boy)) {
        diamondsG.destroyEach();
        treasureCollection=treasureCollection+100;

        //speeding the path to look like boy is getting more energy
        path.velocityY = path.velocityY + 3;
        
      }else if(jwelleryG.isTouching(boy)) {
        jwelleryG.destroyEach();
        treasureCollection=treasureCollection+150;

        //speeding the path to look like boy is getting more energy
        path.velocityY = path.velocityY + 4;
        
      }else{
        if(swordGroup.isTouching(boy)) {  
        //setting game state to end
        gameState=END;

      }
    }
    

  } else if (gameState===END){
      //changing boy's animation to game over
      boy.addAnimation("SahilRunning", endImg);
      boy.scale = boy.scale + 0.01;
      boy.x=width/2;
      boy.y=height/2;

      //stopping the game over animation from growing
      if(boy.scale >= 0.9) {
        boy.scale = 0.9;
      }

      //destroying cash group
      cashG.destroyEach();
      cashG.setVelocityYEach(0);
     
      //destorying diamond group
      diamondsG.destroyEach();
      diamondsG.setVelocityYEach(0);

      //destorying jwellery group
      jwelleryG.destroyEach();
      jwelleryG.setVelocityYEach(0);

      //destorying sword group
      swordGroup.destroyEach();
      swordGroup.setVelocityYEach(0);

      //stopping the path from moving
      path.velocityY = 0;

      
      
  }

  //if space is pressed, game is resetted
  if (keyWentDown("space") && touches.length > 0) {
    //resetting treasure score
    treasureCollection=0;

    gameState=PLAY;

    touches = [ ];

    //changing animation of boy & resetting the boy
    boy.addAnimation("SahilRunning", boyImg);
    boy.scale = 0.08;
    boy.x = 200;
    boy.y = 530;
    
    //moving path
    path.velocityY = 4;

  }

  

  drawSprites();
  
  //side texts in game
  var select_text = Math.round(random(1,3));

  textSize(width/50);
  fill(0);

  if (World.frameCount % 100 == 0 && gameState == PLAY) { 
    switch(select_text){
      case 1: text("Collect the treasures",300,300);
      break;
      case 2: text("Avoid the swords",300,300);
      break;
      case 3: text("To win, score to 500",300,300);
      break;
      default: break;
  } 
}

  textSize(20);
  fill(0);
  text("Treasure: "+ treasureCollection,width/1.2,30);
  //game over text to reset game
  textSize(15);
  text("Press Space To Reset Game",width/1.25,50);
  textSize(20);
  text("Welcome to the Treasure Collecting Game!",width/20,50);

  if (treasureCollection >= 500) {

    gameState=END;

    textSize(50);
    text("YOU WIN!",width/2.5,height/1.5);

  } 

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.rotationSpeed = 3;
  cash.velocityY = 8;
  cash.lifetime = height-50;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.rotationSpeed = 3;
  diamonds.velocityY = 8;
  diamonds.lifetime =height-50;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.rotationSpeed = 4;
  jwellery.velocityY = 8;
  jwellery.lifetime = height-50;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.rotationSpeed = 5;
  sword.velocityY = 8;
  sword.lifetime = height-50;
  swordGroup.add(sword);
  }
}
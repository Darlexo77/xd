var ball, ballImage,win,lose;
var score = 0;
var lives = 3;
// En la clase 29

var gamestate = "serve";


var paddle;
// En la clase 28
var alienGroup;
var edges;
var blueImage, greenImage, redImage, yellowImage, paddleImage, bgImage,winImage,loseImage,rebote,musica,fall,paddleS,bordes,winS,winM,loseM,loseS,themeS,encendido;


function preload(){
    ballImage= loadImage("./ball.png")
    blueImage= loadImage("./blue.png")
    greenImage= loadImage("./green.png")
    yellowImage= loadImage("./yellow.png")
    redImage= loadImage("./red.png")
    paddleImage=loadImage("Spaceship.png")
    bgImage=loadImage("bg.jpg")
    winImage=loadImage("win.png")
    loseImage=loadImage("lose.png");
    rebote=loadSound("rebote.mp3");
    musica=loadSound("fondo.mp3");
    fall=loadSound("fall.mp3")
    paddleS=loadSound("paddle.mp3");
    bordes=loadSound("borde.mp3");
    winS=loadSound("winS.mp3");
    winM=loadSound("winM.mp3");
    loseM=loadSound("loseM.mp3")
    loseS=loadSound("loses.mp3")
    themeS=loadSound("wait.mp3");
    encendido=1
}   

// Esto se ejecutará una vez al inicio
function setup() {
    createCanvas(700, 625);
    ball = createSprite(340,400,10,10);
    ball.addImage("ball",ballImage);
    ball.scale=0.075;
    paddle = createSprite(340, 600, 120, 10);
    paddle.shapeColor = "blue";
    paddle.addImage("paddle",paddleImage)
    paddle.scale=0.1
     win = createSprite(340,12000,680,680);
    win.addImage("win",winImage)
    win.scale=2
    
     
    
    edges=createEdgeSprites();
    
    // Línea 36 en la clase 28
    alienGroup = createGroup();
    createAlienRow(100, redImage);
    createAlienRow(100+65, blueImage);
    createAlienRow(100+65+65, yellowImage);
    createAlienRow(100+65+65+65, greenImage);
   
    themeS.setVolume(0.125)
    themeS.play();
   
}


// Esto se ejecutará varias veces
function draw() {
  background(bgImage);
 textSize(30);
    fill("black")
    
sonidos();
    // Clase 28
  text("Puntuación: "+score,10,30);
  text("Vidas: "+lives, 10, 60);
    
    fill("black")
// Clase 29
  if(gamestate=="play") {
        alienGroup.setVelocityYEach(0.15);
    }else {
        alienGroup.setVelocityYEach(0.0);
        
    }
    if(gamestate == "serve"){
     paddle.x=340
    text("Presiona la barra espacio para iniciar el juego Bv.",10,350);
    ball.velocityX =0;
    ball.velocityY =0;
    ball.x = 340;
    ball.y = 550;
    
    if(keyDown("space")){
          
      ball.velocityX = 6;
      ball.velocityY = 6;
      if(musica.isPlaying()){
        themeS.setVolume(0)
      }else{
       musica.setVolume(0.12)
        musica.play();
        themeS.setVolume(0)
      }
      

// Clase 29
      if(gamestate == "serve"){
        gamestate = "play";
        ball.velocityY = -7;
        ball.velocityX = -7;
       
      }
      }
  }
  else if(gamestate =="end") {
    if(lives==0){
        lose.y=340;
        

        alienGroup.y=1000
         }else
        
      text("Perdiste pero no te preocupes intentalo de nuevo", 30, 370);
    ball.remove;
      paddle.x=340;
  }
  else {
    gameplay();
  }
     
  drawSprites();
}

// Clase 27
function createAlienRow(y, alienImage) {
    var x =125
  for(var c=0; c<6; c++)
  {
    var alien = createSprite(x,y,50, 25);
     x+= alien.width + 40;
    alien.addImage("coloralien",alienImage);
    alien.scale=0.099;
    alienGroup.add(alien);
  }
    lose = createSprite(340,12000,680,680);
    lose.addImage("lose",loseImage)
    lose.scale=2
    win = createSprite(340,12000,680,680)
    win.addImage("win",winImage)
    win.scale=2
    
}


// Clase 28
function alienHit(ball, alienGroup) {
 alienGroup.remove();
 score = score+5;
    rebote.play();
    rebote.setVolume(0.2);
}

// Clase 29

// Clase 28
function gameplay(){
  //paddle.x = World.mouseX;
 //paddle.x = ball.x; //automatización
        if (keyIsDown(LEFT_ARROW)) {
            paddle.x=paddle.x-10;
        }
     if (keyIsDown(RIGHT_ARROW)) {
         paddle.x=paddle.x+10;
     }
   if(paddle.isTouching(alienGroup)){
       lives =0
        
       lifeover(); 
        //alienGroup.remove();
       Text("Has perdido,pero no te preocupes vuelve a intentar",10,230);
  
   }
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 650)
  {
    paddle.x = 650;
  }
  //rotation = rotation + 5;
 ball.bounceOff(edges[0]);
 ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  //ball.bounceOff(paddle);
  ball.bounceOff(alienGroup, alienHit);
  ball.bounceOff(paddle)
// Clase 29
  if(score==120)
  {
    if(encendido==1){
    ganada();
    } 
   encendido=2
     
      
  };
  if(ball.isTouching(edges[3])) {
    lifeover();
  }
}

function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gamestate = "serve";
  }
  else {
    gamestate = "end";
     musica.setVolume(0);
    loseM.setVolume(0.125)
    loseS.play();
    loseM.play();
  }

}

function alienRemove(alienGroup){
    
}

function sonidos(){
  if(ball.isTouching(edges[3])){

    fall.play();
fall.setVolume(0.125);
  }

  if(ball.isTouching(paddle)){
    paddleS.play();
    paddleS.setVolume(0.2);
      }
      if(ball.isTouching(edges[0])){
       bordes.setVolume(0.2)     
        bordes.play();
      }
      if(ball.isTouching(edges[1])){
        bordes.setVolume(0.2)     
         bordes.play();
       }
       if(ball.isTouching(edges[2])){
        bordes.setVolume(0.2)     
         bordes.play();
       }
      
       
       
       
}
function ganada () {
   
    ball.velocityX = 0;
    ball.velocityY = 0;
      win.y=340;
      ball.x=340
      ball.y=300
      paddle.x=340
      paddle.y=340
      musica.stop();
      winM.setVolume(0.125)
      musica.setVolume(0) 
  winS.play();
  winM.play();

   } 
  

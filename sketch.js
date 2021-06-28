//Create variables here
var dog, sadDog, hapyDog,
    bedroomImg, gardenImg, washroomImg, livingRoomImg,
    foodObj, foodImg;
var database ,
    foodS, foodStock,
    fedTime, lastFed,currentTime,
    readState,gameState;
var Bath, Sleep, Play, playInGarden; 
var feed, addFood, foodObj;

function preload(){
	//load images here
  sadDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/Happy.png");

  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  livingRoomImg = loadImage("images/Living Room.png")

  foodImg = loadImage("images/milk.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();

  foodStock = database.ref('food/stockLeft');
  foodStock.on("value",  function(data){
    foodS=data.val();
  })

  fedTime = database.ref('food/feedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })

  readState = database.ref('food/gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })
  
  dog = createSprite(400,350,20,20);
  dog.addImage("abc" , sadDog);
  dog.scale = 0.235;

  foodObj = new Food();

  feed = createButton("Feed The Dog");
  feed.position(530,130);
  
  addFood = createButton("Add Food");
  addFood.position(630,130);
  
}

function draw() { 
  background(46,139,87);

  currentTime = hour();

  if(currentTime===lastFed){
    update("Playing");
    foodObj.garden();
 }else if(currentTime===lastFed+2){
  update("Sleeping");
    foodObj.bedroom();
 }else if(currentTime>lastFed+2 && currentTime<=lastFed+4){
  update("Bathing");
    foodObj.washroom();
 }else{
  update("Hungry")
  foodObj.display();
 }

 if(gameState === 1){
   dog.addImage(happyDog);
   dog.scale = 0.175;
   dog.y = 250
 }
 
 if(gameState === 2){
   dog.addImage(sadDog);
   dog.scale = 0.175;
   dog.y=250;
   //milkBottle2.visible=true
 } 

 Bath = createButton("I Want To Take Bath");
 Bath.position(400,150);
 if(Bath.mousePressed(function(){
   gameState = 3;
   update(gameState);
 }))
if(gameState === 3){
  foodObj.washroom();
   //milkBottle2.visible = false;
}


Sleep = createButton("I Am Very Sleepy");
Sleep.position(605,150);
if(Sleep.mousePressed(function(){
  gameState=4;
  update(gameState);
}))
if(gameState === 4){
  foodObj.bedroom();
//milkBottle2.visible=false;
}

Play = createButton("Lets Play !");
Play.position(530,150);
if(Play.mousePressed(function(){
  gameState = 5;
  update(gameState);
}))
if(gameState === 5){
  foodObj.livingRoom();
  //milkBottle2.visible = false;
}

playInGarden = createButton("Lets Play In Park");
playInGarden.position(720,150);
if(playInGarden.mousePressed(function(){
  gameState = 6;
  update(gameState);
}))
if(gameState === 6){
  foodObj.garden();
  //milkBottle2.visible = false;
}

 feed.mousePressed(feedDog);
 addFood.mousePressed(addFoods)

  if(foodS<=0){
    foodS = 0;
  }

  if(currentTime>12){
    currentTime -= 12;
  }

  if(foodS===0 && feed.mousePressed()){
    fill(255,255,254)
    textSize(20)
    text("Stock is Over. Please Add the food to feed the Dog",20,30)    
  }

  if(lastFed >= 13){
    lastFed = 1; 
  }

  drawSprites();
}

function enterDogName(){
        var greeting = createElement('h2');
        greeting.position(600,300)

        var input = createInput('Write Your Name Here');
        input.position(500,200);

        var button = createButton('Confirm');
        button.position(700,220);
        
        button.mousePressed(function(){
            input.hide();
            button.hide();

            var name = input.value();
            greeting.html('HELLO '+ name);

        })
}

function feedDog(){
    foodS -=1;
    lastFed +=1;
    writeStock();
    dog.addImage("abc", happyDog)
}

function addFoods(){
    foodS += 1;
    writeStock();
}

function writeStock(){
  foodObj.updateFoodStock(foodS)
  database.ref('/').update({
    'stockLeft' : foodS,
    'fedTime' : currentTime,
    'gameState' : gameState
  })
}

function update(state){
  database.ref('/').update({
    'gameState': state
  })
}


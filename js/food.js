class Food{
    constructor(){
        this.foodS = foodS;
    }

    updateFoodStock(foodS){
        this.foodS = foodS;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    deductFood(){
        if(this.foodS>0){
            this.foodS-=1;
        }
    }

    getfoodStock(){
        return this.foodS;
    }   

    display(){

        fill(0);
        textSize(15);
        
        if(lastFed>=12){
           text("Last Fed : "+lastFed/12 + " PM", 350,20)
        } else if(lastFed===0){
           text("Last Fed : 12 AM",350,20)
        } else{
           text("Last Fed : "+lastFed+" AM",350,20);
                }

        var x=10,y=200;
        imageMode(CENTER);

        if(this.foodS!=0){

            for(var i =0;i<this.foodS;i++){

                if(i%10===0){
                    x=30;
                    y+=50
                }

                image(foodImg,x,y,90,100)
                x+=30;
            }}}

    bedroom(){
        background(bedroomImg)
    }

    washroom(){
        background(washroomImg)
    }

    garden(){
        background(gardenImg)
    }

    livingRoom(){
        background(livingRoomImg)
    }

    enterDogName(){
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
    
}
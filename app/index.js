import document from "document";
import * as fs from "fs";
import clock from "clock";
import { zeroPad, } from "../common/utils"; // import user function zeroPad (see lines 38, 40, 41)
import { me as appbit } from "appbit";
import { today } from "user-activity";


let image = document.getElementById('image');
let hungerLabel = document.getElementById('hunger');
let healthLabel = document.getElementById('health');
let walletLabel = document.getElementById('wallet');


var lastSaveTime;
var currentAnimation = 'sit';
var animationFrame = 1;
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//initial game start data.
var saveState = {
    "data": {
        "hunger": 100,
        "wallet": 0,
        "happiness": 100,
        "timeStamp": new Date()
    }
};

//check how many steps the user has taken.
if (appbit.permissions.granted("access_activity")) {
    //update the user's wallet with steps.
    saveState.data.wallet += today.adjusted.steps;
    
};

//check if there is saved data.
if (fs.existsSync("/private/data/save.txt")) {
    //load any saved data to variables.
    saveState = fs.readFileSync("save.txt", "json");
    console.log("saved data: Hunger:" + saveState.data.hunger + ", Wallet:" + saveState.data.wallet + ", Happiness:" + saveState.data.happiness + ", TimeStamp:" + saveState.data.timeStamp);
    
    
    console.log("time since last save " + checkDate(new Date(saveState.data.timeStamp))*-1 +" Min");
}
//if there is no saved data. We must start a new game.
else {
    console.log("no saved data found. creating new game.")
    fs.writeFileSync("save.txt", saveState, "json");
}


clock.granularity = "seconds"; // seconds, minutes, hours

//animate the pet.
setInterval(swapImageAnimator, 500);

//happens when the clock ticks every second.
clock.addEventListener("tick", (evt) => {

    

    hungerLabel.text = "Hunger:"+saveState.data.hunger;
    healthLabel.text = "Health:"+saveState.data.happiness;
    walletLabel.text = "Wallet:"+saveState.data.wallet;

    // represents how many minutes have passed since the last save.
    lastSaveTime = checkDate(new Date(saveState.data.timeStamp))*-1;


    //every 30 min the pet looses 1 hunger.
    if(lastSaveTime >= 30){
        saveState.data.hunger -= 1;
        //update the current save state time.
        saveState.data.timeStamp = new Date();
        //update current save state.
        fs.writeFileSync("save.txt", saveState, "json");

    }
    console.log("time since last save " + lastSaveTime +" Min");
    
    

    
   
});

function checkDate(date){
    var today = new Date();
    var lastDate = date;
    var diffMs = (lastDate- today); // milliseconds between now & Christmas
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    //var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    return diffMins;
}
function swapImageAnimator() {

    switch (currentAnimation) {
        case 'sit':

            sitAnimation();
            break;
        case 'sleep':
            //sleepAnimation();
            break;
        case 'eat':
            //eatAnimation();
            break;
    }
}


function sitAnimation() {


    switch (animationFrame) {
        case 1:
            image.href = "../resources/petImages/tile000.png";
            animationFrame = 2;
            break;
        case 2:
            image.href = "../resources/petImages/tile001.png";
            animationFrame = 3;
            break;
        case 3:
            image.href = "../resources/petImages/tile002.png";
            animationFrame = 1;
            break;


    }
}



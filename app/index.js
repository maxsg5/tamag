import document from "document";
import * as fs from "fs";
import clock from "clock";
import { zeroPad, } from "../common/utils"; // import user function zeroPad (see lines 38, 40, 41)
import { me as appbit } from "appbit";
import { today } from "user-activity";
import { minuteHistory } from "user-activity";

// // Disable app timeout
if (appbit.appTimeoutEnabled) {
    console.log("Timeout is enabled");
}

//appbit.appTimeoutEnabled = false; // Disable timeout

let myButton = document.getElementById("myButton");
let image = document.getElementById('image');
let hungerLabel = document.getElementById('hunger');
let healthLabel = document.getElementById('health');
let walletLabel = document.getElementById('wallet');
let btnLabel = document.getElementById('btnLbl');

var lastSaveTime;

var currentAnimation = 'sit';
var animationSpeed = 200;
var animationFrame = 1;
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//initial game start data.
var saveState = {
    "data": {
        "hunger": 0,
        "wallet": 0,
        "health": 1,
        "timeStamp": new Date(),
        "dieLoop": 0
    }
};
btnLabel.text = "play";
//check how many steps the user has taken.
if (appbit.permissions.granted("access_activity")) {
    //update the user's wallet with steps.
    saveState.data.wallet += today.adjusted.steps;
    //console.log(minuteHistory[0]);

};

//check if there is saved data.
if (fs.existsSync("/private/data/save.txt")) {
    //load any saved data to variables.
    saveState = fs.readFileSync("save.txt", "json");
    console.log("saved data: Hunger:" + saveState.data.hunger + ", Wallet:" + saveState.data.wallet + ", health:" + saveState.data.health + ", TimeStamp:" + saveState.data.timeStamp);


    console.log("time since last save " + checkDate(new Date(saveState.data.timeStamp)) * -1 + " Min");
}
//if there is no saved data. We must start a new game.
else {
    console.log("no saved data found. creating new game.")
    fs.writeFileSync("save.txt", saveState, "json");
}


clock.granularity = "seconds"; // seconds, minutes, hours

//animate the pet.
setInterval(swapImageAnimator, animationSpeed);
myButton.addEventListener("mousemove", (evt) => {
    console.log(`Mouse moved - x: ${evt.screenX}, y: ${evt.screenY}`);
  });
//happens when the clock ticks every second.
clock.addEventListener("tick", (evt) => {



    hungerLabel.text = "Hunger:" + saveState.data.hunger;
    healthLabel.text = "Health:" + saveState.data.health;
    walletLabel.text = "Wallet:" + saveState.data.wallet;

    // represents how many minutes have passed since the last save.
    lastSaveTime = checkDate(new Date(saveState.data.timeStamp)) * -1;


    //every 30 min the pet looses 1 hunger.
    if (lastSaveTime >= 30) {
        saveState.data.hunger -= 1;
        //update the current save state time.
        saveState.data.timeStamp = new Date();
        //update current save state.
        fs.writeFileSync("save.txt", saveState, "json");

    }

    //every 30 min the pet looses 1 hunger.
    if (lastSaveTime >= 3000) {
        saveState.data.hunger = 0;
        //update the current save state time.
        saveState.data.timeStamp = new Date();
        //update current save state.
        fs.writeFileSync("save.txt", saveState, "json");

    }

    if( saveState.data.health <= 0){
        currentAnimation = 'dead';
        return;
    }

    //if pet runs out of hunger health drops every min
    if (saveState.data.hunger <= 0) {
        
        if (saveState.data.dieLoop === 0) {
            saveState.data.dieLoop = new Date();
            //update the current save state time.
            saveState.data.timeStamp = new Date();
            //update current save state.
            fs.writeFileSync("save.txt", saveState, "json");
        }
        let dieLoopTime = checkDate(saveState.data.dieLoop) * -1;
        console.log(dieLoopTime);
        console.log(saveState.data.dieLoop);

        if (dieLoopTime >= 1) {
            saveState.data.dieLoop = new Date();

            console.log('ouch');

            saveState.data.health -= 1

            //saveState.data.timeStamp = new Date();
            //update current save state.
            fs.writeFileSync("save.txt", saveState, "json");
        }
        //currentAnimation = 'dead';
    }
    console.log("time since last save " + lastSaveTime + " Min");





});

function checkDate(date) {
    var today = new Date();
    var lastDate = date;
    var diffMs = (lastDate - today); // milliseconds between now & Christmas
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
        case 'dead':
            deadAnimation();
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

function deadAnimation() {


    switch (animationFrame) {
        case 1:
            image.href = "../resources/petImages/dead.png";
            image.width = 250;
            image.height = 150;
            image.x = 45;
            image.y = 120;
            animationFrame = 2;
            break;
        case 2:
            //image.href = "../resources/petImages/tile001.png";
            image.y = image.y - 5;
            animationFrame = 3;
            break;
        case 3:
            //image.href = "../resources/petImages/tile002.png";
            image.y = image.y + 5;
            animationFrame = 1;
            break;


    }
}



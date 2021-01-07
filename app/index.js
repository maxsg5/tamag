import document from "document";
import * as fs from "fs";
import clock from "clock";
import { me as appbit } from "appbit";
import { today } from "user-activity";

import { outbox } from "file-transfer";





let image = document.getElementById('image');
let hungerLabel = document.getElementById('hunger');
let healthLabel = document.getElementById('health');
let walletLabel = document.getElementById('wallet');
let cookieLabel = document.getElementById('cookies');

let feedPetButton = document.getElementById('button-4');

var lastSaveTime;
var hungerTime;
var dieTime;
var currentAnimation = 'sit';
var animationSpeed = 200;
var animationFrame = 1;

//initial game start data.
var saveState = {
    "data": {
        "hunger": 0,
        "wallet": 0,
        "health": 100,
        "saveTimer": new Date(),
        "hungerTimer": new Date(),
        "fullTimer": null,
        "dieLoop": new Date(),
        "cookies": 10
    }
};

//check how many steps the user has taken.
if (appbit.permissions.granted("access_activity")) {
    //update the user's wallet with steps.
    saveState.data.wallet += today.adjusted.steps;
    //console.log(minuteHistory[0]);

};
// Disable app timeout
if (appbit.appTimeoutEnabled) {
    console.log("Timeout is enabled");
}
//appbit.appTimeoutEnabled = false; // Disable timeout

//check if there is saved data.
if (fs.existsSync("/private/data/save.txt")) {
    //load any saved data to variables.
    saveState = fs.readFileSync("save.txt", "json");
    console.log("saved data: Hunger:" + saveState.data.hunger + ", Wallet:" + saveState.data.wallet + ", health:" + saveState.data.health + ", TimeStamp:" + saveState.data.saveTimer);
    console.log("time since last save " + checkDate(new Date(saveState.data.saveTimer)) * -1 + " Min");
}
//if there is no saved data. We must start a new game.
else {
    console.log("no saved data found. creating new game.")
    fs.writeFileSync("save.txt", saveState, "json");
}


clock.granularity = "seconds"; // seconds, minutes, hours

//initialize UI


//animate the pet.
setInterval(swapImageAnimator, animationSpeed);

//event listeners
//button event.
feedPetButton.addEventListener("click", (evt) => {
    console.log("Feed Pet.");

    if (saveState.data.cookies > 0 && saveState.data.hunger > 0) {
        saveState.data.cookies -= 1;
        saveState.data.hunger -= 10;
        if (saveState.data.hunger < 0) {
            saveState.data.hunger = 0;
        }
    }
    else {
        console.log("out of cookies...")
    }
})
//happens when the clock ticks every second.
clock.addEventListener("tick", (evt) => {



    hungerLabel.text = "Hunger:" + saveState.data.hunger;
    healthLabel.text = "Health:" + saveState.data.health;
    walletLabel.text = "Wallet:" + saveState.data.wallet;
    cookieLabel.text = "Cookies:" + saveState.data.cookies;

    // represents how many minutes have passed since the last save.
    lastSaveTime = checkDate(new Date(saveState.data.saveTimer)) * -1;
    hungerTime = checkDate(new Date(saveState.data.hungerTimer)) * -1;
    dieTime = checkDate(new Date(saveState.data.dieLoop)) * -1;


    //if pet is not hungry rest dieLoop to zero.
    if (saveState.data.hunger > 0) {
        saveState.data.dieLoop = 0;
    }

    //hunger is 0, pet is full -> health goes up
    if (saveState.data.hunger == 0) {
        if (lastSaveTime >= 1 && saveState.data.health < 100) {
            saveState.data.health += 1;
            //update the current save state time.
            saveState.data.saveTimer = new Date();
            //update current save state.
            fs.writeFileSync("save.txt", saveState, "json");
        }
    }

    //every 30 min the pet gains 1 hunger (becomes hungrier)
    if (hungerTime >= 1 && saveState.data.hunger < 100) {
        saveState.data.hunger += 1;
        //update the current save state time.
        saveState.data.hungerTimer = new Date();


    }

    //if 3000 min past the pet is starving!
    if (lastSaveTime >= 3000) {
        saveState.data.hunger = 100;
        //update the current save state time.
        saveState.data.saveTimer = new Date();
        //update current save state.
        fs.writeFileSync("save.txt", saveState, "json");

    }

    //if the pet is dead display dead animation.
    if (saveState.data.health <= 0) {
        currentAnimation = 'dead';
        feedPetButton.style.display = "none";
        healthLabel.style.display = 'none';
        cookieLabel.style.display = 'none';
        hungerLabel.style.display = 'none';
        walletLabel.style.display = 'none';
        return;
    }

    //if pet runs out of hunger health drops every min
    if (saveState.data.hunger == 100 && dieTime >= 1) {


        saveState.data.health -= 1;
        //update the current save state time.
        saveState.data.dieLoop = new Date();

    }
    //update current save state.
    fs.writeFileSync("save.txt", saveState, "json");
    console.log("time since last hunger added " + hungerTime + " Min");
});

function checkDate(date) {
    var today = new Date();
    var lastDate = date;
    var diffMs = (lastDate - today); // milliseconds between now & last date.
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
            image.y = image.y - 5;
            animationFrame = 3;
            break;
        case 3:
            image.y = image.y + 5;
            animationFrame = 1;
            break;
    }
}

//user is closing the app.
appbit.onunload = () => {

    console.log("App is being unloaded");
    outbox
  .enqueueFile("/private/data/save.txt")
  .then(ft => {
    console.log(`Transfer of ${ft.name} successfully queued.`);
  })
  .catch(err => {
    console.log(`Failed to schedule transfer: ${err}`);
  })

}

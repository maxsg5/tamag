import document from "document";
import * as fs from "fs";
import clock from "clock";
import { me as appbit } from "appbit";
import { today } from "user-activity";
import { outbox } from "file-transfer";
import schedule from "fitbit-schedule/app"
import { next } from 'fitbit-views';


export default () => {
	//document.getElementById('some-text').text = 'Hi there :)';
	//document.getElementById('my-button').onactivate = () => next('view-2');

schedule.add({
    data: "See you in an hour...",
    due: Date.now() + 5000
})

schedule.ondue = event => {
    console.log(event.data) // See you in an hour...
}



//const myAnimation = document.getElementById("myAnimation");
//const egg = document.getElementById("egg");
//egg.animate("enable");
let pet = document.getElementById("pet");

//myAnimation.animate("enable");
//myAnimation.display = 'none';

let image = document.getElementById('image');
image.display = 'none';
let hungerLabel = document.getElementById('hunger');
let healthLabel = document.getElementById('health');
let walletLabel = document.getElementById('wallet');
let cookieLabel = document.getElementById('cookies');
let feedPetButton = document.getElementById('button-4');
let devButton = document.getElementById('button-5');
let devButton2 = document.getElementById('button-6');


let healthBar = document.getElementById('healthBar');

var lastSaveTime;
var hungerTime;
var dieTime;
var currentPet = 'shroom';
var currentAnimation = null;
var animationSpeed = 150;
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
        "cookies": 100,
        "pet": null,
        "egg": 0,
        "backgroundTask": false,
        "currentAnimation": null
    }
};

//check if there is saved data.
if (fs.existsSync("/private/data/save.txt")) {
    //load any saved data to variables.
    saveState = fs.readFileSync("save.txt", "json");
    //console.log("saved data: Hunger:" + saveState.data.hunger + ", Wallet:" + saveState.data.wallet + ", health:" + saveState.data.health + ", TimeStamp:" + saveState.data.saveTimer);
    console.log("time since last save " + checkDate(new Date(saveState.data.saveTimer)) * -1 + " Min");
}
//if there is no saved data. We must start a new game.
else {
    console.log("no saved data found. creating new game.")
    fs.writeFileSync("save.txt", saveState, "json");
}

// Disable app timeout
if (appbit.appTimeoutEnabled) {
    console.log("Timeout is enabled");
}
//appbit.appTimeoutEnabled = false; // Disable timeout




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
devButton.addEventListener("click", (evt) => {


    saveState.data.hunger = 100;
    //saveState.data.health = 0;
})
devButton2.addEventListener("click", (evt) => {


    saveState.data.hunger = 0;
    saveState.data.health = 100;
})
//happens when the clock ticks every second.
clock.addEventListener("tick", (evt) => {


    checkSteps();
    walletLabel.text = "steps:" + saveState.data.wallet;
    if (saveState.data.egg == 0) {

        feedPetButton.style.display = 'none';

        saveState.data.currentAnimation = 'egg';
        if (saveState.data.wallet >= 9000)
            saveState.data.egg = 1;
    }
    else if (saveState.data.egg == 1) {
        saveState.data.currentAnimation = 'egg1';
        if (saveState.data.wallet >= 9100)
            saveState.data.egg = 2;
    }
    else if (saveState.data.egg == 2) {
        saveState.data.currentAnimation = 'egg2';
        if (saveState.data.wallet >= 9200)
            saveState.data.egg = 3;
    }
    else if (saveState.data.egg == 3) {
        saveState.data.currentAnimation = 'egg3';
        if (saveState.data.wallet >= 9300) {
            saveState.data.egg = null;
            saveState.data.currentAnimation = 'sit';
            saveState.data.wallet = 0;
        }
    }


    else {
        cookieLabel.style.display = 'block';
        feedPetButton.style.display = 'inline';
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
    }


    //console.log("time since last hunger added " + hungerTime + " Min");
});

function checkSteps() {
    //check how many steps the user has taken.
    if (appbit.permissions.granted("access_activity")) {
        //update the user's wallet with steps.
        var stepDif = today.adjusted.steps - saveState.data.wallet;
        saveState.data.wallet += stepDif;
        //console.log(minuteHistory[0]);

    }
}

function checkDate(date) {
    var today = new Date();
    var lastDate = date;
    var diffMs = (lastDate - today); // milliseconds between now & last date.
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    //var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    return diffMins;
}
function swapImageAnimator() {

    switch (saveState.data.currentAnimation) {
        case 'egg':
            eggAnimation1();
            break;
        case 'egg1':
            eggAnimation2();
            break;
        case 'egg2':
            eggAnimation3();
            break;
        case 'egg3':
            eggAnimation4();
            break;
        case 'sit':
            if (currentPet == 'shroom')
                sitAnimationShroom();
            if (currentPet == 'dino')
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

function eggAnimation1() {
    switch (animationFrame) {
        case 1:
            image.href = "../resources/eggImages/purpleEgg/sprite_0.png";
            animationFrame = 2;
            break;
        case 2:
            image.y = image.y + 5;

            animationFrame = 3;
            break;
        case 3:
            image.y = image.y - 5;
            animationFrame = 1;
            break;
    }
}
function eggAnimation2() {
    switch (animationFrame) {
        case 1:
            image.href = "../resources/eggImages/purpleEgg/sprite_1.png";
            animationFrame = 2;
            break;
        case 2:
            image.y = image.y + 5;

            animationFrame = 3;
            break;
        case 3:
            image.y = image.y - 5;
            animationFrame = 1;
            break;
    }
}
function eggAnimation3() {
    switch (animationFrame) {
        case 1:
            image.href = "../resources/eggImages/purpleEgg/sprite_2.png";
            animationFrame = 2;
            break;
        case 2:
            image.y = image.y + 5;

            animationFrame = 3;
            break;
        case 3:
            image.y = image.y - 5;
            animationFrame = 1;
            break;
    }
}
function eggAnimation4() {
    switch (animationFrame) {
        case 1:
            image.href = "../resources/eggImages/purpleEgg/sprite_3.png";
            animationFrame = 2;
            break;
        case 2:
            image.y = image.y + 5;

            animationFrame = 3;
            break;
        case 3:
            image.y = image.y - 5;
            animationFrame = 1;
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

function sitAnimationShroom() {
    switch (animationFrame) {
        case 1:
            image.href = "../resources/mushroomImages/idle/sprite_00.png";
            
            animationFrame = 2;
            break;
        case 2:
            image.href = "../resources/mushroomImages/idle/sprite_01.png";
            animationFrame = 3;
            break;
        case 3:
            image.href = "../resources/mushroomImages/idle/sprite_02.png";

            animationFrame = 4;
            break;
        case 4:
            image.href = "../resources/mushroomImages/idle/sprite_03.png";

            animationFrame = 5;
            break;
        case 5:
            image.href = "../resources/mushroomImages/idle/sprite_04.png";

            animationFrame = 6;
            break;
        case 6:
            image.href = "../resources/mushroomImages/idle/sprite_05.png";

            animationFrame = 7;
            break;
        case 7:
            image.href = "../resources/mushroomImages/idle/sprite_06.png";

            animationFrame = 8;
            break;
        case 8:
            image.href = "../resources/mushroomImages/idle/sprite_07.png";

            animationFrame = 9;
            break;
        case 9:
            image.href = "../resources/mushroomImages/idle/sprite_08.png";

            animationFrame = 10;
            break;
        case 10:
            image.href = "../resources/mushroomImages/idle/sprite_09.png";

            animationFrame = 11;
            break;
        case 11:
            image.href = "../resources/mushroomImages/idle/sprite_10.png";

            animationFrame = 12;
            break;
        case 12:
            image.href = "../resources/mushroomImages/idle/sprite_11.png";

            animationFrame = 13;
            break;
        case 13:
            image.href = "../resources/mushroomImages/idle/sprite_12.png";

            animationFrame = 14;
            break;
        case 14:
            image.href = "../resources/mushroomImages/idle/sprite_13.png";

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

    console.log("App data is being saved");
    saveState.data.saveTimer = new Date();
    //update current save state.
    fs.writeFileSync("save.txt", saveState, "json");


    //     outbox
    //   .enqueueFile("/private/data/save.txt")
    //   .then(ft => {
    //     console.log(`Transfer of ${ft.name} successfully queued.`);
    //   })
    //   .catch(err => {
    //     console.log(`Failed to schedule transfer: ${err}`);
    //   })

}
};
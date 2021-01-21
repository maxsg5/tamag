//import functions from animations.js
import { sitAnimationRock } from './animations.js';
import { sitAnimationShroom } from './animations.js';
import { sitAnimationDino } from './animations.js';
import { eggGreenAnimation1 } from './animations.js';
import { eggGreenAnimation2 } from './animations.js';
import { eggGreenAnimation3 } from './animations.js';
import { eggGreenAnimation4 } from './animations.js';
import { eggOrangeAnimation1 } from './animations.js';
import { eggOrangeAnimation2 } from './animations.js';
import { eggOrangeAnimation3 } from './animations.js';
import { eggOrangeAnimation4 } from './animations.js';
import { eggPurpleAnimation1 } from './animations.js';
import { eggPurpleAnimation2 } from './animations.js';
import { eggPurpleAnimation3 } from './animations.js';
import { eggPurpleAnimation4 } from './animations.js';
import { deadAnimation } from './animations.js';


//Fitbit imports
import document from "document";
import * as fs from "fs";
import clock from "clock";
import { me as appbit } from "appbit";
import { today } from "user-activity";

//bind UI elements
let list = document.getElementById("myList");
let storeList = document.getElementById("storeList");
let storeItems = storeList.getElementsByClassName("list-item");
let items = list.getElementsByClassName("list-item");
let image = document.getElementById('image');
let background = document.getElementById('background');
let hungerLabel = document.getElementById('hunger');
let healthLabel = document.getElementById('health');
let walletLabel = document.getElementById('wallet');
let stepsLabel = document.getElementById('steps');
stepsLabel.style.display = 'none';
let cookieLabel = document.getElementById('cookies');
let feedPetButton = document.getElementById('button-4');
let devButton = document.getElementById('button-5');
let devButton2 = document.getElementById('button-6');
let devButton3 = document.getElementById('button-7');
let storeButton = document.getElementById('storeButton');
let healthBar = document.getElementById('healthBar');
let hungerBar = document.getElementById('hungerBar');
let borderBarHealth = document.getElementById('borderBarHealth');
let borderBarHunger = document.getElementById('borderBarHunger');
healthBar.style.display = 'none';
hungerBar.style.display = 'none';
borderBarHealth.style.display = 'none';
borderBarHunger.style.display = 'none';

let healthCircle = document.getElementById('arc');
let storePage = document.getElementById('page3');
let mainPage = document.getElementById('page2');
let startPage = document.getElementById('page1');


//page2.style.display = 'none';
//initialize UI elements and fitbit components
storePage.style.display = 'none';
devButton3.style.display = 'none';


clock.granularity = "seconds"; // seconds, minutes, hours
//uncomment to hide dev buttons.
//devButton.style.display ='none'; 
//devButton2.style.display ='none';

//declare variables
var lastSaveTime;
var hungerTime;
var dieTime;
var animationSpeed = 150;
var animationFrame = 1;
var eggStage0 = 10;
var eggStage1 = 20;
var eggStage2 = 30;
var eggStage3 = 40;

//initial game start data.
var saveState = {
  "data": {
    "hunger": 0,
    "wallet": 0,
    "steps": 0,
    "health": 2,
    "saveTimer": new Date(),
    "hungerTimer": new Date(),
    "fullTimer": null,
    "dieLoop": new Date(),
    "cookies": 1000,
    "pet": null,
    "egg": -1,
    "backgroundTask": false,
    "currentAnimation": null
  }
};

//event handler for the egg listbox selection.
items.forEach((element, index) => {
  let touch = element.getElementById("touch");
  touch.addEventListener("click", (evt) => {
    console.log(`touched: ${index}`);
    if(index > 0){
    list.style.display = 'none';
    saveState.data.egg = index-1;
    //initialize the offset for starting the tracking of step count.
    saveState.data.steps = today.adjusted.steps;
    }
    else{
      return;
    }
  });
});
//event handler for the store listbox selection.
storeItems.forEach((element, index) => {
  let touch = element.getElementById("touch");
  touch.addEventListener("click", (evt) => {
    console.log(`touched: ${index}`);

  });
});


//check if there is saved data.
if (fs.existsSync("/private/data/save.txt")) {
  //load any saved data to variables.
  saveState = fs.readFileSync("save.txt", "json");
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
appbit.appTimeoutEnabled = false; // Disable timeout


//animate the pet.
setInterval(swapImageAnimator, animationSpeed);

//event listeners
//open and close the storePage
storeButton.addEventListener("click", (evt) => {
  //hide the store
  if (mainPage.style.display == 'none') {
    background.style.display = 'inline';
    storePage.style.display = 'none';
    mainPage.style.display = 'inline';
  }
  //show the store
  else {
    background.style.display = 'none';
    storePage.style.display = 'inline';
    mainPage.style.display = 'none';
  }
})
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
//create new Game.
devButton3.addEventListener("click", (evt) => {

  saveState = {
    "data": {
      "hunger": 0,
      "wallet": 0,
      "steps": 0,
      "health": 2,
      "saveTimer": new Date(),
      "hungerTimer": new Date(),
      "fullTimer": null,
      "dieLoop": new Date(),
      "cookies": 1000,
      "pet": null,
      "egg": -1,
      "backgroundTask": false,
      "currentAnimation": null
    }
  };
  console.log("creating new game.")
  fs.writeFileSync("save.txt", saveState, "json");
  list.style.display = 'inline';
  image.style.display = 'none';
  devButton3.style.display = 'none';
})
devButton2.addEventListener("click", (evt) => {

  saveState.data.cookies += 100;
  saveState.data.hunger = 0;
  saveState.data.health = 100;
})
//happens when the clock ticks every second.
clock.addEventListener("tick", (evt) => {

  console.log("steps: " + saveState.data.steps);
  console.log("wallet: " + saveState.data.wallet);

  // TODO: COMPARTMENTALIZE THE GAME LOGIC

  // check if user has not selected an egg.
  if (saveState.data.egg == -1) {
    mainPage.style.display = 'none';
    startPage.style.display = 'inline';
    storePage.style.display = 'none';
    storeButton.style.display = 'none';
    return;
  }

  //if the pet is dead display dead animation.
  if (saveState.data.health <= 0) {
    animationFrame = 1;
    saveState.data.currentAnimation = 'dead';
    feedPetButton.style.display = "none";
    healthLabel.style.display = 'none';
    cookieLabel.style.display = 'none';
    hungerLabel.style.display = 'none';
    walletLabel.style.display = 'none';
    devButton3.style.display = 'inline';
    return;
  }


  //if we reach this point the game is in progress as either an egg or creature.

  //hide the start page and show the main Page.
  mainPage.style.display = 'inline';
  startPage.style.display = 'none';

  //EGG LOGIC ---------------------------------------------------
  if (saveState.data.egg == 0) {
    background.style.display = 'inline';
    feedPetButton.style.display = 'none';
    walletLabel.style.display = 'inline';
    saveState.data.currentAnimation = 'egg0';
    if (saveState.data.wallet >= eggStage0)
      saveState.data.egg = 0.1;
  }
  else if (saveState.data.egg == 1) {
    background.style.display = 'inline';
    feedPetButton.style.display = 'none';
    walletLabel.style.display = 'inline';
    saveState.data.currentAnimation = 'egg1';
    if (saveState.data.wallet >= eggStage0)
      saveState.data.egg = 1.1;
  }
  else if (saveState.data.egg == 2) {
    background.style.display = 'inline';
    feedPetButton.style.display = 'none';
    walletLabel.style.display = 'inline';
    saveState.data.currentAnimation = 'egg2';
    if (saveState.data.wallet >= eggStage0)
      saveState.data.egg = 2.1;
  }
  else if (saveState.data.egg == 0.1) {
    saveState.data.currentAnimation = 'egg0.1';
    if (saveState.data.wallet >= eggStage1)
      saveState.data.egg = 0.2;
  }
  else if (saveState.data.egg == 1.1) {
    saveState.data.currentAnimation = 'egg1.1';
    if (saveState.data.wallet >= eggStage1)
      saveState.data.egg = 1.2;
  }
  else if (saveState.data.egg == 2.1) {
    saveState.data.currentAnimation = 'egg2.1';
    if (saveState.data.wallet >= eggStage1)
      saveState.data.egg = 2.2;
  }
  else if (saveState.data.egg == 0.2) {
    saveState.data.currentAnimation = 'egg0.2';
    if (saveState.data.wallet >= eggStage2)
      saveState.data.egg = 0.3;
  }
  else if (saveState.data.egg == 1.2) {
    saveState.data.currentAnimation = 'egg1.2';
    if (saveState.data.wallet >= eggStage2)
      saveState.data.egg = 1.3;
  }
  else if (saveState.data.egg == 2.2) {
    saveState.data.currentAnimation = 'egg2.2';
    if (saveState.data.wallet >= eggStage2)
      saveState.data.egg = 2.3;
  }
  else if (saveState.data.egg == 0.3) {
    saveState.data.currentAnimation = 'egg0.3';
    if (saveState.data.wallet >= eggStage3) {
      saveState.data.egg = null;
      saveState.data.currentAnimation = 'sit';
      saveState.data.wallet = 0;
      saveState.data.currentPet = 'dino';
    }
  }
  else if (saveState.data.egg == 1.3) {
    saveState.data.currentAnimation = 'egg1.3';
    if (saveState.data.wallet >= eggStage3) {
      saveState.data.egg = null;
      saveState.data.currentAnimation = 'sit';
      saveState.data.currentPet = 'rock';
      saveState.data.wallet = 0;
    }
  }
  else if (saveState.data.egg == 2.3) {
    saveState.data.currentAnimation = 'egg2.3';
    if (saveState.data.wallet >= eggStage3) {
      saveState.data.egg = null;
      saveState.data.currentAnimation = 'sit';
      saveState.data.currentPet = 'shroom';
      saveState.data.wallet = 0;
    }
  }

  //EGG LOGIC END ---------------------------------------------------

  else {
    storeButton.style.display = 'inline';
    healthBar.style.display = 'inline';
    hungerBar.style.display = 'inline';
    borderBarHealth.style.display = 'inline';
    borderBarHunger.style.display = 'inline';
    cookieLabel.style.display = 'block';
    feedPetButton.style.display = 'inline';
    hungerLabel.text = "Hunger:";
    healthLabel.text = "Health:";
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
    //hunger logic-----------------------------------------------
    if (hungerTime >= 100 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 100;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 95 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 95;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 90 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 90;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 85 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 85;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 80 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 80;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 75 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 75;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 70 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 70;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 65 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 65;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 60 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 60;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 55 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 55;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 50 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 50;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 45 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 45;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 40 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 40;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 35 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 35;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 30 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 30;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 25 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 25;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 20 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 20;
      }

      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 15 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 15;
      }
      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 10 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 10;
      }
      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    if (hungerTime >= 5 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 5;
      }
      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }
    //every 30 min the pet gains 1 hunger (becomes hungrier)
    if (hungerTime >= 1 && saveState.data.hunger < 100) {
      if (saveState.data.hunger > 100) {
        saveState.data.hunger = 100;
      } else {
        saveState.data.hunger += 1;
      }
      //update the current save state time.
      saveState.data.hungerTimer = new Date();
    }






    //if pet runs out of hunger health drops every min
    if (saveState.data.hunger == 100 && dieTime >= 1) {


      saveState.data.health -= 1;
      //update the current save state time.
      saveState.data.dieLoop = new Date();

    }
  }

  updateUI();
  //console.log("time since last hunger added " + hungerTime + " Min");
});

function updateUI() {
  healthBar.width = saveState.data.health;
  hungerBar.width = saveState.data.hunger;
  //healthCircle.groupTransform.angle += 0.28;
  checkSteps();
  walletLabel.text = "wallet: " + saveState.data.wallet;
  stepsLabel.text = "steps: " + saveState.data.steps;
}

//check how many steps the user has taken.
function checkSteps() {
  if (appbit.permissions.granted("access_activity")) {
    //update the user's wallet with steps.
    var stepDif = today.adjusted.steps - saveState.data.steps;
    saveState.data.wallet += stepDif;
    saveState.data.steps = today.adjusted.steps;
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

    case 'egg2':
      animationFrame = eggPurpleAnimation1(image, animationFrame);
      break;
    case 'egg2.1':
      animationFrame = eggPurpleAnimation2(image, animationFrame);
      break;
    case 'egg2.2':
      animationFrame = eggPurpleAnimation3(image, animationFrame);
      break;
    case 'egg2.3':
      animationFrame = eggPurpleAnimation4(image, animationFrame);
      break;
    case 'egg1':
      animationFrame = eggOrangeAnimation1(image, animationFrame);
      break;
    case 'egg1.1':
      animationFrame = eggOrangeAnimation2(image, animationFrame);
      break;
    case 'egg1.2':
      animationFrame = eggOrangeAnimation3(image, animationFrame);
      break;
    case 'egg1.3':
      animationFrame = eggOrangeAnimation4(image, animationFrame);
      break;
    case 'egg0':
      animationFrame = eggGreenAnimation1(image, animationFrame);
      break;
    case 'egg0.1':
      animationFrame = eggGreenAnimation2(image, animationFrame);
      break;
    case 'egg0.2':
      animationFrame = eggGreenAnimation3(image, animationFrame);
      break;
    case 'egg0.3':
      animationFrame = eggGreenAnimation4(image, animationFrame);
      break;
    case 'sit':

      if (saveState.data.currentPet == 'shroom')
        animationFrame = sitAnimationShroom(image, animationFrame);
      if (saveState.data.currentPet == 'rock')
        animationFrame = sitAnimationRock(image, animationFrame);
      if (saveState.data.currentPet == 'dino')
        animationFrame = sitAnimationDino(image, animationFrame);
      break;
    case 'sleep':
      //sleepAnimation();
      break;
    case 'eat':
      //eatAnimation();
      break;
    case 'dead':

      animationFrame = deadAnimation(image, animationFrame);
      break;
  }
}



//user is closing the app.
appbit.onunload = () => {

  console.log("App data is being saved");
  saveState.data.saveTimer = new Date();
  //update current save state.
  fs.writeFileSync("save.txt", saveState, "json");
}









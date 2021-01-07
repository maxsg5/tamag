
//get the file from fitbit
import { inbox } from "file-transfer";
import { me as companion } from "companion";

var saveState;

async function processAllFiles() {
  let file;
  while ((file = await inbox.pop())) {
    saveState = await file.text();
    console.log(`file contents: ${saveState}`);
  }
}

inbox.addEventListener("newfile", processAllFiles);

processAllFiles();

if (!companion.permissions.granted("run_background")) {
  console.warn("We're not allowed to access to run in the background!");
}

const MILLISECONDS_PER_MINUTE = 1000 * 60;

// Tell the Companion to wake after 30 minutes
companion.wakeInterval = 5 * MILLISECONDS_PER_MINUTE;

// Listen for the event
companion.addEventListener("wakeinterval", backgroundGameLoop);

// Event happens if the companion is launched and has been asleep
if (companion.launchReasons.wokenUp) {
    backgroundGameLoop();
}




function backgroundGameLoop(){
    //console.log(saveState.data.hunger);
    console.log("hey");
    
}
"use strict";

const sounds = {
  E: "./sounds/crash.wav",
  R: "./sounds/hihat-close.wav",
  T: "./sounds/hihat-open.wav",
  Y: "./sounds/kick.wav",
  U: "./sounds/ride.wav",
  I: "./sounds/snare.wav",
  F: "./sounds/tom-high.wav",
  G: "./sounds/tom-low.wav",
  H: "./sounds/tom-mid.wav",
};

//selecciono y defino secciones
const initialSection = document.querySelector("section.initial");
console.log(initialSection);
const drumpadSection = document.querySelector("section.play");
console.log(drumpadSection);
const playRecSection = document.querySelector("section.playRec");
console.log(playRecSection);

function showPanel(panel) {
  panel.classList.remove("hidden");
}
function hideAllPanel() {
  initialSection.classList.add("hidden");
  drumpadSection.classList.add("hidden");
  playRecSection.classList.add("hidden");
}

function ShowPlayRec() {
  showPanel(playRecSection);
  const returnPlayButton = playRecSection.querySelector("button");
  returnPlayButton.addEventListener("click", () => {
    hideAllPanel();
    showCentral();
  });
}
function showCentral() {
  showPanel(drumpadSection);
  const recordingButton = drumpadSection.querySelector("button.rec");

  recordingButton.addEventListener("click", (e) => {
    hideAllPanel();
    ShowPlayRec();
  });
}

function managePanel() {
  showPanel(initialSection);
  const letsPlayButton = initialSection.querySelector("button");

  letsPlayButton.addEventListener("click", () => {
    hideAllPanel();
    showCentral();
  });
}

managePanel();

//función play sounds
const drumPadPlay = (pathSound) => {
  const sound = new Audio(pathSound);
  sound.play();
};

let recordingArray = [];

//asignación clicks a sonidos
//adicionalmente aprovecho evento para capturar pathsound relacionado al click
//defino setTimeout para dar realismo al evento

const UserClick = drumpadSection.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("section.play>button")) {
    let soundName = target.getAttribute("id");
    if (soundName !== null) {
      setTimeout(() => {
        drumPadPlay(`./sounds/${soundName}.wav`);
        //recordingArray.push(`./sounds/${soundName}.wav`);
      }, 100);
    }
    saveLocalStorage(recordingArray);
    let arrS = getLocalStorage();
    console.log(`Arr: ${arrS}`);
    //console.log(`./sounds/${soundName}.wav`);
  }
});

//asignación teclas a sonidos
//adicionalmente aprovecho la función para capturar el pathsound relacionadas con teclas pulsadas

const UserKey = drumpadSection.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const llavesObjeto = Object.keys(sounds);
  if (llavesObjeto.includes(key)) {
    setTimeout(() => {
      drumPadPlay(sounds[key]);
      //recordingArray.push(sounds[key]);
    }, 100);
    //saveLocalStorage(recordingArray);
    let arrS = getLocalStorage();
    console.log(`Arr: ${arrS}`);
  } else {
    alert(`pulsa una tecla valida "E" "R" "T" "Y" "U" "I" "F" "G" "H"`);
  }
});

//testing local storage

function saveLocalStorage(arrSounds) {
  window.localStorage.setItem("rec", JSON.stringify(arrSounds));
}

function getLocalStorage() {
  return [...JSON.parse(window.localStorage.getItem("rec"))];
}

//1)Hacer un eventListener para el boton REC donde guarde el array de sonidos
//en el localStorage

//2)Hacer un boton de play con un eventListener para recoger el array de
//sonidos del LocalStorage y reproducirlo

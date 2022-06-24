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

//selecciono section drumpad
const drumpadSection = document.querySelector("#drumpad");
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
  if (target.matches("#drumpad>button")) {
    let soundName = target.getAttribute("id");
    setTimeout(() => {
      drumPadPlay(`./sounds/${soundName}.wav`);
    }, 100);
    //console.log(`./sounds/${soundName}.wav`);
    recordingArray.push(`./sounds/${soundName}.wav`);
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
  } else {
    alert(`pulsa una tecla valida "E" "R" "T" "Y" "U" "I" "F" "G" "H"`);
  }
});

console.log(recordingArray);

//testing local storage
window.localStorage.setItem("rec", JSON.stringify(recordingArray));

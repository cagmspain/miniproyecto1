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

const drumpadSection = document.querySelector("#drumpad");
//función play sounds
const drumPadPlay = (pathSound) => {
  const sound = new Audio(pathSound);
  sound.play();
};
let recording = [];
//asignación clicks a sonidos

drumpadSection.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("button")) {
    let soundName = target.getAttribute("id");
    setTimeout(() => {
      drumPadPlay(`./sounds/${soundName}.wav`);
    }, 100);
  }
});

//asignación teclas a sonidos

drumpadSection.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const llavesObjeto = Object.keys(sounds);
  if (llavesObjeto.includes(key)) {
    setTimeout(() => {
      drumPadPlay(sounds[key]);
    }, 100);
  } else {
    alert(`pulsa una tecla valida "E" "R" "T" "Y" "U" "I" "F" "G" "H"`);
  }
});

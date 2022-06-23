"use strict";

///inicio selección de botones
//definiré 9 botones, cada uno a ser asociado a un sonido diferente posteriormente
const sounds = [
  "./sounds/crash.wav",
  "./sounds/hihat-close.wav",
  "./sounds/hihat-open.wav",
  "./sounds/kick.wav",
  "./sounds/ride.wav",
  "./sounds/snare.wav",
  "./sounds/tom-high.wav",
  "./sounds/tom-low.wav",
  "./sounds/tom-mid.wav",
];

const [
  audioCrash,
  audioHihatC,
  audioHihatO,
  audioKick,
  audioRide,
  audioSnare,
  audioTomHigh,
  audioTomLow,
  audioTomMid,
] = sounds;

const drumpadSection = document.querySelector("#drumpad");

const drumPadPlay = (pathSound) => {
  const sound = new Audio(pathSound);
  //sound.currentTime = 0; //reinicio a cero , para pruebas
  sound.play();
};

drumpadSection.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  switch (key) {
    case "E":
      drumPadPlay(audioCrash);
      break;
    case "R":
      drumPadPlay(audioHihatC);
      break;
    case "T":
      drumPadPlay(audioHihatO);
      break;
    case "Y":
      drumPadPlay(audioKick);
      break;
    case "U":
      drumPadPlay(audioRide);
      break;
    case "I":
      drumPadPlay(audioSnare);
      break;
    case "F":
      drumPadPlay(audioTomHigh);
      break;
    case "G":
      drumPadPlay(audioTomLow);
      break;
    case "H":
      drumPadPlay(audioTomMid);
      break;
  }
});

const crashButtom = document.querySelector("#crash");
crashButtom.addEventListener("click", () => {
  drumPadPlay(audioCrash);
});

const hihatCloseButtom = document.querySelector("#hihat-close");
hihatCloseButtom.addEventListener("click", () => {
  drumPadPlay(audioHihatC);
});

const hiHatOpenButtom = document.querySelector("#hihat-open");
hiHatOpenButtom.addEventListener("click", () => {
  drumPadPlay(audioHihatO);
});

const kickButtom = document.querySelector("#kick");
kickButtom.addEventListener("click", () => {
  drumPadPlay(audioKick);
});

const rideButtom = document.querySelector("#ride");
rideButtom.addEventListener("click", () => {
  drumPadPlay(audioRide);
});

const snareButtom = document.querySelector("#snare");
snareButtom.addEventListener("click", () => {
  drumPadPlay(audioSnare);
});

const tomHighButtom = document.querySelector("#tom-high");
tomHighButtom.addEventListener("click", () => {
  drumPadPlay(audioTomHigh);
});

const tomLowButtom = document.querySelector("#tom-low");
tomLowButtom.addEventListener("click", () => {
  drumPadPlay(audioTomLow);
});

const tomMidButtom = document.querySelector("#tom-mid");
tomMidButtom.addEventListener("click", () => {
  drumPadPlay(audioTomMid);
});

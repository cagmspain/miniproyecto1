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

const drumpadSection = document.querySelector("section.play");

const playRecSection = document.querySelector("section.playRec");

//inicio diseño para visualización de paneles

//función para mostrar paneles
function showPanel(panel) {
  panel.classList.remove("hidden");
}

//función general esconder todos los paneles
function hideAllPanel() {
  initialSection.classList.add("hidden");
  drumpadSection.classList.add("hidden");
  playRecSection.classList.add("hidden");
}
//función para gestionar la sección final-Play rec,
//gestión evento click en retorno a juego sin grabación
function ShowPlayRec() {
  showPanel(playRecSection);
  const returnPlayButton = playRecSection.querySelector("button#returnPlay");
  returnPlayButton.addEventListener("click", () => {
    hideAllPanel();
    showCentral();
  });
}

//función para gestionar panel central o principal-drumpad
// y para gestionar el cambio de panel , a panel grabación

function showCentral() {
  showPanel(drumpadSection);
  const recordingButton = drumpadSection.querySelector("button#rec");

  recordingButton.addEventListener("click", (e) => {
    hideAllPanel();
    ShowPlayRec();
  });
}

//función para gestionar visualización panel inicial
//y para añadir evento a botón jugar y dar paso a siguiente panel drumpad

function managePanel() {
  showPanel(initialSection);
  const letsPlayButton = initialSection.querySelector("button");

  letsPlayButton.addEventListener("click", () => {
    hideAllPanel();
    showCentral();
  });
}
//inicializamos la gestión de paneles
managePanel();

//se define función play sounds, reproducirá los sonidos según dirección obtenida
const drumPadPlay = (pathSound) => {
  const sound = new Audio(pathSound);
  setTimeout(() => {
    sound.play();
  }, 200);
};
//inicializamos array vacio para cargar posibles eventos de grabación
//obtendremos en este la dirección de los sonidos
let recordingArray = [];

//asignación clicks a sonidos
//adicionalmente aprovecho evento para capturar pathsound relacionado al click
//defino setTimeout para dar realismo al evento

const UserClick = drumpadSection.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("section.play>button")) {
    let soundName = target.getAttribute("class");

    if (soundName !== null) {
      drumPadPlay(`./sounds/${soundName}.wav`);
      //recordingArray.push(`./sounds/${soundName}.wav`);
    }
    //saveLocalStorage(recordingArray);
    let arrS = getLocalStorage();
    //console.log(`Arr: ${arrS}`);
    //console.log(`./sounds/${soundName}.wav`);
  }
});

//asignación teclas a sonidos
//adicionalmente aprovecho la función para capturar el pathsound relacionadas con teclas pulsadas

const UserKey = drumpadSection.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const llavesObjeto = Object.keys(sounds);
  if (llavesObjeto.includes(key)) {
    drumPadPlay(sounds[key]);
    //recordingArray.push(sounds[key]);

    //saveLocalStorage(recordingArray);
    //arrS = getLocalStorage();
    //console.log(`Arr: ${arrS}`);
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

///configuro eventos para botones del panel rec

const UserRecClick = playRecSection.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("section.playRec>button")) {
    let soundName = target.getAttribute("class");

    if (soundName !== null) {
      drumPadPlay(`./sounds/${soundName}.wav`);
      recordingArray.push(`./sounds/${soundName}.wav`);
    }
    saveLocalStorage(recordingArray);
    let arrS = getLocalStorage();
    //console.log(`Arr: ${arrS}`);
    //console.log(`./sounds/${soundName}.wav`);
  }
});

const UseRecrKey = playRecSection.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const llavesObjeto = Object.keys(sounds);
  if (llavesObjeto.includes(key)) {
    drumPadPlay(sounds[key]);
    recordingArray.push(sounds[key]);

    saveLocalStorage(recordingArray);
    arrS = getLocalStorage();
    //console.log(`Arr: ${arrS}`);
  } else {
    alert(`pulsa una tecla valida "E" "R" "T" "Y" "U" "I" "F" "G" "H"`);
  }
});

const playButton = playRecSection.querySelector("button#playRecorded");
playButton.addEventListener("click", (e) => {
  let arrS = getLocalStorage();
  for (let index = 0; index < arrS.length; index++) {
    const path = arrS[index];

    drumPadPlay(path);
  }
});

//const playButton = playRecSection.querySelector("button#playRecorded");
//console.log(playButton);

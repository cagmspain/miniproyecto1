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

//inicio diseño para visualización de paneles

//función para mostrar paneles
function showPanel(panel) {
  panel.classList.remove("hidden");
}

//función general esconder todos los paneles
function hideAllPanel() {
  initialSection.classList.add("hidden");
  drumpadSection.classList.add("hidden");
}

//función para gestionar panel central o principal-drumpad

function showCentral() {
  showPanel(drumpadSection);
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

  sound.play();
};

//asignación clicks a sonidos
//adicionalmente aprovecho evento para capturar pathsound relacionado al click
//defino setTimeout para dar realismo al evento

const UserClick = drumpadSection.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("section.play>button")) {
    let soundName = target.getAttribute("class");

    if (soundName !== null) {
      drumPadPlay(`./sounds/${soundName}.wav`);
    }
  }
});

//asignación teclas a sonidos

const UserKey = drumpadSection.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const llavesObjeto = Object.keys(sounds);
  if (llavesObjeto.includes(key)) {
    drumPadPlay(sounds[key]);
  } else {
    alert(`pulsa una tecla valida "E" "R" "T" "Y" "U" "I" "F" "G" "H"`);
  }
});

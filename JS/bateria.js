import {
  clampVolume,
  getSoundForKey,
  isEditableTarget,
  soundPath,
} from "./drum-core.js";

const pads = [...document.querySelectorAll("[data-sound]")];
const status = document.querySelector("#status");
const volumeControl = document.querySelector("#volume");
const volumeValue = document.querySelector("#volume-value");
const muteButton = document.querySelector("#mute");

const audioPool = new Map();
let volume = clampVolume(volumeControl.value);
let previousVolume = volume;

function getAudio(sound) {
  if (!audioPool.has(sound)) {
    const voices = Array.from({ length: 4 }, () => new Audio(soundPath(sound)));
    audioPool.set(sound, { voices, index: 0 });
  }

  const pool = audioPool.get(sound);
  const audio = pool.voices[pool.index];
  pool.index = (pool.index + 1) % pool.voices.length;
  return audio;
}

function animatePad(pad) {
  pad.classList.remove("is-active");
  requestAnimationFrame(() => {
    pad.classList.add("is-active");
    window.setTimeout(() => pad.classList.remove("is-active"), 120);
  });
}

function playPad(pad) {
  const sound = pad.dataset.sound;
  const audio = getAudio(sound);

  audio.currentTime = 0;
  audio.volume = volume;
  void audio.play().catch(() => {
    status.textContent = "El navegador bloqueó el audio. Pulsa un pad para activarlo.";
  });

  animatePad(pad);
  status.textContent = `${pad.querySelector(".pad__name").textContent} · tecla ${pad.dataset.key}`;
}

function updateVolume(nextVolume) {
  volume = clampVolume(nextVolume);
  volumeControl.value = String(volume);
  volumeValue.value = `${Math.round(volume * 100)}%`;
  muteButton.setAttribute("aria-pressed", String(volume === 0));
  muteButton.textContent = volume === 0 ? "Activar sonido" : "Silenciar";
}

pads.forEach((pad) => {
  pad.addEventListener("click", () => playPad(pad));
});

document.addEventListener("keydown", (event) => {
  if (event.repeat || isEditableTarget(event.target)) {
    return;
  }

  const sound = getSoundForKey(event.key);
  if (!sound) {
    return;
  }

  const pad = document.querySelector(`[data-sound="${sound}"]`);
  event.preventDefault();
  playPad(pad);
});

volumeControl.addEventListener("input", (event) => {
  const nextVolume = clampVolume(event.target.value);
  if (nextVolume > 0) {
    previousVolume = nextVolume;
  }
  updateVolume(nextVolume);
});

muteButton.addEventListener("click", () => {
  if (volume === 0) {
    updateVolume(previousVolume || 0.8);
    return;
  }

  previousVolume = volume;
  updateVolume(0);
});

updateVolume(volume);

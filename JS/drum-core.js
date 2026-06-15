export const KEY_TO_SOUND = Object.freeze({
  E: "crash",
  R: "hihat-close",
  T: "hihat-open",
  Y: "kick",
  U: "ride",
  I: "snare",
  F: "tom-high",
  G: "tom-low",
  H: "tom-mid",
});

export function getSoundForKey(key) {
  if (typeof key !== "string") {
    return null;
  }

  return KEY_TO_SOUND[key.toUpperCase()] ?? null;
}

export function soundPath(sound) {
  return `./sounds/${sound}.wav`;
}

export function clampVolume(value) {
  const volume = Number(value);

  if (!Number.isFinite(volume)) {
    return 0.8;
  }

  return Math.min(1, Math.max(0, volume));
}

export function isEditableTarget(target) {
  if (!target || typeof target.matches !== "function") {
    return false;
  }

  return target.matches("input, textarea, select, [contenteditable='true']");
}

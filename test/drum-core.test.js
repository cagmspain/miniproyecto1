import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  KEY_TO_SOUND,
  clampVolume,
  getSoundForKey,
  isEditableTarget,
  soundPath,
} from "../JS/drum-core.js";

test("maps every supported key to the expected sound", () => {
  assert.deepEqual(KEY_TO_SOUND, {
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
});

test("accepts lowercase keys and ignores unsupported input", () => {
  assert.equal(getSoundForKey("e"), "crash");
  assert.equal(getSoundForKey("H"), "tom-mid");
  assert.equal(getSoundForKey("Escape"), null);
  assert.equal(getSoundForKey(null), null);
});

test("builds relative sound paths that work under a GitHub Pages subpath", () => {
  assert.equal(soundPath("snare"), "./sounds/snare.wav");
  assert.equal(soundPath("hihat-open"), "./sounds/hihat-open.wav");
});

test("normalizes volume values to the supported range", () => {
  assert.equal(clampVolume(-1), 0);
  assert.equal(clampVolume(0.45), 0.45);
  assert.equal(clampVolume("0.8"), 0.8);
  assert.equal(clampVolume(4), 1);
  assert.equal(clampVolume("invalid"), 0.8);
});

test("detects editable controls without depending on the browser DOM", () => {
  const input = { matches: (selector) => selector.includes("input") };
  const button = { matches: () => false };

  assert.equal(isEditableTarget(input), true);
  assert.equal(isEditableTarget(button), false);
  assert.equal(isEditableTarget(null), false);
});

test("keeps the HTML pads synchronized with the key map", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  for (const [key, sound] of Object.entries(KEY_TO_SOUND)) {
    assert.match(
      html,
      new RegExp(`data-sound="${sound}"[\\s\\S]*?data-key="${key}"`),
      `Missing pad for ${key}: ${sound}`,
    );
  }
});

test("includes an audio file for every configured sound", async () => {
  for (const sound of Object.values(KEY_TO_SOUND)) {
    const audio = await readFile(new URL(`../sounds/${sound}.wav`, import.meta.url));
    assert.ok(audio.byteLength > 44, `${sound}.wav should contain WAV audio data`);
    assert.equal(audio.subarray(0, 4).toString(), "RIFF");
  }
});

"use strict";

// Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API

// Define all properties and constants in the central object
const Speech = {
  canvas: undefined,
  ctx: undefined,

  text: {
    x: 300,
    y: 100,
    size: 50,
    font: "Aria",
    color: "#000000",
    offset: 75,
    words: ["math", "history", "chemistry", "biology", "physics"],
    help:
      "Say a name of the object on the screen. Say about, to hear about the program.",
    about: "Mathew Davidov, Copyright 2021.",
    default: "Your speech had no results.",
  },
};

/**
 * Initial function to derive canvas element, context, and call the execute function
 */
const start = () => {
  Speech.canvas = document.getElementById("canvas");
  Speech.ctx = Speech.canvas.getContext("2d");
  execute();
};

document.addEventListener("DOMContentLoaded", start);

/**
 * Central function that calls every other function
 */
const execute = () => {
  updateButton();
  drawText(Speech.text);
};

/**
 * Updates the button to reflect the current state of speech input
 */
const updateButton = () => {
  const button = document.getElementById("speak");
  button.onclick = () => {
    if (button.innerText === "Speak") {
      button.innerText = "Stop";
      recognition.start();
    } else {
      button.innerText = "Speak";
      recognition.abort();
    }
  };
};

/**
 * Draws text on the canvas
 * @param {Object} text The text object containing text size, font, color, content, and position
 */
const drawText = (text) => {
  Speech.ctx.clearRect(0, 0, canvas.width, canvas.height);
  Speech.ctx.font = `${text.size}px ${text.font}`;
  Speech.ctx.fillStyle = text.color;
  for (let i = 0; i < text.words.length; i++) {
    Speech.ctx.fillText(text.words[i], text.x, text.y + text.offset * i);
  }
};

/**
 * Draws the subject requested by the user using speech recognition
 * @param {String} subject The subject to draw on the screen
 */
const drawSubject = (subject) => {
  Speech.ctx.clearRect(0, 0, canvas.width, canvas.height);
  Speech.ctx.fillText(subject, Speech.text.x, Speech.text.y + 200);
};

const recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = false;

/**
 * After the user speaks, end the speech recognition and update the button to say "Speak"
 */
recognition.onspeechend = () => {
  recognition.stop();
  const button = document.getElementById("speak");
  button.innerText = "Speak";
};

/**
 * If there is an error, write the error to the console
 * @param {*} event The event object
 */
recognition.onerror = (event) => {
  console.log("Error occurred in recognition: " + event.error);
};

/**
 * Control flow logic for user speech recognition
 * @param {*} event The event object
 */
recognition.onresult = (event) => {
  const result = String(event.results[0][0].transcript);

  if (result === "help") {
    speak(Speech.text.help);
  } else if (result === "about") {
    speak(Speech.text.about);
  } else if (Speech.text.words.indexOf(result.toLowerCase()) !== -1) {
    speak(result);
    drawSubject(result);
  } else {
    speak(Speech.text.default);
    drawText(Speech.text);
  }
};

/**
 * Text to speech of the user input given
 * @param {String} text The text to speak
 */
const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

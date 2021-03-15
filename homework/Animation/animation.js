"use strict";

// Define all properties and constants in the central object
const Scene = {
  canvas: undefined,
  ctx: undefined,
  sprite: undefined,
  gif: {
    x: 0,
    y: 250,
  },
  bubbleInfo: {
    x: 0,
    y: 80,
  },
  text: {
    size: "25px",
    font: "Consolas",
    color: "Black",
    text: [
      {
        words: "Swish",
        x: 100,
        y: 130,
      },
      {
        words: "Ball game",
        x: 80,
        y: 180,
      },
    ],
  },
};

/**
 * Initial function to derive canvas element, context, and call the execute function
 */
const start = () => {
  Scene.canvas = document.getElementById("canvas");
  Scene.ctx = Scene.canvas.getContext("2d");

  // Create the background image
  Scene.background = new Image();
  Scene.background.src = "./images/court.jpg";
  Scene.background.onload = () => {
    Scene.ctx.drawImage(Scene.background, 0, 0);
  };

  // Create the speech bubble
  Scene.bubble = new Image();
  Scene.bubble.src = "./images/bubble.png";
  Scene.bubble.onload = () => {
    Scene.ctx.drawImage(Scene.bubble, 0, 0);
  };

  Scene.sprite = basketball;

  // Attach the image to be used for the basketball gif
  Scene.sprite.img = new Image();
  Scene.sprite.img.src = "./images/spritesheet.png";

  Scene.sprite.frame = 0;

  // Wait until the basketball image is loaded before starting the animation
  Scene.sprite.img.onload = () => {
    execute();
  };
};

document.addEventListener("DOMContentLoaded", start);

/**
 * Central function that calls every other function
 */
const execute = () => {
  clearCanvas();
  drawBackground();
  draw();
  drawBubble();
  drawText();

  window.setTimeout(execute, 100);
};

/**
 * Clears the canvas with a white background
 */
const clearCanvas = () => {
  Scene.ctx.fillStyle = "white";
  Scene.ctx.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);
};

/**
 * Draw the background image of a basketball court
 */
const drawBackground = () => {
  Scene.ctx.drawImage(Scene.background, 0, 0);
};

/**
 * Draws the corresponding image for a number
 */
const draw = () => {
  Scene.ctx.drawImage(
    Scene.sprite.img,
    Scene.sprite.frames[Scene.sprite.frame].frame.x,
    Scene.sprite.frames[Scene.sprite.frame].frame.y,
    Scene.sprite.frames[Scene.sprite.frame].frame.w,
    Scene.sprite.frames[Scene.sprite.frame].frame.h,
    Scene.gif.x,
    Scene.gif.y,
    Scene.sprite.frames[Scene.sprite.frame].frame.w,
    Scene.sprite.frames[Scene.sprite.frame].frame.h
  );

  // Advance to the next frame.
  Scene.sprite.frame++;

  // At the end of the sprite sheet, start at the first frame.
  if (Scene.sprite.frame == Scene.sprite.frames.length - 1) {
    Scene.sprite.frame = 0;

    // If you want the animation to stop at 10:
    // Scene.ctx = undefined
  }
};

/**
 * Draw the speech bubble
 */
const drawBubble = () => {
  Scene.ctx.drawImage(Scene.bubble, Scene.bubbleInfo.x, Scene.bubbleInfo.y);
};

/**
 * Draw the text in the speech bubble
 */
const drawText = () => {
  Scene.ctx.font = `${Scene.text.size} ${Scene.text.font}`;
  Scene.ctx.fillStyle = Scene.text.color;

  Scene.ctx.fillText(
    Scene.text.text[0].words,
    Scene.text.text[0].x,
    Scene.text.text[0].y
  );

  Scene.ctx.fillText(
    Scene.text.text[1].words,
    Scene.text.text[1].x,
    Scene.text.text[1].y
  );
};

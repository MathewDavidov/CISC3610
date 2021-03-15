"use strict";

// Define all properties and constants in the central object
const Scene = {
  canvas: undefined,
  ctx: undefined,
  sprite: undefined,
};

/**
 * Initial function to derive canvas element, context, and call the execute function
 */
const start = () => {
  Scene.canvas = document.getElementById("canvas");
  Scene.ctx = Scene.canvas.getContext("2d");

  Scene.sprite = numbers;

  // Attach the image to be used for the sprite.
  Scene.sprite.img = new Image();
  Scene.sprite.img.src = "./images/spritesheet.png";

  // Wait till the parrot image is loaded before starting the animation.
  Scene.sprite.img.onload = () => {
    execute();
  };
};

//document.addEventListener("DOMContentLoaded", start);

/**
 * Central function that calls every other function
 */
const execute = () => {
  clearCanvas();
  draw();

  window.setTimeout(execute, 500);
};

/**
 * Clears the canvas with a white background
 */
const clearCanvas = () => {
  Scene.ctx.fillStyle = "white";
  Scene.ctx.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);
};

/**
 * Draws the corresponding image for a number
 */
const draw = () => {
  if (Scene.sprite.frame == 10) {
    Scene.ctx.drawImage(
      Scene.sprite.img,
      Scene.sprite.frames[1].frame.x,
      Scene.sprite.frames[1].frame.y,
      Scene.sprite.frames[1].frame.w,
      Scene.sprite.frames[1].frame.h,
      0,
      0,
      Scene.sprite.frames[1].frame.w,
      Scene.sprite.frames[1].frame.h
    );
    Scene.ctx.drawImage(
      Scene.sprite.img,
      Scene.sprite.frames[0].frame.x,
      Scene.sprite.frames[0].frame.y,
      Scene.sprite.frames[0].frame.w,
      Scene.sprite.frames[0].frame.h,
      Scene.sprite.frames[1].frame.w,
      0,
      Scene.sprite.frames[0].frame.w,
      Scene.sprite.frames[0].frame.h
    );
  } else {
    Scene.ctx.drawImage(
      Scene.sprite.img,
      Scene.sprite.frames[Scene.sprite.frame].frame.x,
      Scene.sprite.frames[Scene.sprite.frame].frame.y,
      Scene.sprite.frames[Scene.sprite.frame].frame.w,
      Scene.sprite.frames[Scene.sprite.frame].frame.h,
      0,
      0,
      Scene.sprite.frames[Scene.sprite.frame].frame.w,
      Scene.sprite.frames[Scene.sprite.frame].frame.h
    );
  }

  // Advance to the next frame.
  Scene.sprite.frame++;

  // At the end of the sprite sheet, start at the first frame.
  if (Scene.sprite.frame == Scene.sprite.frames.length + 1) {
    Scene.sprite.frame = 0;

    // If you want the animation to stop at 10:
    // Scene.ctx = undefined
  }
};

document.getElementById("begin").onclick = () => {
  start();
};

document.getElementById("end").onclick = () => {
  Scene.ctx = undefined;
};

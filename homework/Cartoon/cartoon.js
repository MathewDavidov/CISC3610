"use strict";

// Define all properties and constants in the central object
const Cartoon = {
  canvas: undefined,
  ctx: undefined,

  background: {
    gradientBegin: "#fcb768",
    gradientEnd: "red",
    gradientWidth: 0,
    gradientHeight: 1000,
    width: 1000,
    height: 600,
  },

  ground: {
    x: 0,
    y: 600,
    width: 1000,
    height: 120,
    color: "#386b2a",
  },

  text: {
    x: 380,
    y: 660,
    size: 50,
    font: "Aria",
    color: "#d45d39",
    content: "A lovely view",
  },

  sun: {
    x: 200,
    y: 550,
    radius: 50,
    startAngle: 0,
    endAngle: Math.PI * 2,
    color: "#FFFF00",
  },

  house: {
    x: 500,
    y: 475,
    width: 100,
    height: 125,
    color: "#ad780c",
    roof: {
      x1: 500,
      y1: 475,
      x2: 550,
      y2: 425,
      x3: 600,
      y3: 475,
    },
    door: {
      x: 535,
      y: 560,
      width: 30,
      height: 40,
      color: "#614a25",
      doorknob: {
        x: 555,
        y: 580,
        radius: 5,
        startAngle: 0,
        endAngle: Math.PI * 2,
        color: "#bfc22f",
      },
    },
    windows: {
      x: [560, 520],
      y: [520, 520],
      width: [25, 25],
      height: [25, 25],
      backgroundColor: [],
      amount: 2,
    },
  },

  fences: {
    baseX: 300,
    baseY: 585,
    width: 20,
    height: 15,
    arcX: 307.5,
    arcY: 585,
    radius: 7.5,
    startAngle: 0,
    endAngle: Math.PI,
    anticlockwise: true,
    color: "#7a4e1b",
    factor: 20,
    iterations: 10,
  },

  trees: {
    x: [50, 300, 625],
    y: [600, 600, 600],
    width: [25, 25, 25],
    height: [100, 100, 100],
    color: ["#80610e", "#80610e", "#80610e"],
    radius: [45, 45, 45],
    leafColor: ["#27a372", "#27a372", "#27a372"],
    amount: 3,
  },

  mountain: {
    x1: 700,
    y1: 600,
    x2: 800,
    y2: 200,
    x3: 900,
    y3: 600,
    color: "#666565",
  },
};

/**
 * Initial function to derive canvas element, context, and call the execute function
 */
const start = () => {
  Cartoon.canvas = document.getElementById("canvas");
  Cartoon.ctx = Cartoon.canvas.getContext("2d");
  execute();
};

document.addEventListener("DOMContentLoaded", start);

/**
 * Central function that calls every other function
 */
const execute = () => {
  createBackground(Cartoon.background);
  createGround(Cartoon.ground);
  drawText(Cartoon.text);

  createSun(Cartoon.sun);

  createHouse(Cartoon.house);
  for (let i = 0; i < Cartoon.house.windows.amount; i++) {
    createWindow(
      Cartoon.house.windows.x[i],
      Cartoon.house.windows.y[i],
      Cartoon.house.windows.width[i],
      Cartoon.house.windows.height[i]
    );
  }
  createFences(Cartoon.fences);

  for (let i = 0; i < Cartoon.trees.amount; i++) {
    createTree(
      Cartoon.trees.x[i],
      Cartoon.trees.y[i],
      Cartoon.trees.width[i],
      Cartoon.trees.height[i],
      Cartoon.trees.color[i],
      Cartoon.trees.radius[i],
      Cartoon.trees.leafColor[i]
    );
  }

  createMountain(Cartoon.mountain);
};

/**
 * Creates a background that fills the entire canvas dimension
 * @param {Object} background The background object containing positional, dimensional, and color data
 */
const createBackground = (background) => {
  // Create a linear gradient emulating a sunset
  let gradient = Cartoon.ctx.createLinearGradient(
    0,
    0,
    background.gradientWidth,
    background.gradientHeight
  );

  gradient.addColorStop(0, background.gradientBegin);
  gradient.addColorStop(1, background.gradientEnd);

  Cartoon.ctx.fillStyle = gradient;
  Cartoon.ctx.fillRect(0, 0, background.width, background.height);
};

/**
 * Creates a foreground emulating grass and earth
 * @param {Object} ground The ground object containing positional, dimensional, and color data
 */
const createGround = (ground) => {
  Cartoon.ctx.fillStyle = ground.color;
  Cartoon.ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
};

/**
 * Draws text on the canvas
 * @param {Object} text The text object containing text size, font, color, content, and position
 */
const drawText = (text) => {
  Cartoon.ctx.font = `${text.size}px ${text.font}`;
  Cartoon.ctx.fillStyle = text.color;
  Cartoon.ctx.fillText(text.content, text.x, text.y);
};

/**
 * Creates a sun
 * @param {Object} sun The sun object containing geometric information and position for the circle
 */
const createSun = (sun) => {
  Cartoon.ctx.beginPath();
  Cartoon.ctx.arc(sun.x, sun.y, sun.radius, sun.startAngle, sun.endAngle);
  Cartoon.ctx.fillStyle = sun.color;
  Cartoon.ctx.fill();
  Cartoon.ctx.stroke();
};

/**
 * Creates the house and calls nested attributes associated with the house (e.g. roof, door)
 * @param {Object} house The house object containing positional, dimensional, color data, and nested objects
 */
const createHouse = (house) => {
  Cartoon.ctx.fillStyle = house.color;
  Cartoon.ctx.fillRect(house.x, house.y, house.width, house.height);

  // Invoke the supporting functions to draw the roof and door
  createRoof(house.roof);
  createDoor(house.door);
};

/**
 * Creates a roof for the house
 * @param {Object} roof The roof object containing positional data
 */
const createRoof = (roof) => {
  Cartoon.ctx.beginPath();
  Cartoon.ctx.moveTo(roof.x1, roof.y1);
  Cartoon.ctx.lineTo(roof.x2, roof.y2);
  Cartoon.ctx.lineTo(roof.x3, roof.y3);
  Cartoon.ctx.lineTo(roof.x1, roof.y1);
  Cartoon.ctx.stroke();
  Cartoon.ctx.fill();
};

/**
 * Creates a door for the roof and invokes the doorknob function
 * @param {Object} door The door object containing containing positional, dimensional, and color data
 */
const createDoor = (door) => {
  Cartoon.ctx.fillStyle = door.color;
  Cartoon.ctx.fillRect(door.x, door.y, door.width, door.height);

  createDoorKnob(door.doorknob);
};

/**
 * Creates a doorknob for the door
 * @param {Object} doorknob The doorknob object containg geometric properties and color
 */
const createDoorKnob = (doorknob) => {
  Cartoon.ctx.beginPath();
  Cartoon.ctx.arc(
    doorknob.x,
    doorknob.y,
    doorknob.radius,
    doorknob.startAngle,
    doorknob.endAngle
  );
  Cartoon.ctx.fillStyle = doorknob.color;
  Cartoon.ctx.fill();
  Cartoon.ctx.stroke();
};

/**
 * Creates a window with the specified parameters for position, dimensions, and color
 * @param {Number} x The x coordinate
 * @param {Number} y The y coordinate
 * @param {Number} width The width of the window
 * @param {Number} height The height of the window
 * @param {String} backgroundColor The internal color of the window
 * @example
 *   Cartoon.createWindow(560, 520, 25, 25);
 */
const createWindow = (x, y, width, height, backgroundColor) => {
  Cartoon.ctx.fillStyle = backgroundColor;
  Cartoon.ctx.fillRect(x, y, width, height);

  // Vertical line
  Cartoon.ctx.beginPath();
  Cartoon.ctx.moveTo(x + width / 2, y);
  Cartoon.ctx.lineTo(x + width / 2, y + height);
  Cartoon.ctx.stroke();

  // Horizontal line
  Cartoon.ctx.beginPath();
  Cartoon.ctx.moveTo(x, y + height / 2);
  Cartoon.ctx.lineTo(x + width, y + height / 2);
  Cartoon.ctx.stroke();
};

/**
 * Creates a group of fences given initial position, dimensions, color, and iterations
 * @param {Object} fences The fences object containing specified data
 */
const createFences = (fences) => {
  Cartoon.ctx.fillStyle = fences.color;

  for (let i = 0; i < fences.iterations; i++) {
    Cartoon.ctx.fillRect(
      fences.baseX + fences.factor * i,
      fences.baseY,
      fences.width,
      fences.height
    );
    Cartoon.ctx.beginPath();
    Cartoon.ctx.arc(
      fences.arcX + fences.factor * i,
      fences.arcY,
      fences.radius,
      fences.startAngle,
      fences.endAngle,
      fences.anticlockwise
    );
    Cartoon.ctx.fill();
    Cartoon.ctx.stroke();
  }
};

/**
 * Creates a tree given a position, dimensions, and colors
 * @param {Number} x The x coordinate
 * @param {Number} y The y coordinate
 * @param {Number} width The width of the tree trunk
 * @param {Number} height The height of the tree trunk
 * @param {String} color The color of the tree trunk
 * @param {Number} radius The radius of the upper part of the tree
 * @param {String} leafColor The color of the upper part of the tree
 */
const createTree = (x, y, width, height, color, radius, leafColor) => {
  Cartoon.ctx.fillStyle = color;
  Cartoon.ctx.fillRect(x, y - height, width, height);

  Cartoon.ctx.beginPath();
  Cartoon.ctx.arc(x + width / 2, y - height, radius, 0, Math.PI * 2);
  Cartoon.ctx.fillStyle = leafColor;
  Cartoon.ctx.fill();
  Cartoon.ctx.stroke();
};

/**
 * Creates a mountain-like figure
 * @param {Object} mountain The mountain object containing position and color data
 */
const createMountain = (mountain) => {
  Cartoon.ctx.fillStyle = mountain.color;
  Cartoon.ctx.beginPath();
  Cartoon.ctx.moveTo(mountain.x1, mountain.y1);
  Cartoon.ctx.lineTo(mountain.x2, mountain.y2);
  Cartoon.ctx.lineTo(mountain.x3, mountain.y3);
  Cartoon.ctx.lineTo(mountain.x1, mountain.y1);
  Cartoon.ctx.stroke();
  Cartoon.ctx.fill();
};

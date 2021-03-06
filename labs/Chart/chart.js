const Chart = {
  canvas: undefined,
  ctx: undefined,
  bar: {
    x: 120,
    y: 720,
    width: 120,
    height: 25,
  },
  data: {
    text: {
      size: 20,
      color: "black",
    },
    quantity: {
      x: 120,
      y: 680,
    },
    name: {
      x: 120,
      y: 705,
    },
  },
};

const fruits = [
  { name: "Apple", quantity: 20, color: "red" },
  { name: "Orange", quantity: 10, color: "orange" },
  { name: "Banana", quantity: 15, color: "yellow" },
  { name: "Kiwi", quantity: 3, color: "green" },
  { name: "Blueberry", quantity: 5, color: "blue" },
  { name: "Grapes", quantity: 8, color: "purple" },
];

/**
 * Initial function to derive canvas element, context, and call the execute function
 */
const start = () => {
  Chart.canvas = document.getElementById("canvas");
  Chart.ctx = Chart.canvas.getContext("2d");
  execute();
};

document.addEventListener("DOMContentLoaded", start);

/**
 * Central function that calls every other function
 */
const execute = () => {
  fruits.forEach((fruit, index) => {
    drawBar(fruit, index, Chart.bar);
    drawMetaData(fruit, index, Chart.data);
  });
};

/**
 * Draws a bar with given dimensions, coordinates, and color
 * @param {Object} fruit The fruit object containg the color
 * @param {Number} index The index to provide offset
 * @param {Object} bar The bar object containing the coordinates and dimensions
 */
const drawBar = (fruit, index, bar) => {
  Chart.ctx.fillStyle = fruit.color;
  Chart.ctx.fillRect(
    index * bar.x,
    bar.y,
    bar.width,
    -fruit.quantity * bar.height
  );
};

/**
 * Creates the text for number of fruits and the fruit name
 * @param {Object} fruit The fruit object containg the quantity and name
 * @param {Number} index The index to provide offset
 * @param {Object} data The data for size, color, dimensions, and positions of the text
 */
const drawMetaData = (fruit, index, data) => {
  Chart.ctx.font = `${data.text.size}px ${data.text.color}`;
  Chart.ctx.fillStyle = data.text.color;
  Chart.ctx.textAlign = "center";
  Chart.ctx.textBaseline = "middle";

  Chart.ctx.fillText(
    fruit.quantity,
    index * data.quantity.x + data.quantity.x / 2,
    data.quantity.y
  );

  Chart.ctx.fillText(
    fruit.name,
    index * data.name.x + data.name.x / 2,
    data.name.y
  );
};

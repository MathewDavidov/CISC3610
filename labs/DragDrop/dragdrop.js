const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 720,
  _parent: "phaser-example",
  backgroundColor: "#efefef",
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("beach", "assets/images/beach.png");
  this.load.image("palmtree", "assets/images/palmtree.png");
  this.load.image("bucket", "assets/images/bucket.png");
  this.load.image("crab", "assets/images/crab.png");
  this.load.image("fish", "assets/images/fish.jpg");
  this.load.image("umbrella", "assets/images/umbrella.png");
}

function create() {
  this.add.image(0, 0, "beach");

  const palmtree = this.add.sprite(64, 128, "palmtree");
  palmtree.setInteractive();
  this.input.setDraggable(palmtree);
  this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  const bucket = this.add.sprite(192, 128, "bucket");
  bucket.setInteractive();
  this.input.setDraggable(bucket);
  this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  const crab = this.add.sprite(320, 128, "crab");
  crab.setInteractive();
  this.input.setDraggable(crab);
  this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  const fish = this.add.sprite(448, 128, "fish");
  fish.setInteractive();
  this.input.setDraggable(fish);
  this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  const umbrella = this.add.sprite(576, 128, "umbrella");
  umbrella.setInteractive();
  this.input.setDraggable(umbrella);
  this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });
}

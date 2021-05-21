// Game variables
let scoreText, livesText;
let player, stars, enemies, platforms, cursors, coin;
let score = 0,
  maxScore = 0,
  lives = 3;

/**
 * The intro title scene to the game
 */
class Intro extends Phaser.Scene {
  constructor() {
    super("Intro");
  }

  preload() {}

  create() {
    this.add.text(200, 200, "Welcome to Pat's Escape!", {
      fontSize: "32px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.add.text(
      200,
      350,
      `Pat enjoys a nice sunny day.\nHowever, he must escape the enemies.\nCollect as many coins as you can!
        \nPress the spacebar to begin`,
      {
        fontSize: "20px",
        color: "#ffffff",
      }
    );

    this.add.text(200, 450, `High Score: ${maxScore}`, {
      fontSize: "20px",
      color: "#ff0000",
      fontStyle: "bold",
    });

    this.add.text(200, 500, "by Mathew Davidov", {
      fontSize: "26px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.start = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    lives = 3;
    score = 0;
  }

  update() {
    if (this.start.isDown) {
      this.start.isDown = false;
      this.scene.stop();
      this.scene.launch("Game");
    }
  }
}

/**
 * The main game containing all the action
 */
class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("sky", "assets/images/sky.png");
    this.load.image("ground", "assets/images/platform.png");
    this.load.image("star", "assets/images/star.png");
    this.load.image("enemy", "assets/images/bomb.png");
    this.load.spritesheet("dude", "assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.audio("hit", "assets/audio/hit.mp3");
    this.load.audio("gameover", "assets/audio/gameover.wav");

    // Source for audio: https://freesound.org/people/ProjectsU012/sounds/341695/
    this.load.audio("coin", "assets/audio/coin.wav");
  }

  create() {
    this.add.image(400, 300, "sky");

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    player = this.physics.add.sprite(400, 450, "dude");

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    stars = this.physics.add.group({
      key: "star",
      //repeat: 11,
      setXY: { x: Phaser.Math.Between(50, 750), y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    enemies = this.physics.add.group();

    // The score
    scoreText = this.add.text(16, 16, `Score: ${score}`, {
      fontSize: "32px",
      fill: "#000",
    });

    livesText = this.add.text(16, 48, `Lives: ${lives}`, {
      fontSize: "32px",
      fill: "#000",
    });

    const x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    const enemy = enemies.create(x, 1, "enemy");
    enemy.setBounce(1);
    enemy.setCollideWorldBounds(true);
    enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
    enemy.allowGravity = false;

    // Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(enemies, platforms);

    // Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, this.collectStar, null, this);

    this.physics.add.collider(player, enemies, this.hitEnemy, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    // If one restarts the game, the keys will still be active. So put all the keys to false.
    this.cursors.left.isDown = false;
    this.cursors.right.isDown = false;
    this.cursors.up.isDown = false;

    this.help = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  }

  update() {
    if (this.cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("turn");
    }

    if (this.cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }

    if (this.help.isDown) {
      this.help.isDown = false;
      this.scene.pause();
      this.scene.launch("Help");
    }

    if (this.restart.isDown) {
      this.restart.isDown = false;
      this.scene.stop();
      this.scene.launch("Intro");
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    // Add and update the score
    score += 10;
    scoreText.setText(`Score: ${score}`);

    maxScore = Math.max(maxScore, score);

    this.sound.play("coin");

    if (stars.countActive(true) === 0) {
      // A new batch of stars to collect
      stars.children.iterate(function (child) {
        child.enableBody(true, Phaser.Math.Between(50, 750), 0, true, true);
      });
    }
  }

  hitEnemy(player, enemy) {
    enemy.disableBody(true, true);
    lives--;

    livesText.setText(`Lives: ${lives}`);

    if (lives === 0) {
      this.sound.play("gameover");
      this.physics.pause();

      player.setTint(0xff0000);
      player.anims.play("turn");

      this.scene.stop();
      this.scene.launch("GameOver");
    } else {
      this.sound.play("hit");

      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      enemy = enemies.create(x, 1, "enemy");
      enemy.setBounce(1);
      enemy.setCollideWorldBounds(true);
      enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
      enemy.allowGravity = false;
    }
  }
}

/**
 * The help menu when a user presses the 'H' key
 */
class Help extends Phaser.Scene {
  constructor() {
    super("Help");
  }

  preload() {
    this.load.image("sky", "assets/images/sky.png");
  }

  create() {
    this.add.image(400, 300, "sky");

    this.add.text(
      200,
      100,
      "Help Menu\nPress any key to resume game.\nPress N to restart.",
      {
        fontSize: "32px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    );

    this.quit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    const scene = this.scene;

    this.input.keyboard.on("keydown", function () {
      scene.stop();
      scene.resume("Game");
    });
  }

  update() {
    if (this.quit.isDown) {
      this.quit.isDown = false;
      this.scene.stop();
      this.scene.launch("Intro");
    }
  }
}

/**
 * The game over scene when no lives are left. Can quit or restart the game.
 */
class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  preload() {}

  create() {
    this.add.text(
      100,
      100,
      `Game Over!\nPress Y to start a new game.\nPress N to quit.\n\nFinal Score: ${score}`,
      {
        fontSize: "32px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    );

    maxScore = Math.max(maxScore, score);

    this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
    this.quit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    lives = 3;
    score = 0;
  }

  update() {
    if (this.restart.isDown) {
      this.restart.isDown = false;
      this.scene.stop();
      this.scene.launch("Game");
    }

    if (this.quit.isDown) {
      this.quit.isDown = false;
      this.scene.stop();
      this.scene.launch("Intro");
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Intro, Game, Help, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

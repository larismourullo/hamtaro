function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function randomNumber(start, end) {
  return Phaser.Math.Between(start, end);
}

function preload() {
  this.load.atlas(
    "hamtaro_atlas",
    "assets/sprites/hamtaro/hamham.png",
    "assets/sprites/maps/hamtaro.json"
  );
  this.load.atlas(
    "comida_atlas",
    "assets/sprites/assest/food.png",
    "assets/sprites/maps/food.json"
  );
}

function create() {
  this.score = 0;

  pontuacao = this.add.text(10, 10, "SCORE: 0", {
    fontFamily: "Arial",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000"
  });

  hamtaro = this.physics.add.sprite(150, 150, "hamtaro_atlas");
  cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: "direita",
    frames: this.anims.generateFrameNames("hamtaro_atlas", {
      prefix: "hamtaro_",
      start: 1,
      end: 3
    }),
    repeat: -1,
    duration: 300
  });

  this.anims.create({
    key: "esquerda",
    frames: this.anims.generateFrameNames("hamtaro_atlas", {
      prefix: "hamtaro_",
      start: 4,
      end: 6
    }),
    repeat: -1,
    duration: 300
  });

  this.anims.create({
    key: "cima",
    frames: this.anims.generateFrameNames("hamtaro_atlas", {
      prefix: "hamtaro_",
      start: 7,
      end: 8
    }),
    repeat: -1,
    duration: 300
  });

  this.anims.create({
    key: "baixo",
    frames: this.anims.generateFrameNames("hamtaro_atlas", {
      prefix: "hamtaro_",
      start: 9,
      end: 10
    }),
    repeat: -1,
    duration: 300
  });

  this.anims.create({
    key: "parado",
    frames: this.anims.generateFrameNames("hamtaro_atlas", {
      prefix: "hamtaro_",
      start: 11,
      end: 12
    }),
    repeat: -1,
    duration: 300
  });

  comida = this.physics.add.sprite(250, 60, "comida_atlas", "sprite92");
  this.physics.add.collider(hamtaro, comida);

  this.physics.add.overlap(
    hamtaro,
    comida,
    function() {
      comida.x = randomNumber(50, window.innerWidth - 50);
      comida.y = randomNumber(50, window.innerHeight - 50);

      let number = Array.apply(null, { length: 24 }).map(Number.call, Number);
      number = random(number);
      comida.setTexture("comida_atlas", `sprite${number}`);

      this.score += 3;
      pontuacao.setText(`SCORE: ${this.score}`);
    },
    null,
    this
  );
}

function update() {
  if (cursors.left.isDown) {
    hamtaro.x -= 3;
    hamtaro.anims.play("esquerda", true);
  } else if (cursors.right.isDown) {
    hamtaro.x += 3;
    hamtaro.anims.play("direita", true);
  } else if (cursors.up.isDown) {
    hamtaro.y -= 3;
    hamtaro.anims.play("cima", true);
  } else if (cursors.down.isDown) {
    hamtaro.y += 3;
    hamtaro.anims.play("baixo", true);
  } else {
    hamtaro.anims.play("parado", true);
  }
}

function principal() {
  var largura = window.innerWidth;
  var altura = window.innerHeight;

  var conf = {
    type: Phaser.AUTO,
    width: largura,
    height: altura,
    pixelArt: true,
    backgroundColor: "#decfe6",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(conf);
}

window.onload = principal;

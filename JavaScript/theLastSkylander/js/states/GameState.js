var skylander = skylander || {}

skylander.GameState = {
  init: function () {
    this.gameData = JSON.parse(this.game.cache.getText('constants'));

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = this.gameData.GRAVITY;

    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  create: function () {
    console.log();
    this.game.stage.backgroundColor = "#000";

    this.loadLevel();

    //show on-screen touch controls
    this.createOnScreenControls();

  },
  update: function () {
    this.game.physics.arcade.collide(this.player, this.collisionLayer);

    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown || this.player.ownProperties.isMovingLeft) {
      this.player.body.velocity.x = -this.gameData.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking');
    }
    else if (this.cursors.right.isDown || this.player.ownProperties.isMovingRight) {
      this.player.body.velocity.x = this.gameData.RUNNING_SPEED;
      this.player.scale.setTo(1, 1);
      this.player.play('walking');
    }
    else {
      this.player.animations.stop();
      this.player.frame = 0;
    }

    if ((this.cursors.up.isDown || this.player.ownProperties.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.body.velocity.y = -this.gameData.JUMPING_SPEED;
      this.player.ownProperties.mustJump = false;
    }
  },
  loadLevel: function () {
    this.map = this.add.tilemap('level1');

    this.map.addTilesetImage('tiles_spritesheet', 'tilesheet');
    this.map.addTilesetImage('tallShroom_red', 'decoration');

    this.backgroundLayer = this.map.createLayer('BackgroundLayer');
    this.collisionLayer = this.map.createLayer ('CollisionLayer');

    this.game.world.sendToBack(this.backgroundLayer);

    this.map.setCollisionBetween(1, 160, true, 'CollisionLayer');

    this.backgroundLayer.resizeWorld();

    this.player = this.add.sprite(10, this.game.world.height - 50, 'player', 0);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    this.game.physics.arcade.enable(this.player);
    this.player.ownProperties = {isMovingLeft: false, mustJump: false};
    this.player.body.collideWorldBounds = true;

    this.game.camera.follow(this.player);
  },
  createOnScreenControls: function () {
    this.leftArrow = this.add.button(20, this.game.height - 60, 'arrowButton');
    this.rightArrow = this.add.button(110, this.game.height - 60, 'arrowButton');
    this.actionButton = this.add.button(this.game.width - 100, this.game.height - 60, 'actionButton');

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;

    this.actionButton.events.onInputDown.add(function () {
      this.player.ownProperties.mustJump = true;
    }, this);

    this.actionButton.events.onInputUp.add(function () {
      this.player.ownProperties.mustJump = false;
    }, this);

    //left
    this.leftArrow.events.onInputDown.add(function () {
      this.player.ownProperties.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputUp.add(function () {
      this.player.ownProperties.isMovingLeft = false;
    }, this);

    this.leftArrow.events.onInputOver.add(function () {
      this.player.ownProperties.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputOut.add(function () {
      this.player.ownProperties.isMovingLeft = false;
    }, this);

    //right
    this.rightArrow.events.onInputDown.add(function () {
      this.player.ownProperties.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputUp.add(function () {
      this.player.ownProperties.isMovingRight = false;
    }, this);

    this.rightArrow.events.onInputOver.add(function () {
      this.player.ownProperties.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputOut.add(function () {
      this.player.ownProperties.isMovingRight = false;
    }, this);
  }
};


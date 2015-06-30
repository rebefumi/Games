var skylander = skylander || {}

skylander.GameState = {
  init: function (level) {
    this.currentLevel = level || 'level1';
    this.gameData = JSON.parse(this.game.cache.getText('constants'));

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = this.gameData.GRAVITY;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.numLives = 4;

  },
  create: function () {
    this.game.stage.backgroundColor = "#000";

    this.loadLevel();

    //show on-screen touch controls
    this.createOnScreenControls();

  },
  update: function () {
    this.game.physics.arcade.collide(this.player, this.collisionLayer);
    this.game.physics.arcade.collide(this.enemies, this.collisionLayer);

    this.game.physics.arcade.overlap(this.player, this.goal, this.changeLevel, null, this);
    this.game.physics.arcade.collide(this.player, this.enemies, this.killEnemy, null, this);

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

    if (this.player.bottom === this.game.world.height){
      this.gameOver();
    }
  },
  loadLevel: function () {
    this.map = this.add.tilemap(this.currentLevel);

    this.map.addTilesetImage('tiles_spritesheet', 'tilesheet');
    if (this.currentLevel == 'level1')
      this.map.addTilesetImage('tallShroom_red', 'decoration');

    this.backgroundLayer = this.map.createLayer('BackgroundLayer');
    this.collisionLayer = this.map.createLayer ('CollisionLayer');

    this.game.world.sendToBack(this.backgroundLayer);

    this.map.setCollisionBetween(1, 160, true, 'CollisionLayer');

    this.backgroundLayer.resizeWorld();

    this.lives = Array.apply(undefined, Array (this.numLives));
    this.lives = this.lives.map(function (x, i) {
      var live  = this.add.sprite(this.gameData.lives_position_x[i], this.gameData.lives_position_y, 'heart');
      live.fixedToCamera = true;
      return live;
    }, this);

    var playerList = this.findObjectsByTag('player', this.map, 'Objects');
    this.player = this.add.sprite(playerList[0].x, playerList[0].y, 'player', 0);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    this.game.physics.arcade.enable(this.player);
    this.player.ownProperties = {isMovingLeft: false, mustJump: false};
    this.player.body.collideWorldBounds = true;

    var goalList = this.findObjectsByTag('goal', this.map, 'Objects');
    this.goal = this.add.sprite(goalList[0].x, goalList[0].y, 'goal');
    this.game.physics.arcade.enable(this.goal);
    this.goal.body.allowGravity = false;
    this.goal.nextLevel = goalList[0].properties.nextLevel;

    this.enemies = this.add.group();

    var enemyList = this.findObjectsByTag('enemy', this.map, 'Objects');
    enemyList.forEach(function (element){
      enemy = new skylander.Enemy (this.game, element.x, element.y, element.properties.key, parseInt(element.properties.velocity), element.properties.animation, this.map);
      this.enemies.add(enemy);
    },this);

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
  },
  findObjectsByTag: function (tag, tilemap, layer){
    var result = [];

    tilemap.objects[layer].forEach(function (element){
      if(element.properties.tag == tag){
        element.y -= tilemap.tileHeight;
        result.push(element);
      }
    },this);
    return result;
  },
  changeLevel: function (player, goal){
    this.game.state.start('PreloadState', true, false, goal.nextLevel);
  },
  killEnemy: function (player, enemy){
    if (enemy.body.touching.up){
      enemy.kill();
      player.body.velocity.y = - this.gameData.BOUNCED_SPEED;
    }else{
      this.loseLive();
    }
  },
  loseLive: function (){
    this.numLives --;
    if (this.numLives === 0){
      this.gameOver();
    }else {
      this.lives[this.numLives].alpha = 0.5;
    }
  }
  ,
  gameOver: function (){
    this.game.state.start('GameState', true, false, this.currentLevel);
  }
};


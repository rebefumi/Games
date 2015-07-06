var RPG = RPG || {}

RPG.GameState = {
  init: function(currentLevel){
    this.currentLevel = currentLevel ? currentLevel : 'world';

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;

    //TODO: Drop this line
    this.game.world.setBounds (0,0, gameConstant.world_width, gameConstant.world_height);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.gameData = JSON.parse(this.game.cache.getText('constants'));
  },
  create: function (){
    this.game.stage.backgroundColor = this.gameData.background_color;

    this.map = this.add.tilemap(this.currentLevel);

    this.map.addTilesetImage('terrains', 'tilesheet');

    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');

    this.game.world.sendToBack(this.backgroundLayer);

    this.map.setCollisionBetween(1,16, true, 'collisionLayer');

    this.collisionLayer.resizeWorld();

    this.player = new RPG.Player(this, this.gameData.initial_position.x, this.gameData.initial_position.y , this.gameData.player_data);
    this.add.existing(this.player);

    this.game.camera.follow(this.player);

  },
  update: function (){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.gameData.player_speed;
      this.player.play('walk_left');
    }else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.gameData.player_speed;
      this.player.play('walk_right');
    }else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.gameData.player_speed;
      this.player.play('walk_up');
    }else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = this.gameData.player_speed;
      this.player.play('walk_down');
    }else {
      this.player.animations.stop();
      this.player.frame = this.gameData.initial_frame;
    }

  },
  gameOver: function() {
    this.game.state.start('GameOverState', true, false, this.currentLevel);
  },
  render: function (){
     this.game.debug.body(this.player);
  }

};


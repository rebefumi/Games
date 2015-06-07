var ChickenGame = ChickenGame || {};

ChickenGame.GameState = {
  init: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.dataJson = JSON.parse(this.game.cache.getText('constant'));
    this.game.world.setBounds (0,0, this.dataJson.gameState.world_width, this.dataJson.gameState.world_height);
    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  create: function (){
    this.game.stage.backgroundColor = "#000";

    this.levelData = JSON.parse(this.game.cache.getText('level'));

    this.background = this.game.add.sprite(0,0, 'background');

    //load images and sprite

    this.cars = this.add.group();
    this.cars.enableBody = true;

    var car, level;
    this.levelData.cars.forEach(function(element){
      level = this.dataJson.gameState.car_level[element];
      car = this.cars.create(3, level.y, 'carBlue');
      car.anchor.setTo(1,0);
      car.body.velocity.x = this.levelData.car_type.blue.velocity;
    }, this);

    this.lives = this.add.group();
    var live;
    this.dataJson.gameState.lives.forEach(function (element){
      live = this.lives.create(element.x, element.y, 'live');
      live.anchor.setTo(0.5);
    }, this);

    this.numLives = this.lives.length;

    this.livesEmpty = this.add.group();
    var live;
    this.dataJson.gameState.lives_empty.forEach(function (element){
      live = this.livesEmpty.create(element.x, element.y, 'live_empty');
      live.anchor.setTo(0.5);
      live.visible = false;
    }, this);


    this.player = this.add.sprite(this.dataJson.gameState.chicken.x, this.dataJson.gameState.chicken.y, 'chicken', 3);
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.animations.add('walking', [2, 3, 1, 0, 1, 3], 10, true);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(1, 0);


  },
  update: function (){
    this.game.physics.arcade.overlap(this.player, this.cars, this.returnGame, null, this);

    if ( this.cursors.up.isDown){
      this.player.y -= this.levelData.RUNNING_SPEED;
      this.player.play('walking');
    }else if (this.cursors.down.isDown){
      this.player.y += this.levelData.RUNNING_SPEED;
      this.player.play('walking');
    }else{
      this.player.animations.stop();
      this.player.frame = 3;
    }

    this.cars.forEach(function(element){
      if(element.x > 860) {
        element.x = -40;
      }
    }, this);
  },
  returnGame: function() {
    this.player.y =  this.dataJson.gameState.chicken.y;
    this.numLives --;
    if (this.numLives > 0){
      this.lostLive();
    }else{
      this.gameOver();
    }

  },
  lostLive: function (){
    this.lives.children[this.numLives].visible = false;
    this.livesEmpty.children[this.numLives].visible = true;
  },
  gameOver: function (){
    game.state.start('HomeState');
  }

};

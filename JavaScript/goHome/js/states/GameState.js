var ChickenGame = ChickenGame || {};

ChickenGame.GameState = {
  init: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.dataJson = JSON.parse(this.game.cache.getText('constant'));
    this.levelData = JSON.parse(this.game.cache.getText('level'));
    this.game.world.setBounds (0,0, this.dataJson.gameState.world_width, this.dataJson.gameState.world_height);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.level = 1;
    this.laneFreeList = this.levelData.initial_cars_lane;
    this.carsPool = this.add.group();
    this.carsPool.enableBody = true;

  },
  create: function (){
    this.game.stage.backgroundColor = "#000";



    this.background = this.game.add.sprite(0,0, 'background');
    this.game.world.sendToBack(this.background);


    this.levelData.initial_cars_lane.forEach(function(element){
      new ChickenGame.Car(this.game, this.time.ms, this.levelData, this.dataJson.gameState.car_lane[element].y, this.carsPool);
    }, this);

    this.time = this.game.time.create(this.game);
    this.time.start();


    this.lives = this.add.group();
    var live;
    this.dataJson.gameState.lives.forEach(function (element){
      live = this.lives.create(element.x, element.y, 'live');
      live.anchor.setTo(0.5);
    }, this);

    this.numLives = this.lives.length;
    this.livesEmpty = this.add.group();
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

    this.style = {font: '50px Arial', fill:'orange'};
    this.levelLabel = this.add.text (this.game.world.width - 30 , 0, this.level, this.style);

  },
  update: function (){
    this.game.physics.arcade.overlap(this.player, this.carsPool, this.returnGame, null, this);

    if ( this.cursors.up.isDown){
      this.player.y -= this.dataJson.gameState.RUNNING_SPEED;
      this.player.play('walking');
    }else if (this.cursors.down.isDown){
      this.player.y += this.dataJson.gameState.RUNNING_SPEED;
      this.player.play('walking');
    }else{
      this.player.animations.stop();
      this.player.frame = 3;
    }

    this.carsPool.forEachAlive(function(element){
      console.log(element);
      if((element.x > 860 || element.x < -60)) {
        this.createCar(element);
      }
    }, this);

    if (this.player.top == 0){
      this.level++;
      this.levelLabel.text = this.level;
      this.player.y = this.game.world.height;
    }
  },
  createCar: function (element){
    element.kill();
    new ChickenGame.Car(this.game, this.time.ms, this.levelData, this.pickLane(), this.carsPool);
  },
  pickLane: function (){
    var pick = Math.floor(Math.random()* this.laneFreeList.length);
    this.laneFreeList.splice(pick, 1);
    return this.dataJson.gameState.car_lane[pick].y
  },
  returnGame: function() {
    this.player.y =  this.dataJson.gameState.chicken.y;
    this.numLives --;
    if (this.numLives > 0){
      this.lostLive();
      //TODO: Add a claxon sound or a chicken sound
    }else{
      this.player.kill();
      this.overlay = this.add.bitmapData(this.game.width, this.game.height);
      this.overlay.ctx.fillStyle = '#000';
      this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);

      this.panel = this.add.sprite(0, this.game.height, this.overlay);
      this.panel.alpha = 0.55;

      var gameOverPanel = this.add.tween(this.panel);
      gameOverPanel.to({y: 0}, 500);

      gameOverPanel.onComplete.add(function () {
        this.gameOver();
      }, this);
      gameOverPanel.start();
    }

  },
  lostLive: function (){
    this.lives.children[this.numLives].visible = false;
    this.livesEmpty.children[this.numLives].visible = true;
  },
  gameOver: function (){
    this.game.state.start('GameOverState', true, false, "7");
  }

};

var KittyRun = KittyRun || {};

KittyRun.GameState = {
  init: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.gameConstant = JSON.parse(this.game.cache.getText('constant'));

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.physics.arcade.gravity.y = this.gameConstant.gravity;

    this.floorPool = this.add.group();
    this.platformPool = this.add.group();
    this.coinsPool = this.add.group();
    this.coinsPool.enableBody = true;
    this.myCoins = 0;

  },
  create: function (){
    this.game.stage.backgroundColor = "#fff";

    this.levelData = JSON.parse(this.game.cache.getText('level'));

    this.coinSound = this.add.audio('coin');

    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    this.background.tileScale.y = 3.7;
    this.background.tileScale.x = 1.5;
    this.background.autoScroll(-this.levelData.levelSpeed / 6, 0);
    this.game.world.sendToBack(this.background);

    this.style = {font: '30px Arial', fill:'#fff'};
    this.coinsCountLabel = this.add.text (10, 20, '0', this.style);

    this.water = this.add.tileSprite(0, this.game.world.height - 30, this.game.world.width, 30, 'water');
    this.water.autoScroll(-this.levelData.levelSpeed / 2, 0);

    this.player = this.add.sprite(50,50, 'player', 0);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('running', [0, 1, 2, 3, 2, 1], 15, true);
    this.game.physics.arcade.enable(this.player);

    this.player.body.setSize(38,37, 0, 0);
    this.player.play('running');
    this.player.scale.setTo(-1, 1);

    this.currentPlatform = new KittyRun.Platform(this.game, this.floorPool, 11, 0, 200, this.levelData.tileSize, this.levelData.levelSpeed, this.coinsPool);
    this.platformPool.add(this.currentPlatform);
    this.createPlatform();
  },
  update: function (){
    if (this.player.alive){
      this.platformPool.forEachAlive(function(platform, index){
        this.game.physics.arcade.collide(this.player, platform);
        if(platform.length && platform.children[platform.length -1].right < 0){
          platform.kill();
        }
      }, this);

      this.game.physics.arcade.collide(this.player, this.coinsPool, this.getCoins, null, this);


      if(this.cursors.up.isDown || this.game.input.activePointer.isDown){
        this.playerJump();
      }else if(this.cursors.up.isUp || this.game.input.activePointer.isUp){
        this.isJumping = false;
      }else{

      }

      if(this.player.body.touching.down){
        this.player.body.velocity.x = this.levelData.levelSpeed;
      }else {
        this.player.body.velocity.x = 0;
      }

      /*if (this.cursors.right.isDown ) {
        this.player.body.velocity.x += this.levelData.playerSpeed;
        this.player.play('running');
      }else{
        this.player.animations.stop();
        this.player.frame = 0;
      }*/

      if(this.currentPlatform.length && this.currentPlatform.children[this.currentPlatform.length -1].right < this.game.world.width){
        this.createPlatform();
      }

      this.coinsPool.forEachAlive(function(coin){
        if(coin.right <= 0) {
          coin.kill();
        }
      }, this);
    }

    if (this.player.top >= this.game.world.height || this.player.left <= 0){
      this.gameOver();
    }
  },
  /*render: function() {
    this.game.debug.body(this.player);
    this.game.debug.bodyInfo(this.player, 0, 30);
  },*/
  playerJump: function (){
    if(this.player.body.touching.down){
      this.startJumpY = this.player.y;
      this.isJumping = true;
      this.jumpPeaked = false;

      this.player.body.velocity.y = this.levelData.jumpSpeed;
    }else if (this.isJumping && !this.jumpPeaked){
      var distanceJumped = this.startJumpY - this.player.y;

      if(distanceJumped <= this.levelData.maxJumpDistance){
        this.player.body.velocity.y = this.levelData.jumpSpeed;
      }else{
        this.jumpPeaked = true;
      }
    }
  },
  createPlatform: function(){

    var nextPlatformData = this.generateRandomPlatform();

    if(nextPlatformData) {
      var distance = this.game.world.width;

      //At the beggining the first platform is very separate for the second. Since screen isn't full for the platforms
      //It must draw the platforms nears each others
      if (this.currentPlatform.children[this.currentPlatform.length -1].right < distance - 5){
        distance = this.currentPlatform.children[this.currentPlatform.length -1].right;
      }
      this.currentPlatform = this.platformPool.getFirstDead();
      if (!this.currentPlatform) {
        this.currentPlatform = new KittyRun.Platform(this.game, this.floorPool, nextPlatformData.numTiles, distance + nextPlatformData.separate, nextPlatformData.y, this.levelData.tileSize, this.levelData.levelSpeed, this.coinsPool);
      } else {
        this.currentPlatform.prepare(nextPlatformData.numTiles, distance + nextPlatformData.separate, nextPlatformData.y, this.levelData.tileSize, this.levelData.levelSpeed);
      }

      this.platformPool.add(this.currentPlatform);
    }
  },
  generateRandomPlatform: function(){
    var data = {};
    data.separate = this.levelData.minSeparation + Math.random()*(this.levelData.maxSeparation - this.levelData.minSeparation);

    data.y = this.currentPlatform.children[0].y + (this.levelData.minDiffY) + Math.random() * (this.levelData.maxDiffY - this.levelData.minDiffY);
    data.y = Math.max(150, data.y);
    data.y = Math.min(this.game.world.width - 50, data.y);

    data.numTiles = this.levelData.minTiles + Math.random() * (this.levelData.maxTiles - this.levelData.minTiles);
    return data;
  },
  getCoins: function (player, coin){
    coin.kill();
    this.myCoins ++;

    this.coinSound.play();

    this.coinsCountLabel.text = this.myCoins;
  },
  gameOver: function (){
    this.player.kill();
    this.updateHighscore();

    this.overlay = this.add.bitmapData(this.game.width, this.game.height);
    this.overlay.ctx.fillStyle = '#000';
    this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);

    this.panel = this.add.sprite(0, this.game.height, this.overlay);
    this.panel.alpha = 0.55;

    var gameOverPanel = this.add.tween(this.panel);
    gameOverPanel.to({y: 0}, 500);

    gameOverPanel.onComplete.add(function (){
      this.water.stopScroll();
      this.background.stopScroll();
      var style = {font: '30px Arial', fill:'#fff'};
      this.add.text(this.game.width/2, this.game.height/2, 'GAME OVER', style).anchor.setTo(0.5);
      var style = {font: '20px Arial', fill:'#fff'};
      this.add.text(this.game.width/2, this.game.height/2 + 50, 'High socre: ' + this.highScore, style).anchor.setTo(0.5);
      this.add.text(this.game.width/2, this.game.height/2 + 80, 'Your score: ' + this.myCoins, style).anchor.setTo(0.5);
      var style = {font: '20px Arial', fill:'#fff'};
      this.add.text(this.game.width/2, this.game.height/2 + 120, 'Tap to play again', style).anchor.setTo(0.5);

      this.game.input.onDown.addOnce(this.restart, this);
    }, this);

    gameOverPanel.start();

  },
  restart: function(){
    this.game.world.remove(this.background);
    this.game.world.remove(this.water);
    //this.game.state.start("GameOverState",  true, false, this.myCoins);
    this.game.state.start("GameState",  true, false, this.myCoins);
  },
  updateHighscore: function(){
    this.highScore = +localStorage.getItem('highScore');

    if(this.myCoins > this.highScore) {
      localStorage.setItem('highScore', this.myCoins);
      this.highScore = this.myCoins;
    }
  }

};


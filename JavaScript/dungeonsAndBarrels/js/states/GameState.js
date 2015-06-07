var GameState = {
  init: function (){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    this.game.world.setBounds (0,0, gameConstant.width, gameConstant.world_height);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  create: function (){
    this.game.stage.backgroundColor = "#000";

    this.levelData = JSON.parse(this.game.cache.getText('level'));

    this.ground = this.add.sprite(0, 638, 'ground');
    this.game.physics.arcade.enable(this.ground);
    //console.log(this.ground.body);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.platform = this.add.group();
    this.platform.enableBody = true;

    this.levelData.platformData.forEach(function (element){
      this.platform.create(element.x, element.y, 'platform');
    }, this);

    this.platform.setAll('body.immovable', true);
    this.platform.setAll('body.allowGravity', false);

    this.fire = this.add.group();
    this.fire.enableBody = true;

    var fire;
    this.levelData.fireData.forEach(function (element){
      fire = this.fire.create(element.x, element.y, 'fire', 0);
      fire.animations.add('burning',[0,1], 6, true);
      fire.play('burning');
    }, this);

    this.fire.setAll('body.immovable', true);
    this.fire.setAll('body.allowGravity', false);

    this.barrels = this.add.group();
    this.barrels.enableBody = true;

    this.createBarrel();
    this.barrelCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this)

    /*this.platform = this.add.sprite (0, 300, 'platform');
    this.game.physics.arcade.enable(this.platform);
    this.platform.body.allowGravity = false;
    this.platform.body.immovable = true;*/

    this.goal = this.add.sprite (this.levelData.goal.x, this.levelData.goal.y, 'goal');
    this.game.physics.arcade.enable(this.goal);
    this.goal.body.immovable = true;
    this.goal.body.allowGravity = false;


    this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 3);
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
    this.player.customParams = {};

    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(1, 0);

    this.game.camera.follow(this.player);

    this.createOnScreenControls ();

  },
  update: function (){
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.platform);

    this.game.physics.arcade.overlap(this.player, this.fire, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.goal, this.winGame);

    this.game.physics.arcade.collide(this.barrels, this.platform);
    this.game.physics.arcade.collide(this.barrels, this.ground);

    this.game.physics.arcade.overlap(this.player, this.barrels, this.killPlayer);


    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown || this.player.customParams.moveLeft) {
      this.player.body.velocity.x -= gameConstant.RUNNING_SPEED;
      this.player.scale.setTo(1, 1);
      this.player.play('walking');
    }else if (this.cursors.right.isDown || this.player.customParams.moveRight){
      this.player.body.velocity.x += gameConstant.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking');
    }else {
      this.player.animations.stop();
      this.player.frame = 3;
    }

    if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down){
      this.player.body.velocity.y -= gameConstant.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
    }

    this.barrels.forEach(function(element){
      if(element.x < 10 && element.y > 600) {
        element.kill();
      }
    }, this);
  },
  createOnScreenControls: function (){
    this.leftArrow = this.add.button(20, 638, 'arrowButton');
    this.rightArrow = this.add.button(110, 638, 'arrowButton');
    this.actionButton = this.add.button(280, 638, 'actionButton');

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    this.leftArrow.fixedCamera = true;
    this.rightArrow.fixedCamera = true;
    this.actionButton.fixedCamera = true;

    this.actionButton.events.onInputDown.add(function(){
      this.player.customParams.mustJump = true;

    }, this);

    this.actionButton.events.onInputUp.add(function(){
      this.player.customParams.mustJump = false;

    }, this);

    this.actionButton.events.onInputOver.add(function(){
      this.player.customParams.mustJump = true;

    }, this);

    this.actionButton.events.onInputOut.add(function(){
      this.player.customParams.mustJump = false;

    }, this);

    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.moveRight = true;

    }, this);

    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.moveRight = false;

    }, this);

    this.rightArrow.events.onInputOver.add(function(){
      this.player.customParams.moveRight = true;

    }, this);

    this.rightArrow.events.onInputOut.add(function(){
      this.player.customParams.moveRight = false;

    }, this);

    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.moveLeft = true;

    }, this);

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.moveLeft = false;

    }, this);

    this.leftArrow.events.onInputOver.add(function(){
      this.player.customParams.moveLeft = true;

    }, this);

    this.leftArrow.events.onInputOut.add(function(){
      this.player.customParams.moveLeft = false;

    }, this);
  },
  killPlayer: function(player, fire) {
    game.state.start('GameState');
  },
  winGame: function (){
    alert ('You Win');
    game.state.start('GameState');
  },
  createBarrel: function (){
    var barrel = this.barrels.getFirstExists(false);

    if(!barrel){
      barrel = this.barrels.create(0,0, 'barrel');
    }

    barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
    barrel.body.velocity.x = this.levelData.barrelSpeed;

    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1, 0);
  }

};

var RPG = RPG || {}

RPG.GameState = {
  init: function(currentLevel){
    this.currentLevel = currentLevel ? currentLevel : 'world';

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.gameData = JSON.parse(this.game.cache.getText('constants'));
    this.itemData = JSON.parse(this.game.cache.getText('itemData'));
  },
  create: function (){
    this.game.VirtualPad = this.game.plugins.add(Phaser.Plugin.VirtualPad);

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

    this.initGUI();

    this.items = this.add.group();
    var item = "";
    this.itemData.items.forEach (function (element){
      item = new RPG.Item(this, element.positionX,  element.positionY, element.key, element.parameters);
      this.items.add(item);
    }, this);
  },
  update: function (){

    this.cursorMovement();

  },
  gameOver: function() {
    this.game.state.start('GameOverState', true, false, this.currentLevel);
  },
  render: function (){
     this.game.debug.body(this.player);
  },
  cursorMovement: function (){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.left.isDown || this.player.btnsPressed.left || this.player.btnsPressed.upleft  || this.player.btnsPressed.downleft) {
      this.player.body.velocity.x = -this.gameData.player_speed;
      this.player.play('walk_left');
    }else if (this.cursors.right.isDown || this.player.btnsPressed.right || this.player.btnsPressed.upright  || this.player.btnsPressed.downright) {
      this.player.body.velocity.x = this.gameData.player_speed;
      this.player.play('walk_right');
    }

    if (this.cursors.up.isDown || this.player.btnsPressed.up || this.player.btnsPressed.upright  || this.player.btnsPressed.upleft) {
      this.player.body.velocity.y = -this.gameData.player_speed;
      if (this.cursors.up.isDown || this.player.btnsPressed.up ) {
        this.player.play('walk_up');
      }
    }else if (this.cursors.down.isDown || this.player.btnsPressed.down || this.player.btnsPressed.downright  || this.player.btnsPressed.downleft) {
      this.player.body.velocity.y = this.gameData.player_speed;
      if (this.cursors.down.isDown || this.player.btnsPressed.down ) {
        this.player.play('walk_down');
      }
    }

    if(this.game.input.activePointer.isUp){
      this.game.VirtualPad.stopMovement();
    }

    if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0){
      this.player.animations.stop();
      this.player.frame = this.gameData.initial_frame;
    }
  },
  initGUI: function() {
    this.game.VirtualPad.setup(this.player, {
      left: true,
      right: true,
      up: true,
      down: true,
      upleft: true,
      downleft: true,
      upright: true,
      downright: true,
      action: false
    })
  }

};


var RPG = RPG || {}

RPG.GameState = {
  init: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.world.setBounds (0,0, gameConstant.world_width, gameConstant.world_height);
    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  create: function (){
    this.game.stage.backgroundColor = "#000";

    this.levelData = JSON.parse(this.game.cache.getText('level'));

    this.player = this.add.sprite(100, 200, 'player', 91);

  },
  update: function (){

  }

};


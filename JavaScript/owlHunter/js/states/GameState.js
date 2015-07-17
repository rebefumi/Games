var OWL = OWL || {}

OWL.GameState = {
  init: function (currentLevel) {
    this.currentLevel = currentLevel ? currentLevel : 'world';

    this.game.world.setBounds (0,0, gameConstant.world_width, gameConstant.world_height);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.physics.arcade.gravity.y = 0;

    this.gameData = JSON.parse(this.game.cache.getText('constant'));
  },
  create: function (){
    this.game.stage.backgroundColor = "#000";

  },
  update: function (){

  },
  gameOver: function () {
    this.game.state.start('GameState', true, false, this.currentLevel);
  },
  render: function () {
    //this.game.debug.body(this.player);
  }

};


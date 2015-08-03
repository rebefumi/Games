var emoti = emoti || {}

emoti.GameState = {
init: function (currentLevel) {
    this.currentLevel = currentLevel ? currentLevel : 'world';

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.gameData = JSON.parse(this.game.cache.getText('constant'));
  },
  create: function (){
      this.background = this.add.sprite(0, 0, 'background');
      this.board = new emoti.Board(this, this.gameData.NUM_ROWS, this.gameData.NUM_COLS, this.gameData.NUM_VARIATIONS);
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


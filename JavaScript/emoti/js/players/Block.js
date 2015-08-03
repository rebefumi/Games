var emoti = emoti || {};

emoti.Block = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  this.game = state.game;
  this.state = state;

  this.anchor.setTo(0.5);

};

emoti.Block.prototype = Object.create(Phaser.Sprite.prototype);
emoti.Block.prototype.constructor = emoti.Block;


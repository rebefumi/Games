var RPG = RPG || {}

RPG.Item = function (state, x, y, key, data){
    Phaser.Sprite.call(this, state.game, x, y, key, state.gameData.initial_frame);

    this.state = state;
    this.game = state.game;
    this.data = Object.create(data);
    this.gameData = state.gameData;

    this.game.physics.arcade.enable(this);
};

RPG.Item.prototype = Object.create(Phaser.Sprite.prototype);
RPG.Item.prototype.constructor = RPG.Item;


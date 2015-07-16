var RPG = RPG || {}

RPG.Icon = function (state, x, y, key) {
    Phaser.Sprite.call(this, state.game, x, y, key);

    this.state = state;
    this.game = state.game;

    this.fixedToCamera = true;

};

RPG.Icon.prototype = Object.create(Phaser.Sprite.prototype);
RPG.Icon.prototype.constructor = RPG.Icon;


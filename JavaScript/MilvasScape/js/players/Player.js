var RPG = RPG || {}

RPG.Player = function (state, x, y, data){
    Phaser.Sprite.call(this, state.game, x, y, 'player', state.gameData.initial_frame);

    this.state = state;
    this.game = state.game;
    this.data = data;
    this.gameData = state.gameData;
    this.anchor.setTo(0.5);


    this.animations.add('walk_right', this.gameData.animation_walk_right, this.gameData.frames, true);
    this.animations.add('walk_up', this.gameData.animation_walk_up,  this.gameData.frames, true);
    this.animations.add('walk_left', this.gameData.animation_walk_left,  this.gameData.frames, true);
    this.animations.add('walk_down', this.gameData.animation_walk_down,  this.gameData.frames, true);

    this.game.physics.arcade.enable(this);
    this.body.setSize(this.gameData.player_body.x, this.gameData.player_body.y, null, (this.height-this.gameData.player_body.y)/6);
    this.scale.setTo(0.5);
};

RPG.Player.prototype = Object.create(Phaser.Sprite.prototype);
RPG.Player.prototype.constructor = RPG.Player;


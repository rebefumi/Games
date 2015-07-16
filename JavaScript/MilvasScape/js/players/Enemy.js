var RPG = RPG || {};

RPG.Enemy = function(state, x, y, key, data) {
  Phaser.Sprite.call(this, state.game, x, y, key);

  this.state = state;
  this.game = state.game;
  this.data = Object.create(data);
  this.anchor.setTo(0.5);

  this.data.attack = +this.data.attack;
  this.data.defense = +this.data.defense;
  this.data.health = +this.data.health;

  this.healthBar = new RPG.HealthBar(state, this.x, this.y, 'bar', this.data.health);
  this.game.add.existing(this.healthBar);

  this.game.physics.arcade.enable(this);
  this.body.immovable = true;
};

RPG.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
RPG.Enemy.prototype.constructor = RPG.Enemy;

RPG.Enemy.prototype.update = function() {
  this.healthBar.x = this.x;
  this.healthBar.y = this.y - 25;

  this.healthBar.body.velocity = this.body.velocity;
};


RPG.Enemy.prototype.kill = function() {
  Phaser.Sprite.prototype.kill.call(this);
  this.healthBar.kill();
}
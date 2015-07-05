var zombieAttack = zombieAttack || {};

zombieAttack.Bullet = function(state, x, y) {
  Phaser.Sprite.call(this, state.game, x, y, 'bullet');

  this.state = state;
  this.game = state.game;

  Phaser.Sprite.call(this, this.game, x, y, 'bullet');

  this.game.physics.arcade.enable(this);
  this.body.velocity.x = 100;
};

zombieAttack.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
zombieAttack.Bullet.prototype.constructor = zombieAttack.Bullet;

zombieAttack.Bullet.prototype.update = function(){
  //kill bullets that leave the screen
  if(this.x >= this.game.width) {
    this.kill();
  }
};
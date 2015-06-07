var SpaceShooter = SpaceShooter || {}

SpaceShooter.EnemyBullet = function (game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'bullet');

    this.anchor.setTo (0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

};

SpaceShooter.EnemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
SpaceShooter.EnemyBullet.prototype.constructor = SpaceShooter.EnemyBullet;
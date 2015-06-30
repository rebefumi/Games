var skylander = skylander || {}

skylander.Enemy = function (game, x, y, key, velocity, animation, tilemap){
    Phaser.Sprite.call(this, game, x, y, key);

    this.game = game;
    this.tilemap = tilemap;
    this.anchor.setTo(0.5);

    if(velocity === undefined) {
        velocity = (40 + Math.random() * 20) * (Math.random() < 0.5 ? 1 : -1);
    }

    if (animation){
        this.animations.add(animation, [0, 1], 6, true);
        this.play(animation);
    }

    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1, 0);
    this.body.velocity.x = velocity;
    this.body.setSize(this.width - (this.width /2), this.height - (this.height / 2), this.widht/4, this.height/4);
}

skylander.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
skylander.Enemy.prototype.constructor = skylander.Enemy;

skylander.Enemy.prototype.update = function(){

    var direction;

    if(this.body.velocity.x > 0){
        this.scale.setTo(-1,1);
        direction = 1;
    }
    else {
        this.scale.setTo(1, 1);
        direction = -1;
    }

    var nextX = this.x + direction * (Math.abs(this.width)/2 + 1);
    var nextY = this.bottom + 1;

    var nextTile = this.tilemap.getTileWorldXY(nextX, nextY, this.tilemap.tileWidth, this.tilemap.tileHeight, 'CollisionLayer');

    if(!nextTile && this.body.blocked.down) {
        this.body.velocity.x *= -1;
    }
};
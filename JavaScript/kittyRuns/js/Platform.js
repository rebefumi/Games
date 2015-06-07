var KittyRun = KittyRun || {};

KittyRun.Platform = function(game, floorPool, numTiles, x, y, size, speed, coinsPool) {
    Phaser.Group.call(this, game);
    this.game = game;
    this.enableBody = true;
    this.floorPool = floorPool;
    this.coinsPool = coinsPool;

    this.prepare(numTiles, x, y, size, speed);

};

KittyRun.Platform.prototype = Object.create(Phaser.Group.prototype);
KittyRun.Platform.prototype.constructor = KittyRun.Platform;

KittyRun.Platform.prototype.prepare = function (numTiles, x, y, size, speed){
    this.alive = true;

    var i = 0;
    while(i < numTiles){
        var floorTile = this.floorPool.getFirstExists(false);
        if (!floorTile) {
            floorTile = new Phaser.Sprite(this.game, x + i * size, y, 'floor');
        }else{
            floorTile.reset(x + i * size, y);
        }
        this.add(floorTile);

        i++;
    }

    this.setAll('body.immovable', true);
    this.setAll('body.allowGravity', false);
    this.setAll('body.velocity.x', -speed);


    new KittyRun.Coins(this.game, this.coinsPool, this);
};

KittyRun.Platform.prototype.kill = function() {
    this.alive = false;
    this.callAll('kill');

    var sprites = [];
    this.forEach(function (tile){
        sprites.push(tile);
    }, this);

    sprites.forEach(function (tile){
        this.floorPool.add(tile);
    }, this);
};
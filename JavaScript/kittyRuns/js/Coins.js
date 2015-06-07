var KittyRun = KittyRun || {};

KittyRun.Coins = function (game, coinsPool, platform){
    this.game = game;
    this.coinsPool = coinsPool;
    this.platform = platform;
    this.levelData = JSON.parse(this.game.cache.getText('level'));

    this.prepare();
};

KittyRun.Coins.prototype = Object.create(Phaser.Group.prototype);
KittyRun.Coins.prototype.constructor = KittyRun.Coins;

KittyRun.Coins.prototype.prepare = function (){
    var coinsY = this.levelData.minHeightCoin + Math.random() * this.levelData.maxHeightCoin;

    var hasCoin;
    this.platform.forEach(function(tile){
        hasCoin = Math.random() <= this.levelData.drawCoinPercent;

        if(hasCoin) {
            var coin = this.coinsPool.getFirstExists(false);

            if(!coin) {
                coin =  new Phaser.Sprite(this.game, tile.x, tile.y - coinsY, 'coin');
                this.coinsPool.add(coin);
            }
            else {
                coin.reset(tile.x, tile.y - coinsY);
            }

            coin.body.velocity.x = -this.levelData.levelSpeed;
            coin.body.allowGravity = false;
        }
    }, this);
}
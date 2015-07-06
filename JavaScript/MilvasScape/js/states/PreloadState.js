var RPG = RPG || {}

RPG.PreloadState = {
    preload: function (){
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        if (!this.loadLevel) {
            //load all images
            this.load.image('backHome', 'assets/images/backHome.jpg');
            this.load.image('title', 'assets/images/title.png');

            this.load.spritesheet('player', 'assets/images/player.png', 64, 64, 273);

            this.load.text('constants', 'assets/data/constants.json');

            //load game assets
            this.load.image('sword', 'assets/images/attack-icon.png');
            this.load.image('quest', 'assets/images/quest-button.png');
            this.load.image('chest', 'assets/images/chest-gold.png');
            this.load.image('coin', 'assets/images/coin.png');
            this.load.image('potion', 'assets/images/potion.png');
            this.load.image('shield', 'assets/images/shield.png');
            this.load.image('scroll', 'assets/images/scroll-skull.png');
            this.load.image('strangeItem', 'assets/images/gods-helmet.png');

            this.load.image('monster', 'assets/images/demon.png');
            this.load.image('dragon', 'assets/images/goldendragon.png');
            this.load.image('snake', 'assets/images/snake.png');
            this.load.image('skeleton', 'assets/images/swordskeleton.png');
            this.load.image('sword', 'assets/images/attack-icon.png');

            this.load.image('tilesheet', 'assets/images/terrains.png');


        }
        //load map
        this.load.tilemap(this.currentLevel, 'assets/data/' + this.currentLevel + '.json', null, Phaser.Tilemap.TILED_JSON);
    },
    init: function (level){
        this.currentLevel = level || 'world';
        this.loadLevel = level ? true : false;
    },
    create: function (){
        if (this.loadLevel){
            this.state.start('GameState', true, false, this.currentLevel)
        }else {
            this.state.start('HomeState');
        }
    }
};
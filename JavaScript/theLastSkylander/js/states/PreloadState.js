var skylander = skylander || {}

skylander.PreloadState = {
    preload: function (){
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //load all images
        this.load.image('backHome', 'assets/images/backHome.jpg');
        //load json
        this.load.text('constants', 'assets/data/constants.json');

        //this.load.image('platform', 'assets/images/platform.png');
        //this.load.image('goal', 'assets/images/goal.png');
        //this.load.image('slime', 'assets/images/slime.png');
        this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 27, 48, 9, 0, 36);
        //this.load.spritesheet('fly', 'assets/images/fly_spritesheet.png', 35, 18, 2, 1, 2);
        this.load.image('arrowButton', 'assets/images/arrowButton.png');
        this.load.image('actionButton', 'assets/images/actionButton.png');

        this.load.image('tilesheet', 'assets/images/tiles_spritesheet.png');
        this.load.image('decoration', 'assets/images/toad.png');
        this.load.tilemap('level1', 'assets/data/level1.json', null, Phaser.Tilemap.TILED_JSON);

    },
    create: function (){
        this.state.start('HomeState');
    }
};
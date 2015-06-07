var KittyRun = KittyRun || {};

KittyRun.PreloadState = {
    preload: function (){
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //load all images
        this.load.image('background_home', 'assets/images/background_home.jpg');
        this.load.image('background_over', 'assets/images/background_over.png');

        //load json
        this.load.text('level', 'assets/data/level.json');
        this.load.text('constant', 'assets/data/constant.json');

        //load game assets
        this.load.image('title', 'assets/images/kitty_title.png');
        this.load.image('playerDead', 'assets/images/player_dead.png');
        this.load.image('floor', 'assets/images/floor.png');
        this.load.image('water', 'assets/images/water.png');
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('player', 'assets/images/cat_sheet.png', 41, 39, 5);
        this.load.audio('coin', ['assets/audio/coin.mp3', 'assets/audio/coin.ogg']);
    },
    create: function (){
        this.state.start('HomeState');
    }
};
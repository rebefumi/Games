var PreloadState = {
    preload: function (){
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //load all images
        this.load.image('home_background', 'assets/images/home_background.jpg');

        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('goal', 'assets/images/gorilla3.png');
        this.load.image('arrowButton', 'assets/images/arrowButton.png');
        this.load.image('actionButton', 'assets/images/actionButton.png');
        this.load.image('barrel', 'assets/images/barrel.png');

        this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
        this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);

        this.load.text('level', 'assets/data/level.json');
    },
    create: function (){
        this.game.stage.backgroundColor = "#000";
        this.state.start('HomeState');
    }
};
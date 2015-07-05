var RPG = RPG || {}

RPG.PreloadState = {
    preload: function (){
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //load all images
        this.load.image('backHome', 'assets/images/backHome.jpg');
        this.load.image('title', 'assets/images/title.png')
        //load json
        this.load.text('level', 'assets/data/level.json');
    },
    create: function (){
        this.state.start('HomeState');
    }
};
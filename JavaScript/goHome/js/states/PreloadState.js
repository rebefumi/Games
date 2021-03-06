var ChickenGame = ChickenGame || {};

ChickenGame.PreloadState = {
    preload: function (){
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.text('level', 'assets/data/level.json');
        this.load.text('constant', 'assets/data/constant.json');

        //load all images
        this.load.image('home_background', 'assets/images/farm_landscape.png');
        this.load.image('home_title', 'assets/images/go_home.png');
        this.load.image('background', 'assets/images/road.png');
        this.load.image('live_empty', 'assets/images/live_empty.png');
        this.load.image('live', 'assets/images/live_full.png');
        this.load.image('background', 'assets/images/road.png');

        this.load.spritesheet('car', 'assets/images/spreadsheet.png', 81, 40, 11, 0 , 0);

        this.load.spritesheet('chicken', 'assets/images/chicken_sprite.png', 27, 40, 4);

    },
    create: function (){
        this.state.start('HomeState');
    }
};
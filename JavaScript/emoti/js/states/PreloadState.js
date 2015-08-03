var emoti = emoti || {}

emoti.PreloadState = {
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

            this.load.image('block1', 'assets/images/icon1.png');
            this.load.image('block2', 'assets/images/icon2.png');
            this.load.image('block3', 'assets/images/icon3.png');
            this.load.image('block4', 'assets/images/icon4.png');
            this.load.image('block5', 'assets/images/icon5.png');
            this.load.image('block6', 'assets/images/icon6.png');
            this.load.image('block7', 'assets/images/icon7.png');
            this.load.image('block8', 'assets/images/icon8.png');
            this.load.image('deadBlock', 'assets/images/icon_dead.png');
            this.load.image('background', 'assets/images/background.png');

            //load json
            this.load.text('constant', 'assets/data/constants.json');
        }
        //load level
        //this.load.text(this.currentLevel, 'assets/data/'+ this.currentLevel +'.json');

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
var OWL = OWL || {}

OWL.PreloadState = {
    preload: function (){
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //load all images
        this.load.image('backHome', 'assets/images/backHome.png');
        this.load.image('title', 'assets/images/title.png');

        this.load.image('box', 'assets/images/box.png');
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('pole', 'assets/images/pole.png');
        this.load.image('chicken', 'assets/images/bird.png');
        this.load.image('floor', 'assets/images/floor.png');
        this.load.image('concreteBox', 'assets/images/concrete-box.png');
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('mouse', 'assets/images/mouse.png');
        this.load.image('owl', 'assets/images/owl.png');

        //load json
        this.load.text('constants', 'assets/data/constants.json');

        this.load.text('level1', 'assets/data/level1.json');

    },
    create: function (){
        this.state.start('HomeState');
    }
};
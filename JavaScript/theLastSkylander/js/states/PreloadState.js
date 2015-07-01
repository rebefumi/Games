var skylander = skylander || {}

skylander.PreloadState = {
    preload: function (){

            this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.logo.anchor.setTo(0.5);

            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
            this.preloadBar.anchor.setTo(0.5);
            this.load.setPreloadSprite(this.preloadBar);

        if (!this.loadLevel){
            //load all images
            this.load.image('backHome', 'assets/images/backHome.jpg');
            //load json
            this.load.text('constants', 'assets/data/constants.json');

            this.load.image('text', 'assets/images/skylander_text.png');
            this.load.image('goal', 'assets/images/goal.png');
            this.load.image('frog', 'assets/images/frog.png');

            this.load.image('heart', 'assets/images/heart.png');

            this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 23, 40, 8, 0, 0);
            this.load.spritesheet('plant', 'assets/images/enemy.png', 50, 58, 4, 0, 1);
            this.load.image('arrowButton', 'assets/images/arrowButton.png');
            this.load.image('actionButton', 'assets/images/actionButton.png');

            this.load.image('tilesheet', 'assets/images/tiles_spritesheet.png');
            this.load.image('decoration', 'assets/images/toad.png');
        }
        this.load.tilemap(this.currentLevel, 'assets/data/' + this.currentLevel + '.json', null, Phaser.Tilemap.TILED_JSON);

    },
    init: function (level){
        this.currentLevel = level || 'level1';
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
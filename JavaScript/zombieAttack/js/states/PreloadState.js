var zombieAttack = zombieAttack || {}

zombieAttack.PreloadState = {
    preload: function (){
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //load all images
        this.load.image('backHome', 'assets/images/backHome.jpg');
        this.load.image('text', 'assets/images/title.png');

        this.load.image('background', 'assets/images/background.png');
        this.load.image('chilliButton', 'assets/images/button_chilli.png');
        this.load.image('sunflowerButton', 'assets/images/button_sunflower.png');
        this.load.image('plantButton', 'assets/images/button_plant.png');

        this.load.image('bloodParticle', 'assets/images/blood.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('sunflower', 'assets/images/sunflower.png');
        this.load.image('chilli', 'assets/images/chilli.png');
        this.load.image('deadZombie', 'assets/images/dead_zombie.png');
        this.load.spritesheet('chicken', 'assets/images/chicken_sheet.png', 25, 25, 3, 1, 2);
        this.load.spritesheet('zombie', 'assets/images/zombie_sheet.png', 30, 50, 3, 1, 2);
        this.load.spritesheet('plant', 'assets/images/plant_sheet.png', 24, 40, 3, 1, 2);
        this.load.spritesheet('sun', 'assets/images/sun_sheet.png', 30, 30, 2, 1, 2);

        this.load.audio('hit', ['assets/audio/hit.mp3', 'assets/audio/hit.ogg']);

        //load json
        this.load.text('constants', 'assets/data/constants.json');
        this.load.text('buttonData', 'assets/data/buttons.json');
        this.load.text('level1', 'assets/data/level1.json');
        this.load.text('level2', 'assets/data/level2.json');
    },
    create: function (){
        this.state.start('HomeState');
    }
};
var KittyRun = KittyRun || {};

KittyRun.HomeState = {
    create: function (){
        var background = this.game.add.sprite(0,0, 'background_home');
        background.height = this.game.height;
        background.width = this.game.width;

        var title = this.game.add.sprite(250, 80, 'title');
        background.inputEnabled = true;

        var style = {font:'20px Arial', fill: 'blue'};
        this.game.add.text(50, this.game.world.height - 120, 'jump: press left mouse', style);
        this.game.add.text(50, this.game.world.height - 100, 'jump higher: hold press', style);

        var style = {font:'40px Arial', fill: '#fff'};
        this.game.add.text(this.game.world.centerX, this.game.world.height - 100, 'TOUCH TO START', style);
        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);
    }

};
var SpaceShooter = SpaceShooter || {};

SpaceShooter.HomeState = {
   init: function (message) {
        this.message = message;
    },
    create: function (){
        var background = this.game.add.sprite(0,0, 'background_space');
        background.inputEnabled = true;
        var style = {font:'35px Arial', fill: 'yellow'};
        this.game.add.text(80, this.game.world.centerY , 'TOUCH TO START', style);
        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);
    }

};
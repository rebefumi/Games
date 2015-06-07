var HomeState = {
    init: function (message) {
        this.message = message;
    },
    create: function (){
        var background = this.game.add.sprite(0,0, 'home_background');
        background.height = this.game.height;
        background.inputEnabled = true;
        var style = {font:'35px Arial', fill: 'red'};
        this.game.add.text(30, this.game.world.centerY , 'TOUCH TO START', style);
        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);
    }

};
var OWL = OWL || {}

OWL.HomeState = {
    create: function (){
        var background = this.game.add.sprite(0,0, 'label');
        background.inputEnabled = true;
        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);

        var title = this.game.add.sprite(0, 0, 'title');

        var style = {font:'18px Arial', fill: '#fff'};
        this.game.add.text(this.game.world.centerX + 50, this.game.world.height - 50, 'TOUCH TO START', style);


        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);
    }
};
var emoti = emoti || {}

emoti.HomeState = {
    create: function (){
        var background = this.game.add.sprite(0,0, 'backHome');
        background.inputEnabled = true;
        background.x = 0;
        background.y = 0;
        background.height = this.game.height;
        background.width = this.game.width;
        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);

        var title = this.game.add.sprite(20, this.game.world.centerY - 50, 'title');

        var style = {font:'18px Arial', fill: '#444'};
        this.game.add.text(this.game.world.centerX + 10, this.game.world.height - 50, 'TOUCH TO START', style);


        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);
    }

};
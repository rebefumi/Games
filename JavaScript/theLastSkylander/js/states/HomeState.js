var skylander = skylander || {}

skylander.HomeState = {
    create: function (){
        var background = this.game.add.sprite(0,0, 'backHome');
        background.inputEnabled = true;
        background.width = this.game.width;
        background.height = this.game.height;
        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);
    }

};    
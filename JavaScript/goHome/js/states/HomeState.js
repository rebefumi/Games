var ChickenGame = ChickenGame || {};

ChickenGame.HomeState = {
    init: function (someVariable) {
        this.mVar = someVariable;
    },
    create: function (){
        var dataJson = JSON.parse(this.game.cache.getText('constant'));
        var background = this.game.add.sprite(0,0, 'home_background');
        var title = this.game.add.sprite(dataJson.homeState.title.x, dataJson.homeState.title.y, 'home_title');
        background.inputEnabled = true;
        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);

        var style = {font:'35px Arial bold', fill: '#000'};
        this.game.add.text(this.game.world.centerX + dataJson.homeState.initMessage.x, this.game.world.centerY + dataJson.homeState.initMessage.y, 'TOUCH TO START', style);
    }

};
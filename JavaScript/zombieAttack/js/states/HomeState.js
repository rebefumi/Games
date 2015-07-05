var zombieAttack = zombieAttack || {}

zombieAttack.HomeState = {
    create: function (){
        var background = this.game.add.sprite(0,0, 'backHome');
        background.inputEnabled = true;
        background.width = this.game.width;
        background.height = this.game.height;

        var title = this.game.add.sprite(100, 40, 'text');

        var style = {font:'18px Arial', fill: '#fff'};
        this.game.add.text(this.game.world.centerX + 50, this.game.world.height - 50, 'TOUCH TO START', style);

        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);
    }

};
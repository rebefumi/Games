var ChickenGame = ChickenGame || {};

ChickenGame.GameOverState = {
    init: function (someVariable) {
        this.level = someVariable;
    },
    create: function (){
            var style = {font: '30px Arial', fill:'#fff'};
            this.add.text(this.game.width/2, this.game.height/2, 'GAME OVER', style).anchor.setTo(0.5);
            var style = {font: '20px Arial', fill:'#fff'};
            this.add.text(this.game.width/2, this.game.height/2 + 50, 'Score: ' + this.level, style).anchor.setTo(0.5);
            var style = {font: '20px Arial', fill:'#fff'};
            this.add.text(this.game.width/2, this.game.height/2 + 120, 'Tap to play again', style).anchor.setTo(0.5);

            this.game.input.onDown.addOnce(this.restart, this);

    },
    restart: function (){
        this.game.state.start("GameState");
    }

};
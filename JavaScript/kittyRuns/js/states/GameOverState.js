var KittyRun = KittyRun || {};

KittyRun.GameOverState = {
    init: function (score) {
        this.score = score;
    },
    create: function(){
        var background = this.game.add.sprite(0, 0, 'background_over');
        background.height = this.game.height;
        background.width = this.game.width;
        var highScore = +localStorage.getItem('highScore');

        var style = {font: '30px Arial', fill:'#fff'};
        this.scoreLabel = this.game.add.text (200, 250, "SCORE: " + this.score, style);
        this.highscoreLabel = this.game.add.text(200, 400, "HIGHSCORE: "  +highScore, style);

        background.inputEnabled = true;
        background.events.onInputDown.add(function (){
            this.state.start('GameState');
        }, this);
    }
}



var OWL = OWL || {}

var gameConstant = {
    width: 1080,
    height: 640
}

OWL.game = new Phaser.Game(gameConstant.width, gameConstant.height, Phaser.AUTO);

OWL.game.state.add('GameState', OWL.GameState);
OWL.game.state.add('HomeState', OWL.HomeState);
OWL.game.state.add('PreloadState', OWL.PreloadState);
OWL.game.state.add('BootState', OWL.BootState);
OWL.game.state.add('GameOverState', OWL.GameOverState);
OWL.game.state.start('BootState');

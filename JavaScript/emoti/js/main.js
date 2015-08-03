var emoti = emoti || {}

var gameConstant = {
    width: 360,
    height: 460
}

emoti.game = new Phaser.Game(gameConstant.width, gameConstant.height, Phaser.AUTO);

emoti.game.state.add('GameState', emoti.GameState);
emoti.game.state.add('HomeState', emoti.HomeState);
emoti.game.state.add('PreloadState', emoti.PreloadState);
emoti.game.state.add('BootState', emoti.BootState);
emoti.game.state.add('GameOverState', emoti.GameOverState);
emoti.game.state.start('BootState');

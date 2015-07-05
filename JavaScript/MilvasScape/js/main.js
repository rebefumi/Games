var RPG = RPG || {}

var gameConstant = {
    width: 480,
    height: 320
}

RPG.game = new Phaser.Game(gameConstant.width, gameConstant.height, Phaser.AUTO);

RPG.game.state.add('GameState', RPG.GameState);
RPG.game.state.add('HomeState', RPG.HomeState);
RPG.game.state.add('PreloadState', RPG.PreloadState);
RPG.game.state.add('BootState', RPG.BootState);
RPG.game.state.add('GameOverState', RPG.GameOverState);
RPG.game.state.start('BootState');

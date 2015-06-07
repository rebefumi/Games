var ChickenGame = ChickenGame || {};

var gameConstant = {
    width: 800,
    height: 600
}

ChickenGame.game = new Phaser.Game(gameConstant.width, gameConstant.height, Phaser.AUTO);

ChickenGame.game.state.add('GameState', ChickenGame.GameState);
ChickenGame.game.state.add('HomeState', ChickenGame.HomeState);
ChickenGame.game.state.add('PreloadState', ChickenGame.PreloadState);
ChickenGame.game.state.add('BootState', ChickenGame.BootState);
ChickenGame.game.state.add('GameOverState', ChickenGame.GameOverState);
ChickenGame.game.state.start('BootState');

var SpaceShooter = SpaceShooter || {};

var gameConstant = {
    width: 450,
    height: 600, 
}

SpaceShooter.game = new Phaser.Game(gameConstant.width, gameConstant.height, Phaser.AUTO);

SpaceShooter.game.state.add('GameState', SpaceShooter.GameState);
SpaceShooter.game.state.add('HomeState', SpaceShooter.HomeState);
SpaceShooter.game.state.add('PreloadState', SpaceShooter.PreloadState);
SpaceShooter.game.state.add('BootState', SpaceShooter.BootState);
SpaceShooter.game.state.start('BootState');

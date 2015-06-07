var gameConstant = {
    width: 360,
    height: 592,
    RUNNING_SPEED: 180,
    JUMPING_SPEED: 550,
    world_height: 700
}

var game = new Phaser.Game(gameConstant.width, gameConstant.height, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.start('BootState');

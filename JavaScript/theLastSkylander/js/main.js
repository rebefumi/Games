var skylander = skylander || {}

var gameConstant = {
    width: 480,
    height: 360
}

skylander.game = new Phaser.Game(gameConstant.width, gameConstant.height, Phaser.AUTO);

skylander.game.state.add('HomeState', skylander.HomeState);
skylander.game.state.add('PreloadState', skylander.PreloadState);
skylander.game.state.add('BootState', skylander.BootState);
skylander.game.state.add('GameState', skylander.GameState);
skylander.game.state.add('GameOverState', skylander.GameOverState);
skylander.game.state.start('BootState');

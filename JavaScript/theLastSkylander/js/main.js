var skylander = skylander || {}

var gameConstant = {
    width: 700,
    height: 350
}

skylander.dim = skylander.getGameLandscapeDimensions(gameConstant.width, gameConstant.height);

skylander.game = new Phaser.Game(skylander.dim.w, skylander.dim.h, Phaser.AUTO);

skylander.game.state.add('HomeState', skylander.HomeState);
skylander.game.state.add('PreloadState', skylander.PreloadState);
skylander.game.state.add('BootState', skylander.BootState);
skylander.game.state.add('GameState', skylander.GameState);
skylander.game.state.add('GameOverState', skylander.GameOverState);
skylander.game.state.start('BootState');

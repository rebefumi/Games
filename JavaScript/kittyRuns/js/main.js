var KittyRun = KittyRun || {};

var gameConstant = {
    width: 800,
    height: 600
}

KittyRun.game = new Phaser.Game(gameConstant.width, gameConstant.height, Phaser.CANVAS);

KittyRun.game.state.add('GameState', KittyRun.GameState);
KittyRun.game.state.add('HomeState', KittyRun.HomeState);
KittyRun.game.state.add('PreloadState', KittyRun.PreloadState);
KittyRun.game.state.add('BootState', KittyRun.BootState);
KittyRun.game.state.add('GameOverState', KittyRun.GameOverState);
KittyRun.game.state.start('BootState');

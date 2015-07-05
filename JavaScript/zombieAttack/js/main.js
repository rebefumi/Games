var zombieAttack = zombieAttack || {}

var gameConstant = {
    width: 480,
    height: 320
}

zombieAttack.game = new Phaser.Game(gameConstant.width, gameConstant.height, Phaser.AUTO);

zombieAttack.game.state.add('GameState', zombieAttack.GameState);
zombieAttack.game.state.add('HomeState', zombieAttack.HomeState);
zombieAttack.game.state.add('PreloadState', zombieAttack.PreloadState);
zombieAttack.game.state.add('BootState', zombieAttack.BootState);
zombieAttack.game.state.add('GameOverState', zombieAttack.GameOverState);
zombieAttack.game.state.start('BootState');

var ChickenGame = ChickenGame || {};

ChickenGame.CarPolice = function (game, levelData){
    this.game = game;
    this.velocity = levelData.car_type[levelData.cars_color[10]].velocity;

    Phaser.Sprite.call(this, this.game, -100, 280, 'car', 10);
    this.anchor.setTo(0,0);
    game.physics.arcade.enable(this);
    this.alive = false;
};

ChickenGame.CarPolice.prototype = Object.create(Phaser.Sprite.prototype);
ChickenGame.CarPolice.prototype.constructor = ChickenGame.CarPolice;

ChickenGame.CarPolice.prototype.setDirection = function (){
    direction = this.pickDirection();
    this.x =  (direction == 1 ? 3 : game.world.width - 4);
    this.scale.setTo(direction, 1);
}

ChickenGame.CarPolice.prototype.pickDirection = function  (){
    return Math.floor(Math.random()*2)? -1: 1;
}

ChickenGame.CarPolice.prototype.updateCarPolice = function (){
    var direction = this.pickDirection();
    var xPosition = (direction == 1 ? 3 : this.game.world.width - 4);
    this.x = xPosition;
    this.scale.setTo(direction, 1);
    this.body.velocity.x = direction * this.velocity;
}
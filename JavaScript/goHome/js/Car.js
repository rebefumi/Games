var ChickenGame = ChickenGame || {};


ChickenGame.Car = function (game, time, levelData, lane){
    this.game = game;
    this.time = time;
    this.carJson = levelData;
    this.direction = 1;

    this.prepare(lane);

};

ChickenGame.Car.prototype = Object.create(Phaser.Sprite.prototype);
ChickenGame.Car.prototype.constructor = ChickenGame.Car;

ChickenGame.Car.prototype.prepare = function (lane){
    var color = this.pickColor();
    var direction = this.pickDirection();

    Phaser.Sprite.call(this, this.game, this.xPosition, lane, 'car', color);
    this.direction = direction;
    this.anchor.setTo(1,0);
}

ChickenGame.Car.prototype.cloneCar = function (){
    
};

ChickenGame.Car.prototype.pickColor = function (){
    var color = Math.floor(Math.random()*this.carJson.cars_color.length) + 1;
    return color;
};

ChickenGame.Car.prototype.pickDirection = function (){
    left = (Math.floor(Math.random()*2))? false : true;
    this.xPosition = left ? 3 : this.game.world.width - 4;
    return left ? 1 : -1;

};


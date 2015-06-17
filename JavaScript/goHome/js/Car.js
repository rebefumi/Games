var ChickenGame = ChickenGame || {};


ChickenGame.Car = function (game, time, levelData, lane, carsPool){
    this.game = game;
    this.time = time;
    this.carsPool = carsPool;
    this.carJson = levelData;
    this.direction = 1;
    this.prepare(lane);
};

ChickenGame.Car.prototype = Object.create(Phaser.Group.prototype);
ChickenGame.Car.prototype.constructor = ChickenGame.Car;

ChickenGame.Car.prototype.prepare = function (lane){
    var car = this.carsPool.getFirstExists(false);
    var color = this.pickColor();
    if(!car) {
        car =  new Phaser.Sprite(this.game, this.pickDirection(), lane, 'car', color);
        car.anchor.setTo(1,0);
        car.lane = lane;
        this.carsPool.add(car);
    }
    else {
        car.reset(this.pickDirection(), lane, this.carJson.cars_color[color]);
    }

    car.scale.setTo(this.direction, 1);
    car.body.velocity.x = this.direction * this.carJson.car_type[this.carJson.cars_color[color-1]].velocity;

}

ChickenGame.Car.prototype.pickColor = function (){
    var color = Math.floor(Math.random()*this.carJson.cars_color.length) + 1;
    return color;
};

ChickenGame.Car.prototype.reset = function (x, y, lane){
    this.reset(x,y);
    this.Sprite.loadTexture(color);
}

ChickenGame.Car.prototype.pickDirection = function (){
    var random = Math.floor(Math.random()*2);
    console.log(random);
    var left = true;
    if (random){
        left = false;
    }

    if (left){
        this.direction = 1;
        return 3;
    }else{
        this.direction = -1;
        return  this.game.world.width - 4;
    }
};


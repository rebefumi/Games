var zombieAttack = zombieAttack || {};

zombieAttack.Plant = function(state, x, y, data, patch) {
  Phaser.Sprite.call(this, state.game, x, y, data.plantAsset);
  
  this.state = state;
  this.game = state.game;

  this.bullets = state.bullets;
  this.suns = state.suns;

  this.anchor.setTo(0.5);

  this.game.physics.arcade.enable(this);
  this.body.immovable = true;

  this.shooterTimer = this.game.time.create(false);
  this.producingTimer = this.game.time.create(false);

  this.reset(x, y, data, patch);
};

zombieAttack.Plant.prototype = Object.create(Phaser.Sprite.prototype);
zombieAttack.Plant.prototype.constructor = zombieAttack.Plant;

zombieAttack.Plant.prototype.reset = function(x, y, data, patch){
  Phaser.Sprite.prototype.reset.call(this, x, y, data.health);

  //change the image of the plant
  this.loadTexture(data.plantAsset);

  this.animationName = null;
  if(data.animationFrames) {
    this.animationName = data.plantAsset + 'Animation';
    this.animations.add(this.animationName, data.animationFrames, 6, false);
  }

  this.patch = patch;

  switch (data.role){
    case "isShooter": this.setTimer(this.shooterTimer, this.shoot.bind(this), 1);
                      break;
    case "isProducer": this.setTimer(this.producingTimer, this.produce.bind(this), 5);
                        break;
  }
};

zombieAttack.Plant.prototype.kill = function (){
  Phaser.Sprite.prototype.kill.call(this);
  this.shooterTimer.stop();
  this.producingTimer.stop();

  this.patch.isBusy = false;
};

zombieAttack.Plant.prototype.setTimer = function (timer, fun, time){

  timer.start();
  this.scheduleTask(timer, fun, time);
};

zombieAttack.Plant.prototype.scheduleTask = function (timer, fun, time){
  fun();
  timer.add(Phaser.Timer.SECOND * time, this.scheduleTask.bind(this, timer, fun, time), this);
};

zombieAttack.Plant.prototype.shoot = function (){
  if(this.animations.getAnimation(this.animationName)) {
    this.play(this.animationName);
  }
  var newElement = this.bullets.getFirstDead();
  var y = this.y - 10;
  if(!newElement){
    newElement = new zombieAttack.Bullet(this, this.x, y);
    this.bullets.add(newElement);
  }else{
    newElement.reset(this.x, y);
  }

  newElement.body.velocity.x = 100;
};

zombieAttack.Plant.prototype.produce = function (){
  var diffX = -40 + Math.random() * 80;
  var diffY = -40 + Math.random() * 80;
  this.state.createPlayer(this.x + diffX, this.y + diffY, undefined, this.suns, zombieAttack.Sun);
};

var ChickenGame = ChickenGame || {};

ChickenGame.GameState = {
  init: function(){
    //initialize physics game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //get json data for the game
    this.dataJson = JSON.parse(this.game.cache.getText('constant'));
    this.levelData = JSON.parse(this.game.cache.getText('level'));

    //fit bounds and enable cursors
    this.game.world.setBounds (0,0, this.dataJson.gameState.world_width, this.dataJson.gameState.world_height);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //variables: level game, total lanes of the road
    this.level = 1;
    this.totalLanes =  this.dataJson.gameState.car_lane.length

    //a list to control the numbers of cars in each lane
    this.laneCarList = Array.apply(0, Array(this.totalLanes)).map(Number.prototype.valueOf,0);

    //the pool for the cars
    this.carsPool = this.add.group();
    this.carsPool.enableBody = true;

    //When chicken get the final of the road  you must release the up button to continue
    this.repress = false;
  },
  create: function (){
    //added background to the game
    this.game.stage.backgroundColor = "#000";

    this.background = this.game.add.sprite(0,0, 'background');
    this.game.world.sendToBack(this.background);

    //initialize the firsts cars in the game. The lane in which the cars will be situated in first place is in json's file
    this.levelData.initial_cars_lane.forEach(function(element){
      this.createCar(element);
    }, this);

    //initialize the timer
    this.time = this.game.time.create(this.game);
    this.time.start();

    //draw the lives on the screen
    this.lives = this.add.group();
    var live;
    this.dataJson.gameState.lives.forEach(function (element){
      live = this.lives.create(element.x, element.y, 'live');
      live.anchor.setTo(0.5);
    }, this);

    //initialize the empty lives, to show later, when the player lost lives.
    this.numLives = this.lives.length;
    this.livesEmpty = this.add.group();
    this.dataJson.gameState.lives_empty.forEach(function (element){
      live = this.livesEmpty.create(element.x, element.y, 'live_empty');
      live.anchor.setTo(0.5);
      live.visible = false;
    }, this);

    //create the chicken sprite and the animation. Enable physics and collide to bounds of the screen
    this.player = this.add.sprite(this.dataJson.gameState.chicken.x, this.dataJson.gameState.chicken.y, 'chicken', 3);
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.animations.add('walking', [2, 3, 1, 0, 1, 3], 10, true);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(1, 0);

    //create level counter
    this.style = {font: '50px Arial', fill:'orange'};
    this.levelLabel = this.add.text (this.game.world.width - 30 , 0, this.level, this.style);

    //create a police car
    this.createPoliceCar();
  },
  update: function (){
    //check if there is a collide between the chicken and the cars
    this.game.physics.arcade.overlap(this.player, this.carsPool, this.returnGame, null, this);

    //move the chicken when the arrows are pressed
    if (this.cursors.up.isUp){
      this.repress=false;
    }
    if (this.cursors.up.isDown && !this.repress){
      this.player.y -= this.dataJson.gameState.RUNNING_SPEED;
      this.player.play('walking');
    }else if (this.cursors.down.isDown){
      this.player.y += this.dataJson.gameState.RUNNING_SPEED;
      this.player.play('walking');
    }else{
      this.player.animations.stop();
      this.player.frame = 3;
    }

    //check if some car leave the screen, and then create a new car
    this.carsPool.forEachAlive(function(element){
      if((element.x > 860 || element.x < -30)) {
        this.deleteCar(element);
      }
    }, this);

    //if the chicken cross the road , up level and push the chicken on the beggining
    if (this.player.top == 0){
      this.level++;
      this.levelLabel.text = this.level;
      this.player.y = this.game.world.height;
      this.repress = true;
    }

    if((this.policeCar.x > 860 || this.policeCar < -30)) {
      this.policeCar.kill();
    }

    if (this.level > this.levelData.level_start_police_car && !this.policeCar.alive){
      if (Math.floor(Math.random()*100) > 10 ){
        this.updatePoliceCar();
      }
    }
  },
  deleteCar: function (element){
    //remove the car of the lane
    this.laneCarList[element.lane] --;
    //kill the car
    element.kill();
    //choose a new lane for create the car
    this.pickLane();
  },
  pickLane: function (){
    var pick = Math.floor(Math.random()* this.totalLanes);
    if (this.laneCarList[pick] == 0){
      this.createCar(pick);
    }else{
      this.carsPool.forEachAlive(function (element){
        if (element.lane == pick){
          car = element.cloneCar();
          this.carsPool.add(car);
          car.body.velocity.x = car.direction * this.levelData.car_type[this.levelData.cars_color[car.frame]].velocity;

        }
      }, this);
    }
  },
  returnGame: function() {
    this.player.y =  this.dataJson.gameState.chicken.y;
    this.numLives --;
    this.repress = true;
    if (this.numLives > 0){
      this.lostLive();

      //TODO: Add a claxon sound or a chicken sound
    }else{
      this.player.kill();
      this.overlay = this.add.bitmapData(this.game.width, this.game.height);
      this.overlay.ctx.fillStyle = '#000';
      this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);

      this.panel = this.add.sprite(0, this.game.height, this.overlay);
      this.panel.alpha = 0.55;

      var gameOverPanel = this.add.tween(this.panel);
      gameOverPanel.to({y: 0}, 500);

      gameOverPanel.onComplete.add(function () {
        this.gameOver();
      }, this);
      gameOverPanel.start();
    }

  },
  lostLive: function (){
    this.lives.children[this.numLives].visible = false;
    this.livesEmpty.children[this.numLives].visible = true;
  },
  gameOver: function (){
    this.game.state.start('GameOverState', true, false, "7");
  },
  createCar: function (numLane){
    var car = this.carsPool.getFirstExists(false);

    if(!car) {
      car = new ChickenGame.Car(this.game, this.time.ms, this.levelData, this.dataJson.gameState.car_lane[numLane].y);
      this.carsPool.add(car);
    }else {
      var direction = car.pickDirection();
      var color = car.pickColor();
      car.alive = true;
      car.reset(car.getPositionX(direction), this.dataJson.gameState.car_lane[numLane].y);
      car.direction = direction;
      car.frame = color;

    }

    this.laneCarList[numLane]++;
    car.lane = numLane;
    car.scale.setTo(car.direction, 1);
    car.body.velocity.x = car.direction * this.levelData.car_type[this.levelData.cars_color[car.frame]].velocity;
  },
  createPoliceCar: function (){
    this.policeCar = new ChickenGame.CarPolice(this.game, this.levelData);
    this.game.add.existing(this.policeCar);
  },
  updatePoliceCar: function (){
    this.policeCar.alive;
    this.policeCar.updateCarPolice();
  }

};

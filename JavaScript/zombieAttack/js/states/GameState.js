var zombieAttack = zombieAttack || {}

zombieAttack.GameState = {
  init: function(currentLevel){
    this.currentLevel = currentLevel ? currentLevel : 'level1';

    this.game.physics.arcade.gravity.y = 0;

    this.patches = this.add.group();
    this.bullets = this.add.group();
    this.plants = this.add.group();
    this.zombies = this.add.group();
    this.suns = this.add.group();
  },
  create: function (){
    this.background = this.add.sprite(0, 0, 'background');
    this.background.sendToBack();

    this.createLandPatches();

    this.gameData = JSON.parse(this.game.cache.getText('constants'));
    this.buttonData = JSON.parse(this.game.cache.getText('buttonData'));
    this.levelData = JSON.parse(this.game.cache.getText(this.currentLevel));

    this.numSuns = this.gameData.NUM_SUNS;

    this.createGUI();

    this.sunGenerationTimer = this.game.time.create(false);
    this.sunGenerationTimer.start();
    this.scheduleSunGeneration();

    this.hitSound = this.add.audio('hit');

    this.loadLevel();

  },
  update: function (){
    this.game.physics.arcade.collide(this.plants, this.zombies, this.attackPlant, null, this);

    this.game.physics.arcade.collide(this.bullets, this.zombies, this.hitZombie, null, this);
    this.zombies.forEachAlive(function(zombie){
      zombie.body.velocity.x = zombie.defaultVelocity;

      if(zombie.x <= this.gameData.HOUSE_X ){
        this.gameOver();
      }
    }, this);
  },
  gameOver: function() {
    this.game.state.start('GameState');
  },
  attackPlant: function (plant, zombie){
    plant.damage(zombie.attack);

  },
  createPlayer: function (x, y, data, pool, fun, patch){
    var newElement = pool.getFirstDead();

    if(!newElement){
      newElement = new fun(this, x, y, data, patch);
      pool.add(newElement);
    }else{
      newElement.reset(x, y, data, patch);
    }
    return newElement
  },
  createGUI: function (){
    var sun = this.add.sprite(10, this.game.height-20, 'sun');
    sun.anchor.setTo (0.5);
    sun.scale.setTo(0.5);
    var style = {font: '14 Arial', fill: '#fff'}
    this.sunLabel = this.add.text(22, this.game.height - 28, '', style);
    this.updateStats();

    this.buttons = this.add.group();

    var button;
    this.buttonData.forEach( function(element, index){
      button = new Phaser.Button(this.game, 80 + index * 40, this.game.height - 35, element.btnAsset, this.clickButton, this);
      this.buttons.add(button);

      button.plantData = element;

    }, this);

    this.plantLabel = this.add.text(300, this.game.height- 28, '', style);
  },
  updateStats: function (){
    this.sunLabel.text = this.numSuns;
  },
  increaseSun: function(amount) {
    this.numSuns += amount;
    this.updateStats();
  },
  scheduleSunGeneration: function (){
    this.sunGenerationTimer.add(Phaser.Timer.SECOND * this.gameData.SUN_FREQUENCY, function (){
      this.generateRandomSun();
      this.scheduleSunGeneration();
    }, this);
  },
  generateRandomSun: function (){
    var y = -20;
    var x = 40 + 420 * Math.random();

    var sun = this.createPlayer(x,y, null, this.suns, zombieAttack.Sun);
    sun.body.velocity.y = this.gameData.SUN_VELOCITY;
  },
  hitZombie: function (bullet, zombie){
    bullet.kill();
    this.hitSound.play();
    zombie.damage(this.gameData.ZOMBIE_DAMAGE);

    if(!zombie.alive){
      this.killedEnemies ++;

      if(this.killedEnemies == this.numEnemies){
        this.game.state.start("GameState", true, false, this.levelData.nextLevel);
      }
    }
  },
  clickButton: function (button){
    if(!button.selected){
      this.clearSelection();
      this.plantLabel.text = "Cost: " + button.plantData.cost;
      if(this.numSuns >= button.plantData.cost){
        button.selected = true;
        button.alpha = 0.5;

        this.currentSelection = button.plantData;
      }else{
        this.plantLabel.text += " - Too expensive!";
      }
    }else{
      this.clearSelection();
    }
  },
  clearSelection: function (){
    this.plantLabel.text = "";
    this.currentSelection = null;

    this.buttons.forEach(function (button){
      button.alpha = 1;
      button.selected = false;
    }, this);
  },
  createLandPatches: function () {
    var rectangle = this.add.bitmapData(40, 50);
    rectangle.ctx.fillStyle = '#000';
    rectangle.ctx.fillRect(0, 0, 40, 50);

    var j, patch, alpha;
    var dark = false;
    for (var i = 0; i < 10; i++) {
      for (j = 0; j < 5; j++) {
        patch = new Phaser.Sprite(this.game, 64 + i * 40, 24 + j * 50, rectangle);
        this.patches.add(patch);

        alpha = dark ? 0.2 : 0.1;
        dark = !dark;

        patch.alpha = alpha;

        patch.inputEnabled = true;
        patch.events.onInputDown.add(this.plantPlant, this);

      }
    }
  },
  plantPlant: function(patch) {
    if(!patch.isBusy && this.currentSelection){
      patch.isBusy = true;

      var plant = this.createPlayer(patch.x + patch.width/2, patch.y + patch.height /2, this.currentSelection, this.plants, zombieAttack.Plant, patch);
      this.increaseSun(-this.currentSelection.cost);
      this.clearSelection();
    }
  },
  loadLevel: function (){
    this.currentEnemyIndex = 0;

    this.killedEnemies = 0;
    this.numEnemies = this.levelData.zombies.length;

    this.scheduleNextEnemy();
  },
  scheduleNextEnemy: function (){
    var nextEnemy = this.levelData.zombies[this.currentEnemyIndex];

    if(nextEnemy){
      var nextTime = 1000 * ( nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.zombies[this.currentEnemyIndex - 1].time));
      this.nextEnemyTimer = this.game.time.events.add(nextTime, function(){
        var y = this.gameData.ZOMBIE_Y_POSITIONS[Math.floor(Math.random() * this.gameData.ZOMBIE_Y_POSITIONS.length)];

        this.createPlayer(this.game.world.width + 40, y, nextEnemy, this.zombies, zombieAttack.Zombie);

        this.currentEnemyIndex++;
        this.scheduleNextEnemy();
      }, this);
    }
  }

};


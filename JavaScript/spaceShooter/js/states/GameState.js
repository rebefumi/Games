var SpaceShooter = SpaceShooter || {};

SpaceShooter.GameState = {
  init: function(currentLevel){
      this.dataConstant = JSON.parse(this.game.cache.getText('constant'));
      
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.currentLevel = currentLevel ? currentLevel : 1;

     // this.cursors = this.game.input.keyboard.createCursorKeys();     
  },
  create: function() {
    //moving stars background
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');    
    this.background.autoScroll(0, 30);
    
    //player
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player');
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;  

    this.initBullets();
    this.shotingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/5, this.createPlayerBullets, this);

    this.initEnemies();

    this.loadLevel();

    this.orchestra = this.add.audio('orchestra');
    this.orchestra.play();
  },
  update: function() {
    this.player.body.velocity.x = 0;

    this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.player, this.enemyBullets, this.killPlayer, null, this);
    if(this.game.input.activePointer.isDown) {
      var targetX = this.game.input.activePointer.position.x;
      var direction = targetX >= this.game.world.centerX ? 1 : -1;
      this.player.body.velocity.x = direction * this.dataConstant.PLAYER_SPEED;
    }
  },
  initBullets: function (){

    this.playerBullets = this.add.group();
    this.playerBullets.enableBody = true;
  },

  createPlayerBullets: function (){
    var bullet = this.playerBullets.getFirstExists(false);
    if(!bullet){
      bullet = new SpaceShooter.PlayerBullet (this.game, this.player.x, this.player.top);
      this.playerBullets.add(bullet);
    }else {
      bullet.reset(this.player.x, this.player.top);
    }

    bullet.body.velocity.y = this.dataConstant.BULLET_SPEED;
  },
  initEnemies: function (){
    this.enemies = this.add.group();
    this.enemies.enableBody = true;

    this.enemyBullets = this.add.group();
    this.enemyBullets.enableBody = true;

  },
  damageEnemy: function (bullet, enemy){

    bullet.kill();
    enemy.damage(1);
  },
  killPlayer: function (){
    this.player.kill();
    this.orchestra.stop();
    this.game.state.start('GameState');
  },
  createEnemy: function(x, y, health, key, scale, speedX, speedY){
    var enemy = this.enemies.getFirstExists(false);

    if (!enemy ){
      enemy = new SpaceShooter.Enemy(this.game, x, y, key, health, this.enemyBullets);
      this.enemies.add(enemy);
    }

    enemy.reset(x, y, health, key, scale, speedX, speedY);
  },
  loadLevel: function (){
    this.currentEnemyIndex = 0;
    this.levelData = JSON.parse(this.game.cache.getText('level'+this.currentLevel));
    this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, function(){
      this.orchestra.stop();
      if(this.currentLevel < this.dataConstant.NUM_LEVELS){
        this.currentLevel++;
      }else{
        this.currentLevel = 1;
      }

      this.game.state.start('GameState', true, false, this.currentLevel);
    }, this);
    this.scheduleNextEnemy();
  },
  scheduleNextEnemy: function (){
    var nextEnemy = this.levelData.enemies[this.currentEnemyIndex];

    if(nextEnemy){
      var nextTime = 1000 * ( nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex - 1].time));
      this.nextEnemyTimer = this.game.time.events.add(nextTime, function(){
        this.createEnemy(nextEnemy.x * this.game.world.width, -100, nextEnemy.health, nextEnemy.key, nextEnemy.scale, nextEnemy.speedX, nextEnemy.speedY);
        this.currentEnemyIndex++;
        this.scheduleNextEnemy();
      }, this);
    }
  }
};

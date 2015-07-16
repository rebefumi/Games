var RPG = RPG || {}

RPG.GameState = {
    init: function (currentLevel) {
        this.currentLevel = currentLevel ? currentLevel : 'world';

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.gameData = JSON.parse(this.game.cache.getText('constants'));
        this.itemData = JSON.parse(this.game.cache.getText('itemData'));
    },
    create: function () {
        this.game.VirtualPad = this.game.plugins.add(Phaser.Plugin.VirtualPad);

        this.game.stage.backgroundColor = this.gameData.background_color;

        this.map = this.add.tilemap(this.currentLevel);

        this.map.addTilesetImage('terrains', 'tilesheet');

        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.collisionLayer = this.map.createLayer('collisionLayer');

        this.game.world.sendToBack(this.backgroundLayer);

        this.map.setCollisionBetween(1, 16, true, 'collisionLayer');

        this.collisionLayer.resizeWorld();

        this.player = new RPG.Player(this, this.gameData.initial_position.x, this.gameData.initial_position.y, this.gameData.player_data);
        this.add.existing(this.player);

        this.game.camera.follow(this.player);

        this.initGUI();

        this.showPlayerIcons();

        this.items = this.add.group();
       /* var item = "";
        this.itemData.items.forEach(function (element) {
            item = new RPG.Item(this, element.positionX, element.positionY, element.key, element.parameters);
            this.items.add(item);
        }, this);*/

        this.loadItems();
    },
    update: function () {
        this.game.physics.arcade.collide(this.player, this.collisionLayer);

        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);

        this.cursorMovement();

    },
    gameOver: function () {
        this.game.state.start('GameOverState', true, false, this.currentLevel);
    },
    render: function () {
        this.game.debug.body(this.player);
    },
    cursorMovement: function () {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if (this.cursors.left.isDown || this.player.btnsPressed.left || this.player.btnsPressed.upleft || this.player.btnsPressed.downleft) {
            this.player.body.velocity.x = -this.gameData.player_speed;
            this.player.play('walk_left');
        } else if (this.cursors.right.isDown || this.player.btnsPressed.right || this.player.btnsPressed.upright || this.player.btnsPressed.downright) {
            this.player.body.velocity.x = this.gameData.player_speed;
            this.player.play('walk_right');
        }

        if (this.cursors.up.isDown || this.player.btnsPressed.up || this.player.btnsPressed.upright || this.player.btnsPressed.upleft) {
            this.player.body.velocity.y = -this.gameData.player_speed;
            if (this.cursors.up.isDown || this.player.btnsPressed.up) {
                this.player.play('walk_up');
            }
        } else if (this.cursors.down.isDown || this.player.btnsPressed.down || this.player.btnsPressed.downright || this.player.btnsPressed.downleft) {
            this.player.body.velocity.y = this.gameData.player_speed;
            if (this.cursors.down.isDown || this.player.btnsPressed.down) {
                this.player.play('walk_down');
            }
        }

        if (this.game.input.activePointer.isUp) {
            this.game.VirtualPad.stopMovement();
        }

        if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
            this.player.animations.stop();
            this.player.frame = this.gameData.initial_frame;
        }
    },
    initGUI: function () {
        this.game.VirtualPad.setup(this.player, {
            left: true,
            right: true,
            up: true,
            down: true,
            upleft: true,
            downleft: true,
            upright: true,
            downright: true,
            action: false
        })
    },
    collect: function (player, item) {
        this.player.collectItem(item);
    },
    showPlayerIcons: function () {
        var style = {font: '14px Arial', fill: '#fff'};


        this.goldIcon = new RPG.Icon(this, 10, 10, 'coin');
        this.add.existing(this.goldIcon);

        this.attackIcon = new RPG.Icon(this, 70, 10, 'sword');
        this.add.existing(this.attackIcon);

        this.defenseIcon = new RPG.Icon(this, 130, 10, 'shield');
        this.add.existing(this.defenseIcon);

        this.goldLabel = this.add.text(30, 10, '0', style);
        this.goldLabel.fixedToCamera = true;

        this.attackLabel = this.add.text(90, 10, '0', style);
        this.attackLabel.fixedToCamera = true;

        this.defenseLabel = this.add.text(150, 10, '0', style);
        this.defenseLabel.fixedToCamera = true;

        this.refreshStats();
    },
    refreshStats: function () {
        this.goldLabel.text = this.player.data.gold;
        this.attackLabel.text = this.player.data.attack;
        this.defenseLabel.text = this.player.data.defense;
    },
    findObjectsByType: function(targetType, tilemap, layer){
    var result = [];

    tilemap.objects[layer].forEach(function(element){
        if(element.properties.type == targetType) {
            element.y -= tilemap.tileHeight/2;
            element.x += tilemap.tileHeight/2;
            result.push(element);
        }
    }, this);

    return result;
},
    loadItems: function(){
        var elementsArr = this.findObjectsByType('item', this.map, 'objectsLayer');
        var elementObj;

        elementsArr.forEach(function(element){
            elementObj = new RPG.Item(this, element.x, element.y, element.properties.asset, element.properties);
            this.items.add(elementObj);
        }, this);
    }

};


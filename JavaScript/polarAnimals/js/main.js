var gameContanst = {
    width: 640,
    height: 340,
    margin_side: 60
}

var game = new Phaser.Game(gameContanst.width, gameContanst.height, Phaser.AUTO);

var GameState = {
    preload: function() {
        this.load.image('background' , 'assets/images/polar.png');

        this.load.image('arrow', 'assets/images/arrow.png');

        this.load.spritesheet('bear', 'assets/images/bear_spreetsheet.png', 200, 270, 3);
        this.load.spritesheet('seal', 'assets/images/seal_spreetsheet.png', 200, 175, 5);
        this.load.spritesheet('penguin', 'assets/images/penguin_spreetsheet.png', 200, 201, 2);
        this.load.image('fox' , 'assets/images/fox.png');

        this.load.audio('penguinSound', ['assets/audio/penguin.ogg', 'assets/audio/penguin.mp3']);
        this.load.audio('bearSound', ['assets/audio/bear.ogg', 'assets/audio/bear.mp3']);
        this.load.audio('sealSound', ['assets/audio/seal.ogg', 'assets/audio/seal.mp3']);
        this.load.audio('foxSound', ['assets/audio/fox.ogg', 'assets/audio/fox.mp3']);

    },
    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.background = this.game.add.sprite(0, 0, 'background');

        var animalData = [
            {key: 'seal', text: 'SEAL', audio: 'sealSound'},
            {key: 'bear', text: 'BEAR', audio: 'bearSound'},
            {key: 'penguin', text: 'PENGUIN', audio: 'penguinSound'},
            {key: 'fox', text: 'FOX', audio: 'foxSound'}
        ];

        this.animals = this.game.add.group();

        var self = this;
        var animal;

        animalData.forEach(function (element){
            animal = self.animals.create(1000, self.game.world.centerY, element.key, 0);
            animal.customParams = {text: element.key, sound: self.game.add.audio(element.audio)};
            animal.anchor.setTo (0.5)

            animal.animations.add('animate', [0, 1, 2, 1, 0, 1, 2, 1, 0], 3, false);
            animal.animations.add('animate5', [0, 1 , 2 , 3 , 4 , 1 , 2 , 3 , 4, 0], 5, false);
            animal.animations.add('animate2', [0, 1, 0, 1, 0, 1, 0, 1], 2, false);

            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
        });
        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

        this.showText(this.currentAnimal);

        this.leftArrow = this.game.add.sprite(gameContanst.margin_side, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo (0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.moreParameters = {direction : -1};

        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

        this.arrowRight = this.game.add.sprite(gameContanst.width - gameContanst.margin_side,  this.game.world.centerY, 'arrow');
        this.arrowRight.anchor.setTo (0.5);
        this.arrowRight.moreParameters = {direction: 1};

        this.arrowRight.inputEnabled = true;
        this.arrowRight.input.pixelPerfectClick = true;
        this.arrowRight.events.onInputDown.add(this.switchAnimal, this);


    },
    update: function (){
    },
    switchAnimal: function (sprite, event) {

        if (this.isMoving){
            return false;
        }

        this.isMoving = true;

        this.animalText.visible = false;

        var newAnimal, posX;

        if (sprite.moreParameters.direction == 1 ) {
            newAnimal = this.animals.next();
            newAnimal.x = -newAnimal.width/2;
            posX = gameContanst.width + this.currentAnimal.width/2;
        }else{
            newAnimal = this.animals.previous();
            newAnimal.x  = gameContanst.width + newAnimal.width /2;
            posX = -this.currentAnimal.width / 2;
        }

        var newAnimalMovement = this.game.add.tween(newAnimal);
        newAnimalMovement.to({x: this.game.world.centerX}, 1000);
        newAnimalMovement.onComplete.add (function (){
            this.isMoving = false;
            this.showText(newAnimal);
        }, this);
        newAnimalMovement.start();

        var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x:posX}, 1000);
        currentAnimalMovement.start();

        this.currentAnimal = newAnimal;
        /*this.currentAnimal.x = posX;
        this.currentAnimal = newAnimal;
        this.currentAnimal.x = this.game.world.centerX;*/

    },
    animateAnimal: function (sprite, event){
        switch (this.currentAnimal.key){
            case "seal": sprite.play('animate5');
                    break;
            case "penguin": sprite.play('animate2');
                    break;
            case "fox": this.rotateAnimal(this.currentAnimal);
            default: sprite.play('animate');
                    break;
        }
        sprite.customParams.sound.play();

    },
    showText: function(animal){
        if(!this.animalText){
            var style = {
                font: 'bold 30pt Arial',
                fill: 'Red',
                align: 'center'
            }
            this.animalText = this.game.add.text(this.game.width/2, this.game.height*0.95, '', style);
            this.animalText.anchor.setTo(0.5);
        }

        this.animalText.setText (animal.customParams.text);
        this.animalText.visible = true;
    },
    rotateAnimal : function (animal){
        this.isMoving = true;

        var animalRotation = this.game.add.tween(animal);
        animalRotation.to({angle: '+720'}, 1000);
        animalRotation.onComplete.add(function(){
            this.isMoving = false;
        }, this);
        animalRotation.start ();

    }
};

game.state.add ("GameState", GameState);
game.state.start ('GameState');

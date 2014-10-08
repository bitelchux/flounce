var Hero = function(life, gold, power){
	this.life = def(life, 20);
	this.points = 0;
	this.gold = def(gold, 2000);
	this.power = def(power, false);
    this.dead = false;
	this.deadSound = game.add.audio('loose');
    this.monsterKilledDuringCurrentWave = 0;
    var heigth = 1100;
    this.entity = game.add.sprite(game.global.width/2, game.global.heigth-(1138-heigth)/2);
    game.physics.p2.enableBody(this.entity,true);
    this.entity.body.setRectangle(640,1138-heigth);
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.getHit, this);
    this.entity.renderable=false;
    this.entity.body.static=true;
};

Hero.prototype.die = function() {
    this.dead = true;
    if(game.global.currentLevel.hero.life <= 0){
        //Play sound You loose + New state to create...
        var gameOver = game.add.text(game.world.centerX, game.world.centerY, "You lose");
        gameOver.fill = '#700E0D';
        gameOver.anchor.setTo(0.5);
        gameOver.fontSize = 80;
        gameOver.tween = game.add.tween(gameOver);
        gameOver.tween.to({angle : 360}, 1500, null, true, 0, 1, false);
        gameOver.scale.x = 0.1;
        gameOver.scale.y = 0.1;
        gameOver.scaleTween = game.add.tween(gameOver.scale);
        gameOver.scaleTween.to({x: 1, y: 1}, 6000, null, true).onComplete.add(function() {gameOver.destroy(); game.state.start('loose');}, this);
        this.deadSound.play();
    }
};

Hero.prototype.getHit = function(hero,monster) {
	if (!this.dead) {
        this.life -= monster.sprite.entity.strength;
        if (this.life <= 0) {
            this.life = 0;
            this.die();
        }
        this.gold -= monster.sprite.entity.gold;
        if(this.gold < 0){
			this.gold = 0;
        }
    }
    monster.sprite.entity.dieWithoutGlory();
};

//Use the special power of our hero => just a draft
Hero.prototype.usePower = function(powerName){
	if(this.power && powerName === "HEAL"){
		this.life += 5;
	}
};
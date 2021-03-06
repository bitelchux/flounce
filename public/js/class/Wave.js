/*global Monster,Guy,game,pi,cos,sin,floor,def,isDef,rand,inh from utils.js*/
/**
 * Handle the creation of monsters during a level
 */
var Wave = function(monstersToCreate, hero, number, Entrances) {
	this.monstersToCreate = monstersToCreate;
	this.hero = hero;
	this.number = number;
	this.end = false;
	this.hero = hero;
	this.Entrances = def(Entrances, [new Entrance(100, -100), new Entrance(400, -100)]);
	this.loop = 0;
};

Wave.prototype.update = function() {
	this.loop++;
	if (this.loop >= 30) {
		if (this.monstersToCreate.length > 0) {
			if (this.monstersToCreate[0].number > 0) {
				if (this.monstersToCreate[0].type == "Blockers") {
					if (this.monstersToCreate[0].number == 1) {
						for (var i in game.global.blockers) {
							game.global.blockers[i].entity.revive();
						}
					}
					if (this.monstersToCreate[0].number == 2) {
						for (var i in game.global.blockers) {
							game.global.blockers[i].entity.kill();
						}
					}
					this.monstersToCreate[0].number = 0;
				}
				if (this.monstersToCreate[0].type == "Condition") {
					if (game.global.monsters.length < this.monstersToCreate[0].number)
						this.monstersToCreate[0].number = 0;
				}
				else {
					this.monstersToCreate[0].number--;
					if (this.monstersToCreate[0].type !== "Break")
						this.popMonster(this.monstersToCreate[0]);
				}
			}
			if (this.monstersToCreate[0].number <= 0)
				this.monstersToCreate.shift();
		}
		this.loop = 0;
	}
};

Wave.prototype.popMonster = function(toSummon) {
	var EntranceToUse;
	if (toSummon.entry) {
		if (toSummon.entry === 'all') {
			EntranceToUse = floor(rand(this.Entrances.length, 0));
		}
		else {
			EntranceToUse = toSummon.entry[floor(rand(toSummon.entry.length, 0))];
		}
	}

	var aliveMonster;
	var weigth = 1; //+(this.number/10);
	if (toSummon.type === "Guy") {
		aliveMonster = new Guy(this.Entrances[EntranceToUse].x, this.Entrances[EntranceToUse].y, toSummon.life * weigth, toSummon.gold * weigth, toSummon.value * weigth, toSummon.strength, false, toSummon.damage, this.hero, toSummon.vx, toSummon.vy);
	}
	else if (toSummon.type === "Skeleton") {
		aliveMonster = new Skeleton(this.Entrances[EntranceToUse].x, this.Entrances[EntranceToUse].y, toSummon.life * weigth, toSummon.gold * weigth, toSummon.value * weigth, toSummon.strength, false, toSummon.damage, this.hero, toSummon.vx, toSummon.vy);
	}
	else if (toSummon.type === "Rubick") {
		aliveMonster = new Rubick(this.Entrances[EntranceToUse].x, this.Entrances[EntranceToUse].y, toSummon.life * weigth, toSummon.gold * weigth, toSummon.value * weigth, toSummon.strength, false, toSummon.damage, this.hero, toSummon.vx, toSummon.vy);
	}
	else if (toSummon.type === "Charlie") {
		aliveMonster = new Skeleton(this.Entrances[EntranceToUse].x, this.Entrances[EntranceToUse].y, toSummon.life * weigth, toSummon.gold * weigth, toSummon.value * weigth, toSummon.strength, false, toSummon.damage, this.hero, toSummon.vx, toSummon.vy, 1);
	}
	else if (toSummon.type === "Ghost") {
		aliveMonster = new Ghost(this.Entrances[EntranceToUse].x, this.Entrances[EntranceToUse].y, toSummon.life * weigth, toSummon.gold * weigth, toSummon.value * weigth, toSummon.strength, false, toSummon.damage, this.hero, toSummon.vx, toSummon.vy, 1);
	}
	/*else { //banan ;)
		aliveMonster = new Banan(life * weigth, gold * weigth, value * weigth, strength, EntranceToUse);  
	}*/
};

/*Wave.prototype.monsterTime = function(that){
	var toSummon= that.monstersToCreate.pop();
	//game.time.events.repeat(Phaser.Timer.HALF, toSummon.number, that.popMonster, that, toSummon.type,toSummon.life,toSummon.gold, toSummon.value,toSummon.strength,toSummon.damage, toSummon.entry, toSummon.vx , toSummon.vy);
	if(that.monstersToCreate.length > 0){
		setTimeout(function(){that.monsterTime(that);}, Phaser.Timer.HALF * toSummon.number);
	}
	else{
		that.end = true;
	}
};


Wave.prototype.start = function(){
	this.monsterTime(this);
};*/

//To know if the wave has still monster to invoke
Wave.prototype.isRunning = function() {
	return (this.monstersToCreate.length > 0);
};

/*global game,pi,cos,sin,def,isDef,rand from utils.js*/
var Monster = function(life, gold, value, strength, decay) {
    this.life = life;
    this.gold = gold;
    this.value = def(value, 0);
    this.strength = def(strength, 1);
    this.decay = def(decay, true);
    this.dead = false;
    this.isDestroy = false;
    this.parts = [];
    this.constraints = [];
};

Monster.prototype.die = function() {
    this.dead = true;
};

Monster.prototype.getHit = function(damage) {
    if (!this.dead) {
        this.life -= damage;
        if (this.life <= 0) {
            this.life = 0;
            this.die();
            this.parts.forEach(function(part) {
                part.die();
            });
        }
    }
};

Monster.prototype.destroy = function() {
    if (!this.isDestroy) {
        this.isDestroy = true;
        for (var item in this.constraints)
            game.physics.p2.removeConstraint(this.constraints[item]);
        for (var item in this.parts){
            this.parts[item].body.setCollisionGroup(game.global.limbsCollisionGroup);
            this.parts[item].body.collides([game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
            this.parts[item].body.collideWorldBounds=false;
            this.parts[item].checkWorldBounds=true;
            var that = this.parts[item];
            this.parts[item].events.onOutOfBounds.add(function(){that.destroy()},this)
            this.parts[item].outOfBoundsKill=true;
        }
        this.constraints=[];
        this.parts=[];
    }
};

Monster.prototype.updateCollision = function() {
    for (var item in this.parts) {
        this.parts[item].body.setCollisionGroup(game.global.enemiesCollisionGroup);
        this.parts[item].body.collides([game.global.enemiesCollisionGroup, game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
    }
}

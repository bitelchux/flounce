/*global game,pi,cos,sin,def,isDef,rand from utils.js*/
var Monster = function(life, gold, value, decay, strength) {
    this.life = life;
    this.gold = gold;
    this.value = def(value, 0);
    this.decay = def(decay, true);
    this.strength = def(strength, 1);
    this.dead = false;
    this.parts = game.add.group();
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
    this.parts.forEach(function(part) {
        part.destroy();
    });
};
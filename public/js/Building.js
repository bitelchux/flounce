//var test=new Building({base:50,max:150});
var Building = function(damage, cost) {
    this.design;
    this.entity;
    this.damage = {
        base: def(damage.base, 0),
        max: def(damage.max, 0),
        critMult: def(damage.critMult, 2),
        critOdds: def(damage.critOdds, 1)
    };
    this.cost = def(cost, 500);
};

Building.prototype.getDamage = function(body1, body2) {
    if (rand(100, 0) < this.damage.critOdds)
        return {
            damage: floor(this.damage.max * rand(this.damage.critMult, 1)),
            crit: true
        };
    else
        return {
            damage: floor(rand(this.damage.max, this.damage.base)),
            crit: false
        };
};

Building.prototype.hit = function(building, enemy) {
    //Gestion de collision
    if (enemy.sprite !== null) {
        var entity = enemy.sprite.entity;
        if (entity.lastCollision.length===0 || entity.lastCollision[0] != building) {
            var retour = this.getDamage(building, enemy);
            if (retour.damage !== 0) {
                //text !
                console.log(retour.damage);
                entity.lastCollision.unshift(building);
                game.time.events.add(1000, function() {
                    if(entity.sprite)
                        entity.lastCollision.pop();
                    }, this);
                entity.getHit(retour.damage); //DAMAGE!
                return retour;
            }
        }
    }
    return {};
};

Building.prototype.allowDrag = function() {
    this.design.inputEnabled = true;
    this.design.input.enableDrag(true);
    this.design.input.useHandCursor = true;
    this.design.events.onDragStart.add(this.onDragStart, this);
    this.design.events.onDragStop.add(this.onDragStop, this);
};

Building.prototype.stopDrag = function() {
    //this.design.inputEnabled = false;
    this.design.input.disableDrag(true);
};

Building.prototype.onDragStart = function(sprite, pointer) {
    //Empty for the moment
    sprite.scale.set(1.2, 1.2);
    if(this.panel){
        this.panel.shown.splice(this,1);
    }
};

Building.prototype.onDragStop = function(sprite, pointer) {
    this.design.x = pointer.x;
    this.design.y = pointer.y;
    this.entity.body.x = pointer.x;
    this.entity.body.y = pointer.y;
    sprite.scale.set(1, 1);
    game.global.currentLevel.hero.gold -= this.cost;
    if(this.panel){
        this.panel.reset();
        this.panel=null;
        this.stopDrag();
        this.allowClick();
    }
};

Building.prototype.allowClick = function(){
    this.design.inputEnabled = true;
    this.design.input.disableDrag(true);
    this.design.input.useHandCursor = true;
    this.design.events.onInputUp.add(this.statsTower, this);
};

Building.prototype.allowMouseOver = function(){
    this.design.inputEnabled = true;
    this.design.events.onInputOver.add(this.descriptTower, this);
};

Building.prototype.statsTower = function(){
    console.log("test success");
    //Show the delete button
    //Show the stats
};

Building.prototype.descriptTower = function(){
    console.log("Description test success");
    //Show the delete button
    //Show the stats
};

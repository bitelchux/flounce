/**
 * Level 1
 */
var level1State = {
    preload: function() {
    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setBoundsToWorld(true, true, false, true, false);
        game.physics.p2.gravity.y = 300;
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.enableBodySleeping = true;

        game.global.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        game.global.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        game.global.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
        game.global.limbsCollisionGroup = game.physics.p2.createCollisionGroup();
        game.global.voidCollisionGroup = game.physics.p2.createCollisionGroup();
        game.global.checkCollisionGroup = game.physics.p2.createCollisionGroup();
        game.global.depth = [];
        for (var i = 0; i < 20; i++) {
            game.global.depth[i] = game.add.group();
            game.world.bringToTop(game.global.depth[i]);
        }
        game.global.towers = [];
        game.global.monsters = [];

        var waves = [ //To invert order go to Level.js lign 35
            //Wave 10
            [{
                "type": "Blockers",
                "number": 1
            }, {
                "number": 1,
                "type": "Rubick",
                "life": 500,
                "gold": 40,
                "value": 40,
                "strength": 30,
                "damage": 16,
                "entry": [0, 1]
            }, {
                "number": 5,
                "type": "Guy",
                "life": 80,
                "gold": 25,
                "value": 12,
                "strength": 15,
                "damage": 1,
                "entry": 'all'
            }, {
                "number": 2,
                "type": "Condition"
            }, {
                "number": 7,
                "type": "Guy",
                "life": 80,
                "gold": 25,
                "value": 12,
                "strength": 15,
                "damage": 1,
                "entry": 'all'
            }, {
                "number": 1,
                "type": "Condition"
            }, {
                "type": "Blockers",
                "number": 2
            }],
            //Wawe 9
            [{
                "number": 5,
                "type": "Guy",
                "life": 80,
                "gold": 25,
                "value": 12,
                "strength": 15,
                "damage": 1,
                "entry": 'all'
            }, {
                "number": 20,
                "type": "Break"
            }, {
                "number": 7,
                "type": "Guy",
                "life": 80,
                "gold": 25,
                "value": 12,
                "strength": 15,
                "damage": 1,
                "entry": 'all'
            }, {
                "number": 7,
                "type": "Condition"
            }, {
                "number": 15,
                "type": "Break"
            }, {
                "number": 7,
                "type": "Guy",
                "life": 80,
                "gold": 25,
                "value": 12,
                "strength": 15,
                "damage": 2,
                "entry": 'all'
            }],
            //Wawe 8 boss
            [{
                "number": 3,
                "type": "Charlie",
                "life": 100,
                "gold": 100,
                "value": 25,
                "strength": 20,
                "damage": 3,
                "entry": [0]
            }, {
                "number": 15,
                "type": "Break"
            }, {
                "number": 7,
                "type": "Guy",
                "life": 50,
                "gold": 25,
                "value": 10,
                "strength": 10,
                "damage": 1,
                "entry": 'all'
            }, {
                "number": 4,
                "type": "Condition"
            }, {
                "number": 7,
                "type": "Guy",
                "life": 50,
                "gold": 25,
                "value": 10,
                "strength": 10,
                "damage": 1,
                "entry": 'all'
            }],
            //Wawe 7
            [{
                "number": 3,
                "type": "Skeleton",
                "life": 40,
                "gold": 15,
                "value": 5,
                "strength": 15,
                "damage": 1,
                "entry": [0, 1]
            }, {
                "number": 1,
                "type": "Condition"
            }, {
                "number": 7,
                "type": "Guy",
                "life": 50,
                "gold": 25,
                "value": 10,
                "strength": 10,
                "damage": 1,
                "entry": 'all'
            },{
                "number": 15,
                "type": "Break"
            },{
                "number": 3,
                "type": "Guy",
                "life": 50,
                "gold": 25,
                "value": 10,
                "strength": 10,
                "damage": 1,
                "entry": 'all'
            }],
            //Wawe 6
            [{
                "number": 7,
                "type": "Guy",
                "life": 50,
                "gold": 25,
                "value": 10,
                "strength": 10,
                "damage": 1,
                "entry": [0, 1]
            }, {
                "number": 3,
                "type": "Condition"
            }, {
                "number": 7,
                "type": "Guy",
                "life": 50,
                "gold": 25,
                "value": 10,
                "strength": 10,
                "damage": 1,
                "entry": 'all'
            }, {
                "number": 5,
                "type": "Condition"
            }, {
                "number": 3,
                "type": "Guy",
                "life": 50,
                "gold": 25,
                "value": 10,
                "strength": 10,
                "damage": 1,
                "entry": 'all'
            }],
            //Wawe 5
            [{
                "number": 4,
                "type": "Skeleton",
                "life": 40,
                "gold": 15,
                "value": 5,
                "strength": 7,
                "damage": 1,
                "entry": [0, 1]
            }, {
                "number": 3,
                "type": "Ghost",
                "life": 70,
                "gold": 25,
                "value": 10,
                "strength": 10,
                "damage": 1,
                "entry": [0,1]
            }, {
                "number": 5,
                "type": "Condition"
            }, {
                "number": 7,
                "type": "Skeleton",
                "life": 40,
                "gold": 15,
                "value": 5,
                "strength": 7,
                "damage": 1,
                "entry": 'all'
            }],
            //Wawe 4
            [{
                "number": 7,
                "type": "Skeleton",
                "life": 40,
                "gold": 15,
                "value": 5,
                "strength": 7,
                "damage": 1,
                "entry": [0, 1]
            }, {
                "number": 5,
                "type": "Condition"
            }, {
                "number": 7,
                "type": "Skeleton",
                "life": 40,
                "gold": 15,
                "value": 5,
                "strength": 7,
                "damage": 1,
                "entry": 'all'
            }],
            //Wawe 3
            [{
                "number": 2,
                "type": "Guy",
                "life": 70,
                "gold": 50,
                "value": 10,
                "strength": 7,
                "damage": 2,
                "entry": [0, 1]
            }, {
                "number": 20,
                "type": "Break"
            }, {
                "number": 1,
                "type": "Guy",
                "life": 70,
                "gold": 50,
                "value": 5,
                "strength": 7,
                "damage": 1,
                "entry": [2]
            }],
            //Wawe 2
            [{
                "number": 5,
                "type": "Guy",
                "life": 30,
                "gold": 25,
                "value": 5,
                "strength": 5,
                "damage": 1,
                "entry": [0, 1]
            }, {
                "number": 1,
                "type": "Condition"
            }, {
                "number": 5,
                "type": "Guy",
                "life": 30,
                "gold": 25,
                "value": 5,
                "strength": 5,
                "damage": 1,
                "entry": [0, 1]
            }],
            //Wawe 1
            [{
                "number": 1,
                "type": "Guy",
                "life": 20,
                "gold": 25,
                "value": 5,
                "strength": 5,
                "damage": 1,
                "entry": [0],
                "vx": 530,
                "vy": 40
            }, {
                "number": 9,
                "type": "Break"
            }, {
                "number": 1,
                "type": "Guy",
                "life": 20,
                "gold": 25,
                "value": 5,
                "strength": 5,
                "damage": 1,
                "entry": [1],
                "vx": 250,
                "vy": 20
            }, {
                "number": 1,
                "type": "Condition"
            }, {
                "number": 4,
                "type": "Guy",
                "life": 20,
                "gold": 25,
                "value": 5,
                "strength": 5,
                "damage": 1,
                "entry": [0, 1],
            }]
        ];


        game.global.sensors = [];
        game.physics.p2.world.on("beginContact", function(event) {
            for (var i = 0; i < game.global.sensors.length; i++) {
                var s = game.global.sensors[i];
                if (event.bodyA.parent == s || event.bodyB.parent == s) {
                    s.overlap++;
                }
            }
        });
        game.physics.p2.world.on("endContact", function(event) {
            for (var i = 0; i < game.global.sensors.length; i++) {
                var s = game.global.sensors[i];
                if (event.bodyA.parent == s || event.bodyB.parent == s) {
                    s.overlap--;
                }
            }
        });


        game.physics.p2.updateBoundsCollisionGroup();

        //Design of the level//
        //Mute button 
        var mute = game.add.sprite(600, 915, 'mute');
        mute.scale.set(0.5);
        mute.inputEnabled = true;
        mute.input.useHandCursor = true;
        mute.events.onInputUp.add(function() {
            game.sound.mute = false;
            mute.kill();
            unMute.revive();
        }, this);
        mute.kill();
        var unMute = game.add.sprite(600, 915, 'unMute');
        unMute.scale.set(0.5);
        unMute.inputEnabled = true;
        unMute.input.useHandCursor = true;
        unMute.events.onInputUp.add(function() {
            game.sound.mute = true;
            unMute.kill();
            mute.revive();
        }, this);


        //Locations
        var background = game.add.sprite(0, 0, 'background');
        game.global.depth[0].add(background);
        var walls = game.add.sprite(game.global.width / 2, game.global.height / 2, 'walls');
        var paddle_right = new Paddle({
            base: 5,
            max: 6
        }, 460, 990, 'right');
        var paddle_left = new Paddle({
            base: 5,
            max: 6
        }, 180, 990, 'left');

        game.physics.p2.enableBody(walls);

        game.global.depth[10].add(walls);

        walls.body.static = true;
        walls.body.clearShapes();
        walls.body.loadPolygon('paddle_physics', 'walls');

        walls.body.setCollisionGroup(game.global.playerCollisionGroup);

        var infoPanel = new InfoPanel();
        var dragNdropPanel = new TowerPanel();

        walls.body.collides(game.global.enemiesCollisionGroup);

        walls.body.collides(game.global.limbsCollisionGroup);
        walls.body.collides(game.global.checkCollisionGroup);
        game.physics.p2.world.setGlobalStiffness = Number.MAX_VALUE;
        game.physics.p2.world.setGlobalRelaxation = 1;

        //Add the inputs and the associated functions
        var key_P = game.input.keyboard.addKey(Phaser.Keyboard.P);
        var key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);
        var key_M = game.input.keyboard.addKey(Phaser.Keyboard.M);
        var key_Q = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        if (game.global.language !== 'fr') {
            key_A = game.input.keyboard.addKey(Phaser.Keyboard.Q);
            key_Q = game.input.keyboard.addKey(Phaser.Keyboard.A);
            key_M = game.input.keyboard.addKey(Phaser.Keyboard.L);
        }



        key_P.onDown.add(function() {
            paddle_right.up();
        });

        key_P.onUp.add(function() {
            paddle_right.down();
        });

        key_P.onHoldCallBack = (function() {
            paddle_right.down();
        });

        key_A.onDown.add(function() {
            paddle_left.up();
        });

        key_A.onUp.add(function() {
            paddle_left.down();
        });

        game.input.onDown.add(function(pointer) {
            var PointX = game.input.activePointer.position.x;
            if(PointX<320)
                paddle_left.up();
            else
                paddle_right.up();
        });
        
        game.input.onUp.add(function(pointer) {
            var firstPointX = game.input.activePointer.positionDown.x;
            var firstPointY = game.input.activePointer.positionDown.y;
            
            var lastPointX = game.input.activePointer.position.x;
            var lastPointY = game.input.activePointer.position.y;
            
            if(Phaser.Point.distance(game.input.activePointer.position, game.input.activePointer.positionDown) > 150 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 250)
            {
                if(firstPointX-lastPointX<0){
                    for (var i in game.global.monsters)
                        game.global.monsters[i].add(300,0);
                }
                else {
                    for (var i in game.global.monsters)
                        game.global.monsters[i].add(-300,0);
                }
                
            }
            if(firstPointX<320)
                paddle_left.down();
            else
                paddle_right.down();
            /*if(swipeCoordX2 < swipeCoordX - swipeMinDistance){
                console.log("left");
            }else if(swipeCoordX2 > swipeCoordX + swipeMinDistance){
                console.log("right");
            }else if(swipeCoordY2 < swipeCoordY - swipeMinDistance){
                console.log("up");
            }else if(swipeCoordY2 > swipeCoordY + swipeMinDistance){
                console.log("down");
            }*/
        }, this);      

        key_M.onUp.add(function() {
            for (var i in game.global.monsters) {
                game.global.monsters[i].add(300,0);
            }
        });

        key_Q.onUp.add(function() {
            for (var i in game.global.monsters) {
                game.global.monsters[i].add(-300,0);
            }
        });

        spacebar.onUp.add(function() {
            if (game.global.currentLevel.phase === "beginning") {
                game.global.currentLevel.defend();
            }
            if (game.global.currentLevel.phase === "constructing" && !game.global.currentLevel.hero.dead) {
                game.global.currentLevel.defend();
            }
            button.label.setText('Next Wave');
        });


        //Begining of the level
        game.global.currentLevel = new Level(waves, 20, 250, [new Entrance(100, -100), new Entrance(400, -100), new Entrance(0, 280)],20);

        //!!!!!!!!!!GLOBAL TO REMOVE !!!!!!
        button = new LabelButton(game, game.world.centerX, game.world.centerY + 500, 'wood_frame', 'Click & die', game.global.currentLevel.defend, game.global.currentLevel, 'white');
        button.onInputUp.add(function() {
            if (game.global.currentLevel.countWave === 1) {
                var firstBumperHint = new TextHint('Ho... poor enemies...', 300, 750);
                button.label.setText('Spacebar ?');
            }
            else {
                button.label.setText('Next Wave');
            }
        }, this);
        button.scale.x = 0.4;
        button.scale.y = 0.4;

        bumper = new Bumper(320, 1070);
        bumper.drag = true;
        bumper.heatLimit = 10;
        game.global.towers.push(bumper);

        var bumper = new Bumper(155, 650);
        game.global.towers.push(bumper);
        bumper.panel = game.global.currentLevel.panel;

        bumper = new Bumper(420, 550);

        game.global.towers.push(bumper);
        bumper.panel = game.global.currentLevel.panel;

        bumper = new Saw(540, 200, 'right', true);

        game.global.currentLevel.panel.saws.push(bumper);
        bumper.panel = game.global.currentLevel.panel;

        bumper = new Saw(80, 480, 'left', true);

        game.global.currentLevel.panel.saws.push(bumper);
        bumper.panel = game.global.currentLevel.panel;

        bumper = new Saw(600, 420, 'right', true);

        game.global.currentLevel.panel.saws.push(bumper);
        bumper.panel = game.global.currentLevel.panel;

        bumper = new Saw(600, 620, 'right', true);

        game.global.currentLevel.panel.saws.push(bumper);
        bumper.panel = game.global.currentLevel.panel;

        bumper = new Saw(80, 210, 'left', true);

        game.global.currentLevel.panel.saws.push(bumper);
        bumper.panel = game.global.currentLevel.panel;

        game.global.blockers = [];
        game.global.blockers.push(new Blocker(65, 720, 50));
        game.global.blockers.push(new Blocker(580, 670, -50));

        game.global.unblocks = [];
        game.global.unblocks.push(new Unblock(270, 420));
        game.global.unblocks.push(new Unblock(100, 740));
        game.global.unblocks.push(new Unblock(540, 700));

        var P_hint = new Hint("P", 10, 430, 1000);
        var Q_hint = (game.global.language !== 'fr') ? new Hint("Q", 10, 230, 1000) : new Hint("A", 10, 230, 1000);
    },

    update: function() {

        if (game.global.currentLevel.phase === "defending") {
            game.global.currentLevel.hero.addTime();
            for (var i in game.global.towers) {
                game.global.towers[i].update();
            }
            for (var i in game.global.monsters) {
                game.global.monsters[i].update();
            }
            game.global.currentLevel.currentWave.update();
            button.visible = false;
            if (game.global.monsters.length === 0 && !game.global.currentLevel.currentWave.isRunning()) {
                if (game.global.currentLevel.waves.length > 0)
                    game.global.currentLevel.construct();
                else if (!game.global.currentLevel.won) {
                    game.global.currentLevel.won = true;
                    setTimeout(function() {
                        game.global.currentLevel.endLevel();
                    }, Phaser.Timer.SECOND * 5);
                }
            }
        }
        else if (game.global.currentLevel.phase === "constructing" && !game.global.currentLevel.hero.dead) {
            if (game.global.currentLevel.countWave === 1) {
                game.time.events.add(5000, function() {
                    button.visible = true;
                });
            }
            else {
                button.visible = true;
            }
        }

    },

    render: function() {

    },
};

var level1 = {
    dirt: null,
    LStick: null,
    RStick: null,
    UStick: null,
    player: null,
    left: null,
    right: null,
    stay: null,
    txt: null,
    plats: null,
    platXY:[[350,630],[500,300],[800,530],[100,240],[1200,250],[1330,650],[1700,360],[1950,750],[2000,360]],
    coins:null,
    coinXY:[[230,100],[900,650],[1330,140],[2150,500]],
    Xcoins:0,
    spikes:null,
    spikeXY:[[530,250],[130,190],[700,695],[1430,200],[1220,695],[1430,595],[1650,445],[1800,305],[1640,695],[2150,695]],
    preload: function () {
        game.load.image('left', 'img/arrowLeft.png');
        game.load.image('right', 'img/arrowRight.png');
        game.load.image('up', 'img/arrowUp.png');
        game.load.image('bg', 'img/level1/bg1.png');
        game.load.image('bgC', 'img/level1/bgC.png');
        game.load.image('dirt', 'img/level1/dirt.png');
        game.load.image('house', 'img/level1/house1.png');
        game.load.image('coin', 'img/coin.png');
        game.load.image('spike', 'img/spike.png');
        game.load.spritesheet('dude', 'img/Rogue.png', 32, 33);
        game.load.image('plat', 'img/level1/platform.png');
    },
    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 4000, 800);
        this.bgC = game.add.image(0, 0, 'bgC');
        this.bgC.scale.setTo(2.5, 2.8);
        this.bg = game.add.image(1220, 0, 'bg');
        this.bg.scale.setTo(2.5, 2.8);
        this.bgC = game.add.image(2460, 0, 'bgC');
        this.bgC.scale.setTo(2.5, 2.8);
        this.bgC = game.add.image(3700, 0, 'bgC');
        this.bgC.scale.setTo(2.5, 2.8);

        this.dirt = game.add.group();
        this.dirt.enableBody = true;
        for (var i = 0; i < 90; i++) {
            var c = this.dirt.create(i * 50, game.world.height, 'dirt');
            c.scale.setTo(4, 4);
            c.anchor.setTo(0, 1);
            c.body.immovable = true;
        }

        game.time.events.add(Phaser.Timer.SECOND * 65, this.kill, this);


        /* this.house = game.add.sprite(100, game.world.height + 120, 'house');
        this.house.scale.setTo(1, 1);
        this.house.anchor.setTo(0, 1);
        game.physics.arcade.enable([this.house]);
        this.house.body.immovable = true; */

        this.player = game.add.sprite(60, 600, 'dude');
        game.physics.arcade.enable([this.player]);
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.scale.setTo(3.5, 3.5)
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, true);
        this.player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20], 5, true);
        this.player.animations.add('stayR', [11], 10, true)
        this.player.animations.add('stayL', [10], 10, true)
        game.camera.follow(this.player);

        this.plats = game.add.group();
        this.plats.enableBody = true;
        for (var i = 0; i < this.platXY.length; i++) {
            var d = this.plats.create(this.platXY[i][0], this.platXY[i][1], 'plat');
            d.body.immovable = true;
        }
        this.plats.children[7].angle=-90
        
        this.coins = game.add.group();
        this.coins.enableBody = true;
        for (var i = 0; i < this.coinXY.length; i++) {
            var v = this.coins.create(this.coinXY[i][0], this.coinXY[i][1], 'coin');
            v.scale.setTo(0.2,0.2)
            v.body.immovable = true;
        }
        
        this.spikes = game.add.group();
        this.spikes.enableBody = true;
        for (var i = 0; i < this.spikeXY.length; i++) {
            var c = this.spikes.create(this.spikeXY[i][0], this.spikeXY[i][1], 'spike');
            c.scale.setTo(0.4,0.4)
            c.body.immovable = true;
        }
        this.spikes.children[6].angle=-90

        this.LStick = game.add.sprite(40, 630, 'left');
        this.RStick = game.add.sprite(140, 630, 'right');
        this.UStick = game.add.sprite(1050, 630, 'up');

        this.LStick.inputEnabled = true;
        this.LStick.events.onInputDown.add(this.func1);
        this.LStick.events.onInputUp.add(this.func4);

        this.RStick.inputEnabled = true;
        this.RStick.events.onInputDown.add(this.func2);
        this.RStick.events.onInputUp.add(this.func5);

        this.UStick.inputEnabled = true;
        this.UStick.events.onInputDown.add(this.func3);
        this.UStick.events.onInputUp.add(this.func5);

        this.LStick.fixedToCamera = true;
        this.RStick.fixedToCamera = true;
        this.UStick.fixedToCamera = true;

        this.coinU = game.add.sprite(1030, 30, 'coin');
        this.coinU.fixedToCamera = true;
        this.coinU.scale.setTo(0.2,0.2)

        this.coiner = game.add.text(1100, 45, "x  "+this.Xcoins);
        this.coiner.fixedToCamera = true;
        
        this.txt = game.add.text(500, 35, "Time until event: ");
        this.txt.fixedToCamera = true;
    },


    update: function () {
        game.physics.arcade.collide(this.dirt, this.player);
        game.physics.arcade.collide(this.plats, this.player);
        this.txt.text = "Time Left : "+game.time.events.duration / 1000;
        this.coiner.text = "x  "+this.Xcoins;
        
        game.physics.arcade.collide(this.coins, this.player,this.coinCount);
        game.physics.arcade.collide(this.spikes, this.player,this.kill);
    },
    func1: function () {
        level1.player.body.velocity.x = -400;
        level1.player.animations.play('left');
    },
    func2: function () {
        level1.player.body.velocity.x = 400;
        level1.player.animations.play('right');
    },
    func3: function () {
        if (level1.player.body.touching.down || level1.player.body.onFloor()) {
            level1.player.body.velocity.y = -400;
        }
    },
    func4: function () {
        level1.player.body.velocity.x = 0;
        level1.player.animations.stop();
        level1.player.frame = 3;
    },
    func5: function () {
        level1.player.body.velocity.x = 0;
        level1.player.animations.stop();
        level1.player.frame = 3;
    },
    kill: function () {
        level1.player.animations.play('death');
        level1.player.body.velocity.x = 0;
        level1.player.frame = 3;
        game.time.events.add(Phaser.Timer.SECOND * 1.5, level1.gameOver, this);
    },
    gameOver: function () {
        game.state.start("men")
    },
    coinCount:function(a,b){
        level1.Xcoins++;
        b.kill();
    },
};

var menu={
    text:null,
    text1:null,
    preload:function(){
        game.load.image('bg', 'img/bg.png');
        game.load.image('floor', 'img/factory.png');
    game.load.spritesheet('dude','img/Rogue.png',32,33);
        game.load.image('btn','img/btn_bg.png')
    },
    create:function(){
        game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL; 
        game.world.setBounds(0, 0, 1200, 800);

        this.bg = game.add.image(0, 0, 'bg');
        this.bg.scale.setTo(4.5, 4.5);
        
        this.floor = game.add.sprite(0, game.world.height+158, 'floor');
        this.floor.scale.setTo(2,0.5);
        this.floor.anchor.setTo(0,1);
        game.physics.arcade.enable([this.floor]);
        this.floor.body.immovable=true;
        
        this.bg = game.add.image(0, 0, 'bg');
        this.bg.scale.setTo(4.5, 4.5);
        
        this.player = game.add.sprite(800, 600, 'dude');
        game.physics.arcade.enable([this.player]);
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.scale.setTo(3.5,3.5)

        this.player.animations.add('left', [0, 1, 2,3,4,5,6,7,8],10, true);
        this.player.animations.add('right', [11, 12, 13,14,15,16,17,18,19], 10, true);
        
        this.btn1 = game.add.image(game.world.centerX-130, game.world.centerY-200, 'btn');
        this.btn1.scale.setTo(1, 1);     
        
        this.text = game.add.text(game.world.centerX-60, game.world.centerY-175, "Play",{
            fill: "#403c3c",
            fontSize: "80px",     
            align : 'center',
        });
        this.text.inputEnabled = true;
        this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        
        this.btn2 = game.add.image(game.world.centerX-130, game.world.centerY, 'btn');
        this.btn2.scale.setTo(1, 1);
        
        this.text1 = game.add.text(game.world.centerX-105, game.world.centerY+25, "Config",{
            fill: "#403c3c",
            fontSize: "80px",  
            align : 'center',
        });
        this.text.inputEnabled = true;
        this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        this.text.events.onInputDown.add(this.down, this);
        
    },
    update:function(){
        game.physics.arcade.collide(this.floor, this.player);
    },
    down:function(){
        game.state.start("lev1")
    },
}
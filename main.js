// Created using Phaser API at phaser.io

// Creating a new game in Phaser
var game = new Phaser.Game(1280,600,Phaser.CANVAS,'gameDiv');

// TODO: Change to list of maps
var map;

var box,player1,inputKey;

var mainState = {
   preload:function(){
      
		game.load.image('map',"./images/map_3.1.png");
		game.load.image("player1","./images/car_1.png");
		game.load.image("box","./images/water.png");
   },

   create:function(){
      map = game.add.tileSprite(0,101,1280,499,'map');
	  
		player1 = game.add.sprite(200,200,"player1");
		game.physics.arcade.enable(player1);
		inputKey=game.input.keyboard.createCursorKeys();
   
		box=game.add.group();
		box.enableBody=true;
		for (var i =0; i < 20; i++){
			box.create(i*40,80,"box").body.immovable=true;
			box.create(i*40, 600-40, "box").body.immovable=true;
		}
		for (var j =0; j < 20; j++) {
			box.create(0,j*40,"box").body.immovable=true;
			box.create(800-40,j*40,"box").body.immovable = true;			
		}
		
   },

   update:function(){
	
	// immovable box
		game.physics.arcade.collide(player1,box);
	
	
	// velocity + keyboard
	var velocity=200;	
	player1.body.velocity.setTo(0,0);
	
	if (inputKey.left.isDown && inputKey.up.isDown) {
		player1.body.velocity.x = -velocity;
		player1.body.velocity.y = -velocity;
	}
	else if (inputKey.left.isDown && inputKey.down.isDown) {
		player1.body.velocity.x = -velocity;
		player1.body.velocity.y = +velocity;
	}
	else if (inputKey.right.isDown && inputKey.up.isDown) {
		player1.body.velocity.x = +velocity;
		player1.body.velocity.y = -velocity;
	}
	else if (inputKey.right.isDown && inputKey.down.isDown) {
		player1.body.velocity.x = +velocity;
		player1.body.velocity.y = +velocity;
	}
	else if (inputKey.left.isDown) {
		player1.body.velocity.x = -velocity;
	}
	else if (inputKey.right.isDown) {
		player1.body.velocity.x = +velocity;
	}
	else if (inputKey.up.isDown) {
		player1.body.velocity.y = -velocity;
	}	
	else if (inputKey.down.isDown) {
		player1.body.velocity.y = +velocity;
	}	

	
   }

}

game.state.add('mainState',mainState);

game.state.start('mainState');

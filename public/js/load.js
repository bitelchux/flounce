var loadState = {
	preload: function () {
		// Add a 'loading...' label on the screen
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Display the progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		//Loading assets
		//game.load.image('player', 'assets/player.png');
    	//game.load.image('enemy', 'assets/enemy.png');
    },

    create: function() {
    	//Start the menu
    	game.state.start('menu');
    }
}

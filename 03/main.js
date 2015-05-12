(function() {

var World = Psykick2D.World,
    Factory = Game.Factory,
    SpriteSystem = Psykick2D.Systems.Render.Sprite,
    PlayerControl = Game.PlayerControl;

// Initialize the world
World.init({
  width: 400,
  height: 500,
  backgroundColor: '#000',
  preload: {
    spriteSheets: [
      '../sprites/player.json',
      '../sprites/enemy1.json',
      '../sprites/enemy2.json',
      '../sprites/enemy3.json',
      '../sprites/enemy4.json',
    ]
  }
});

var mainLayer = World.createLayer();

var spriteSystem = new SpriteSystem(),
    controlSystem = new PlayerControl();

// Give the player some controls and draw them
var player = Factory.createPlayer(186, 480);
controlSystem.player = player;
spriteSystem.addEntity(player);

// Add some enemies to the screen
spriteSystem.addEntity(Factory.createOrangeEnemy(20, 20));
spriteSystem.addEntity(Factory.createPurpleEnemy(100, 20));
spriteSystem.addEntity(Factory.createBlueEnemy(180, 20));
spriteSystem.addEntity(Factory.createYellowEnemy(260, 20));

// Add all of the systems to the layer
mainLayer.addSystem(controlSystem);
mainLayer.addSystem(spriteSystem);

// Add the layer to the world to start running it
World.pushLayer(mainLayer);

})();

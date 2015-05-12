(function() {

var World = Psykick2D.World,
    Factory = Game.Factory,
    SpriteSystem = Psykick2D.Systems.Render.Sprite;

// Initialize the world
World.init({
  width: 350,
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

// Create a layer and a way to draw sprites
var mainLayer = World.createLayer(),
    spriteSystem = new SpriteSystem();

// Prepare to draw the player and some enemies
spriteSystem.addEntity(Factory.createPlayer(161, 480));
spriteSystem.addEntity(Factory.createOrangeEnemy(20, 20));
spriteSystem.addEntity(Factory.createPurpleEnemy(100, 20));
spriteSystem.addEntity(Factory.createBlueEnemy(180, 20));
spriteSystem.addEntity(Factory.createYellowEnemy(260, 20));

// Add the drawing system to the layer
mainLayer.addSystem(spriteSystem);

// Add the layer to the world to start running it
World.pushLayer(mainLayer);

})();

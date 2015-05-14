(function() {

var World = Psykick2D.World,
    Factory = Game.Factory,
    SpriteSystem = Psykick2D.Systems.Render.Sprite,
    AnimateSystem = Psykick2D.Systems.Behavior.Animate;

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

// Create a layer and a way to draw sprites
var mainLayer = World.createLayer(),
    spriteSystem = new SpriteSystem();
    animationSystem = new AnimateSystem();

// Create the player and some enemies
var player = Factory.createPlayer(186, 480),
    orange = Factory.createOrangeEnemy(20, 20),
    purple = Factory.createPurpleEnemy(100, 20),
    blue   = Factory.createBlueEnemy(180, 20),
    yellow = Factory.createYellowEnemy(260, 20);

// Prepare to draw everything
spriteSystem.addEntity(player);
spriteSystem.addEntity(orange);
spriteSystem.addEntity(purple);
spriteSystem.addEntity(blue);
spriteSystem.addEntity(yellow);

// Setup the animations
animationSystem.addEntity(player);
animationSystem.addEntity(orange);
animationSystem.addEntity(purple);
animationSystem.addEntity(blue);
animationSystem.addEntity(yellow);

// Add the systems so they'll run
mainLayer.addSystem(spriteSystem);
mainLayer.addSystem(animationSystem);

// Add the layer to the world to start running it
World.pushLayer(mainLayer);

})();

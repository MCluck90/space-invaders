(function() {

var World = Psykick2D.World,
    Factory = Game.Factory,
    SpriteSystem = Psykick2D.Systems.Render.Sprite,
    AnimateSystem = Psykick2D.Systems.Behavior.Animate,
    PlayerControl = Game.PlayerControl,
    EnemyAI = Game.EnemyAI,
    Physics = Game.Physics;

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
      '../sprites/bullet.json'
    ]
  }
});

// Create a layer and a way to draw sprites
var mainLayer = World.createLayer(),
    spriteSystem = new SpriteSystem();
    animationSystem = new AnimateSystem(),
    controls = new PlayerControl(),
    enemyAI = new EnemyAI(),
    physics = new Physics(mainLayer, enemyAI);

// Create the player and some enemies
var player = Factory.createPlayer(210, 430),
    orange = Factory.createOrangeEnemy(20, 20),
    purple = Factory.createPurpleEnemy(100, 20),
    blue   = Factory.createBlueEnemy(180, 20),
    yellow = Factory.createYellowEnemy(260, 20),
    bullet = Factory.createBullet(186, -20);

// Prepare to draw everything
spriteSystem.addEntity(player);
spriteSystem.addEntity(orange);
spriteSystem.addEntity(purple);
spriteSystem.addEntity(blue);
spriteSystem.addEntity(yellow);
spriteSystem.addEntity(bullet);

// Setup the animations
animationSystem.addEntity(player);
animationSystem.addEntity(orange);
animationSystem.addEntity(purple);
animationSystem.addEntity(blue);
animationSystem.addEntity(yellow);

// Attach the player to the controls
controls.player = player;
controls.bullet = bullet;

// Add the enemies to the AI system
enemyAI.addEntity(orange);
enemyAI.addEntity(purple);
enemyAI.addEntity(blue);
enemyAI.addEntity(yellow);

// Add everything to the physics system
physics.addEntity(player);
physics.addEntity(orange);
physics.addEntity(purple);
physics.addEntity(blue);
physics.addEntity(yellow);
physics.addEntity(bullet);

// Add the systems so they'll run
mainLayer.addSystem(spriteSystem);
mainLayer.addSystem(animationSystem);
mainLayer.addSystem(controls);
mainLayer.addSystem(enemyAI);
mainLayer.addSystem(physics);

// Add the layer to the world to start running it
World.pushLayer(mainLayer);

})();

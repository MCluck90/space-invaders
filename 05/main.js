(function() {

var World = Psykick2D.World,
    Factory = Game.Factory,
    SpriteSystem = Psykick2D.Systems.Render.Sprite,
    PlayerControl = Game.PlayerControl,
    EnemyAI = Game.EnemyAI;

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

var mainLayer = World.createLayer();

// Setup the systems
var spriteSystem = new SpriteSystem(),
    controlSystem = new PlayerControl(),
    enemyAI = new EnemyAI();

// Generate the game objects
var player = Factory.createPlayer(186, 480),
    bullet = Factory.createBullet(186, -20),
    enemy1 = Factory.createOrangeEnemy(20, 20),
    enemy2 = Factory.createPurpleEnemy(100, 20),
    enemy3 = Factory.createBlueEnemy(180, 20),
    enemy4 = Factory.createYellowEnemy(260, 20);

// Give the player some controls
controlSystem.player = player;
controlSystem.bullet = bullet;

// Add the enemies to the AI system
enemyAI.addEntity(enemy1);
enemyAI.addEntity(enemy2);
enemyAI.addEntity(enemy3);
enemyAI.addEntity(enemy4);

// Add the sprites to the drawing system
spriteSystem.addEntity(player);
spriteSystem.addEntity(bullet);
spriteSystem.addEntity(enemy1);
spriteSystem.addEntity(enemy2);
spriteSystem.addEntity(enemy3);
spriteSystem.addEntity(enemy4);

// Add all of the systems to the layer
mainLayer.addSystem(controlSystem);
mainLayer.addSystem(enemyAI);
mainLayer.addSystem(spriteSystem);

// Add the layer to the world to start running it
World.pushLayer(mainLayer);

})();

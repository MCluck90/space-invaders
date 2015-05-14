(function() {

var World = Psykick2D.World,
    Sprite = Psykick2D.Components.GFX.Sprite,
    Animation = Psykick2D.Components.GFX.Animation;

/**
 * Converts degrees to radians
 * @param {number} deg
 */
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Helper function for creating enemies
 * @param {number} num  Determines which color to generate
 * @param {number} x    X position
 * @param {number} y    Y position
 */
function createEnemy(num, x, y) {
  var name = 'enemy' + num,
      enemy = World.createEntity(),
      sprite = new Sprite({
        frameName: name + '-1',
        x: x,
        y: y,
        width: 40,
        height: 30
      }),
      animation = new Animation({
        fps: 8,
        maxFrame: 5,
        frames: [
          name + '-1',
          name + '-2',
          name + '-3',
          name + '-4',
          name + '-5',
          name + '-6'
        ]
      });

  // Used in the physics system
  sprite.newX = x;
  sprite.newY = y;
  enemy.addComponent(sprite);
  enemy.addComponent(animation);
  enemy.addComponentAs(true, 'Enemy');
  return enemy;
}

Game.Factory = {
  createPlayer: function(x, y) {
    var player = World.createEntity(),
        sprite = new Sprite({
          frameName: 'player-1',
          x: x,
          y: y,
          width: 64,
          height: 29,
          rotation: degToRad(270)
        }),
        animation = new Animation({
          maxFrame: 3,
          frames: [
            'player-1',
            'player-2',
            'player-3',
            'player-4'
          ]
        });

    // Used in the physics system
    sprite.newX = x;
    sprite.newY = y;
    player.addComponentAs(true, 'Player'); // Tag as the player
    player.addComponent(sprite);
    player.addComponent(animation);
    return player;
  },

  createOrangeEnemy: function(x, y) {
    return createEnemy(1, x, y);
  },

  createPurpleEnemy: function(x, y) {
    return createEnemy(2, x, y);
  },

  createBlueEnemy: function(x, y) {
    return createEnemy(3, x, y);
  },

  createYellowEnemy: function(x, y) {
    return createEnemy(4, x, y);
  },

  createBullet: function(x, y) {
    var bullet = World.createEntity(),
        sprite = new Sprite({
          frameName: 'bullet',
          x: x,
          y: y,
          width: 8,
          height: 13
        });

    // Used in the physics system
    sprite.newX = x;
    sprite.newY = y;
    bullet.addComponentAs(true, 'Bullet'); // Tag as a bullet
    bullet.addComponent(sprite);
    return bullet;
  }
};

})();

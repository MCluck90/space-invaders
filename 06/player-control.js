(function() {
  var Helper = Psykick2D.Helper,
      Keyboard = Psykick2D.Input.Keyboard,
      Keys = Psykick2D.Keys,
      BehaviorSystem = Psykick2D.BehaviorSystem,
      Factory = Game.Factory,

      BULLET_SPEED = 250,
      SPEED = 100; // Tweak to adjust the players movement speed

  /**
   * Gives the player control over their ship
   */
  var PlayerControl = function() {
    BehaviorSystem.call(this);
  };

  Helper.inherit(PlayerControl, BehaviorSystem);

  /**
   * Update the players position
   * @param {number} delta  Change in time
   */
  PlayerControl.prototype.update = function(delta) {
    if (!this.player) {
      return;
    }

    var velocity = 0,
        player = this.player.getComponent('Sprite'),
        bullet = this.bullet.getComponent('Sprite');
    // Speed is multiplied by the time change to give smooth movement
    if (Keyboard.isKeyDown(Keys.Left)) {
      velocity = -SPEED * delta;
    } else if (Keyboard.isKeyDown(Keys.Right)) {
      velocity = SPEED * delta;
    }

    // Change the sprites position
    player.newX = player.x + velocity;

    // Shoot a bullet
    if (bullet.y <= -bullet.height && Keyboard.isKeyDown(Keys.Space)) {
      bullet.newX = player.newX + (player.height / 2) - (bullet.width / 2);
      bullet.newY = player.y - player.width;
    } else if (bullet.y > -bullet.height) {
      bullet.newY -= BULLET_SPEED * delta;
    }
  };

  Game.PlayerControl = PlayerControl;
})();

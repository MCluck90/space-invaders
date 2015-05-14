(function() {
  var Helper = Psykick2D.Helper,
      Keyboard = Psykick2D.Input.Keyboard,
      Keys = Psykick2D.Keys,
      BehaviorSystem = Psykick2D.BehaviorSystem,
      Factory = Game.Factory,

      MIN_X = 15,
      MAX_X = 340,
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
    player.x += velocity;

    if (player.x < MIN_X) {
      player.x = MIN_X;
    } else if (player.x > MAX_X) {
      player.x = MAX_X;
    }

    // Shoot a bullet
    if (bullet.y <= -bullet.height && Keyboard.isKeyDown(Keys.Space)) {
      bullet.x = player.x - 18;
      bullet.y = player.y;
    } else if (bullet.y > -bullet.height) {
      bullet.y -= BULLET_SPEED * delta;
    }
  };

  Game.PlayerControl = PlayerControl;
})();

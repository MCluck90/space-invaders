(function() {
  var Helper = Psykick2D.Helper,
      Keyboard = Psykick2D.Input.Keyboard,
      Keys = Psykick2D.Keys,
      BehaviorSystem = Psykick2D.BehaviorSystem,

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

    var velocity = 0;
    // Speed is multiplied by the time change to give smooth movement
    if (Keyboard.isKeyDown(Keys.Left)) {
      velocity = -SPEED * delta;
    } else if (Keyboard.isKeyDown(Keys.Right)) {
      velocity = SPEED * delta;
    }

    // Change the sprites position
    this.player.getComponent('Sprite').x += velocity;
  };

  Game.PlayerControl = PlayerControl;
})();

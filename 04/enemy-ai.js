(function() {
  var Helper = Psykick2D.Helper,
      BehaviorSystem = Psykick2D.BehaviorSystem,

      MIN_X = 15,
      MAX_X = 340;

  var EnemyAI = function() {
    BehaviorSystem.call(this);
    this.requiredComponents = ['Enemy', 'Sprite'];
    this.speed = 30;
    this.direction = 1;
  };

  Helper.inherit(EnemyAI, BehaviorSystem);

  /**
   * Move enemies
   * @param {number} delta  Change in time
   */
  EnemyAI.prototype.update = function(delta) {
    var minX = null,
        maxX = null,
        velocity = this.speed * this.direction * delta;
    for (var i = 0, len = this.actionOrder.length; i < len; i++) {
      var enemy = this.actionOrder[i],
          sprite = enemy.getComponent('Sprite');

      // Move the enemy
      sprite.x += velocity;

      // Prevent it from going outside of the bounds
      if (sprite.x < MIN_X) {
        sprite.x = MIN_X;
      } else if (sprite.x > MAX_X) {
        sprite.x = MAX_X;
      }

      // Track the minimum/maximum X
      if (minX === null || sprite.x < minX) {
        minX = sprite.x;
      }
      if (maxX === null || sprite.x > maxX) {
        maxX = sprite.x;
      }
    }

    // If the row has moved outside the bounds
    if (minX <= MIN_X || maxX >= MAX_X) {
      // Flip the direction and speed up
      this.direction = this.direction * -1;
      this.speed += 1;

      for (var i = 0, len = this.actionOrder.length; i < len; i++) {
        var enemy = this.actionOrder[i],
            sprite = enemy.getComponent('Sprite');

        // Move the enemies closer to the player
        sprite.y += sprite.height / 2;
      }
    }
  };

  Game.EnemyAI = EnemyAI;
})();

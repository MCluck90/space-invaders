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
    this.moveDown = true;
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
      sprite.newX = sprite.x + velocity;

      // Prevent it from going outside of the bounds
      if (sprite.newX < MIN_X) {
        sprite.newX = MIN_X;
      } else if (sprite.newX > MAX_X) {
        sprite.newX = MAX_X;
      }

      // Track the minimum/maximum X
      if (minX === null || sprite.newX < minX) {
        minX = sprite.newX;
      }
      if (maxX === null || sprite.newX > maxX) {
        maxX = sprite.newX;
      }
      sprite.newY = sprite.y;
    }

    // If the row has moved outside the bounds
    if (minX <= MIN_X || maxX >= MAX_X) {
      // Flip the direction and speed up
      this.direction = this.direction * -1;
      if (this.moveDown) {
        this.speed += 1;

        for (var i = 0, len = this.actionOrder.length; i < len; i++) {
          var enemy = this.actionOrder[i],
              sprite = enemy.getComponent('Sprite');

          // Move the enemies closer to the player
          sprite.newY = sprite.y + (sprite.height / 2);
        }
      }
    }
  };

  Game.EnemyAI = EnemyAI;
})();

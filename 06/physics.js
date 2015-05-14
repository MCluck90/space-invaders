(function() {
  var Helper = Psykick2D.Helper,
      BehaviorSystem = Psykick2D.BehaviorSystem,
      CollisionGrid = Psykick2D.DataStructures.CollisionGrid;

  var Physics = function(layer, enemyAI) {
    BehaviorSystem.call(this);
    this.requiredComponents = ['Sprite'];
    this.layer = layer;
    this.enemyAI = enemyAI;
    this.grid = new CollisionGrid({
      width: 400,
      height: 500,
      cellSize: 100,
      componentType: 'Sprite'
    });
  };

  Helper.inherit(Physics, BehaviorSystem);

  Physics.prototype.addEntity = function(entity) {
    if (BehaviorSystem.prototype.addEntity.call(this, entity)) {
      this.grid.addEntity(entity);
      return true;
    }

    return false;
  };

  Physics.prototype.removeEntity = function(entity) {
    if (BehaviorSystem.prototype.removeEntity.call(this, entity)) {
      this.grid.removeEntity(entity);
      return true;
    }

    return false;
  };

  Physics.prototype.update = function(delta) {
    // Move all of the entities
    var entities = this.actionOrder.slice(0);
    for (var i = 0, len = entities.length; i < len; i++) {
      var entity = entities[i],
          sprite = entity.getComponent('Sprite');

      this.grid.removeEntity(entity);
      sprite.x = sprite.newX;
      sprite.y = sprite.newY;
      this.grid.addEntity(entity);
    }

    // Check for collisions
    for (var i = 0, len = entities.length; i < len; i++) {
      var entity = entities[i],
          collisions = this.grid.getCollisions(entity);
      if (collisions.length === 0) {
        continue;
      }

      if (entity.hasComponent('Bullet')) {
        for (var j = 0, len2 = collisions.length; j < len2; j++) {
          var other = collisions[j];
          if (other.hasComponent('Player')) {
            continue;
          }

          this.layer.removeEntity(other);
        }

        var bullet = entity.getComponent('Sprite');
        bullet.newY = -bullet.height;
      } else if (entity.hasComponent('Enemy')) {
        for (var j = 0, len2 = collisions.length; j < len2; j++) {
          var other = collisions[j];
          console.log(other);
          if (!other.hasComponent('Player')) {
            continue;
          }

          this.layer.removeEntity(other);
          this.enemyAI.moveDown = false; // Make the aliens hover after killing you
        }
      }
    }
  };

  Game.Physics = Physics;
})();

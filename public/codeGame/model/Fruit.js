angular.module('bsyKidCoder')

/**
 * Food for the worm.
 */
.factory('Fruit',
['$window', 'BLOCK_SIZE', 'BOARD_WIDTH', 'BOARD_HEIGHT', 'WorldObject', 'Rectangle',
function($window, BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, WorldObject, Rectangle)
{
  'use strict';

  // Fruit extends WorldObject.
  Fruit.prototype = Object.create(WorldObject.prototype);
  Fruit.prototype.constructor = Fruit;

  /**
   * Initialize the Fruit.
   * @param name The name of the fruit.
   */
  function Fruit(name)
  {
    WorldObject.call(this, name);

    // Fruit gets added randomly in the world.  The place where the block gets
    // added must be divisible by BLOCK_SIZE.
    var x = $window.Math.floor($window.Math.random() * (BOARD_WIDTH / BLOCK_SIZE)) * BLOCK_SIZE;
    var y = $window.Math.floor($window.Math.random() * (BOARD_HEIGHT / BLOCK_SIZE)) * BLOCK_SIZE;

    this.setLocation(x, y);
    this.addShape(new Rectangle(x, y, BLOCK_SIZE, BLOCK_SIZE, 'blue'));
  }

  return Fruit;
}]);


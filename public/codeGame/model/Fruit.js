angular.module('bsyKidCoder')

/**
 * Food for the worm.
 */
.factory('Fruit',
['$window', 'BLOCK_SIZE', 'BOARD_WIDTH', 'BOARD_HEIGHT', 'Rectangle',
function($window, BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, Rectangle)
{
  'use strict';

  // Fruit extends Rectangle.
  Fruit.prototype = Object.create(Rectangle.prototype);
  Fruit.prototype.constructor = Fruit;

  /**
   * Initialize the Fruit.
   * @param name The name of the fruit.
   */
  function Fruit(name)
  {
    // The playable area is the size of the board minus the two walls.
    var playableWidth  = BOARD_WIDTH  - BLOCK_SIZE * 2;
    var playableHeight = BOARD_HEIGHT - BLOCK_SIZE * 2;

    // Fruit gets added randomly in the world.  The place where the block gets
    // added must be divisible by BLOCK_SIZE.
    var x = $window.Math.floor($window.Math.random() * (playableWidth  / BLOCK_SIZE)) * BLOCK_SIZE + BLOCK_SIZE;
    var y = $window.Math.floor($window.Math.random() * (playableHeight / BLOCK_SIZE)) * BLOCK_SIZE + BLOCK_SIZE;

    Rectangle.call(this,
    {
      name:   name,
      x:      x,
      y:      y,
      width:  BLOCK_SIZE,
      height: BLOCK_SIZE,
      color:  'blue'
    });
  }

  return Fruit;
}]);


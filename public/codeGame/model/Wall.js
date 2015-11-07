angular.module('bsyKidCoder')

/**
 * One of the walls of the game.
 */
.factory('Wall',
['BLOCK_SIZE', 'WorldObject', 'Rectangle',
function(BLOCK_SIZE, WorldObject, Rectangle)
{
  'use strict';

  Wall.LOCATION =
  {
    TOP:    'top',
    LEFT:   'left',
    BOTTOM: 'bottom',
    RIGHT:  'right'
  };

  // Wall extends WorldObject.
  Wall.prototype = Object.create(WorldObject.prototype);
  Wall.prototype.constructor = Wall;

  /**
   * Initialize the wall.
   * @param gameWidth The width of the game board.
   * @param gameHeight The height of the game board.
   * @param loc The location of the wall (Wall.LOCATION).
   */
  function Wall(gameWidth, gameHeight, loc)
  {
    WorldObject.call(this, loc + '_wall');

    var color = 'grey';

    switch (loc)
    {
      case 'top':
        this.setLocation(0, 0);
        for (var i = 0; i < gameWidth / BLOCK_SIZE; ++i)
          this.addShape(new Rectangle(i * BLOCK_SIZE, 0, BLOCK_SIZE, BLOCK_SIZE, color));
        break;
      case 'left':
        this.setLocation(0, 0);
        for (var i = 0; i < gameHeight / BLOCK_SIZE; ++i)
          this.addShape(new Rectangle(0, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, color));
        break;
      case 'bottom':
        this.setLocation(0, gameHeight);
        for (var i = 0; i < gameWidth / BLOCK_SIZE; ++i)
          this.addShape(new Rectangle(i * BLOCK_SIZE, gameHeight - BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, color));
        break;
      case 'right':
        this.setLocation(gameWidth, 0);
        for (var i = 0; i < gameHeight / BLOCK_SIZE; ++i)
          this.addShape(new Rectangle(gameWidth - BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, color));
        break;
      default:
        throw new Error('Invalid location.');
    }
  }

  return Wall;
}]);


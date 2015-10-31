angular.module('bsyKidCoder')

/**
 * One of the walls of the game.
 */
.factory('Wall',
['GameWorldObject', 'Rectangle',
function(GameWorldObject, Rectangle)
{
  'use strict';

  Wall.LOCATION =
  {
    TOP:    'top',
    LEFT:   'left',
    BOTTOM: 'bottom',
    RIGHT:  'right'
  };

  // Wall extends GameWorldObject.
  Wall.prototype = Object.create(GameWorldObject.prototype);
  Wall.prototype.constructor = Wall;

  /**
   * Initialize the wall.
   * @param gameWidth The width of the game board.
   * @param gameHeight The height of the game board.
   * @param loc The location of the wall (Wall.LOCATION).
   */
  function Wall(gameWidth, gameHeight, loc)
  {
    GameWorldObject.call(this, loc + '_wall');

    var color   = 'grey';
    var blkSize = 10;

    switch (loc)
    {
      case 'top':
        this.setLocation(0, 0);
        for (var i = 0; i < gameWidth / blkSize; ++i)
          this.addShape(new Rectangle(i * blkSize, 0, blkSize, blkSize, color));
        break;
      case 'left':
        this.setLocation(0, 0);
        for (var i = 0; i < gameHeight / blkSize; ++i)
          this.addShape(new Rectangle(0, i * blkSize, blkSize, blkSize, color));
        break;
      case 'bottom':
        this.setLocation(0, gameHeight);
        for (var i = 0; i < gameHeight / blkSize; ++i)
          this.addShape(new Rectangle(i * blkSize, gameHeight - blkSize, blkSize, blkSize, color));
        break;
      case 'right':
        this.setLocation(gameWidth, 0);
        for (var i = 0; i < gameWidth / blkSize; ++i)
          this.addShape(new Rectangle(gameWidth - blkSize, i * blkSize, blkSize, blkSize, color));
        break;
      default:
        throw new Error('Invalid location.');
    }
  }

  return Wall;
}]);


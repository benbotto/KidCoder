angular.module('bsyKidCoder')

/**
 * Specialized game for KidCoder.
 */
.factory('KidCoderGame',
[
  '$window', 'BOARD_WIDTH', 'BOARD_HEIGHT', 'BLOCK_SIZE', 'Game', 'GameWorld',
  'WormRenderer', 'Worm', 'Fruit', 'RectangleRenderer', 'Rectangle',
function($window, BOARD_WIDTH, BOARD_HEIGHT, BLOCK_SIZE, Game, GameWorld,
  WormRenderer, Worm, Fruit, RectangleRenderer, Rectangle)
{
  'use strict';

  // KidCodeGame extends Game.
  KidCoderGame.prototype = Object.create(Game.prototype);
  KidCoderGame.prototype.constructor = KidCoderGame;

  /**
   * Initialize.
   */
  function KidCoderGame()
  {
    Game.call(this, new GameWorld(BOARD_WIDTH, BOARD_HEIGHT));

    this._fruitAdded = 0;

    var leftWall = new Rectangle
    ({
      name:   'left_wall',
      color:  'grey',
      width:  BLOCK_SIZE,
      height: this.gameWorld.height,
      x:      0,
      y:      0
    });

    var rightWall = new Rectangle
    ({
      name:   'right_wall',
      color:  'grey',
      width:  BLOCK_SIZE,
      height: this.gameWorld.height,
      x:      this.gameWorld.width - BLOCK_SIZE,
      y:      0
    });

    var topWall = new Rectangle
    ({
      name:   'top_wall',
      color:  'grey',
      width:  this.gameWorld.height - BLOCK_SIZE * 2,
      height: BLOCK_SIZE,
      x:      BLOCK_SIZE,
      y:      0
    });

    var bottomWall = new Rectangle
    ({
      name:   'bottom_wall',
      color:  'grey',
      width:  this.gameWorld.height - BLOCK_SIZE * 2,
      height: BLOCK_SIZE,
      x:      BLOCK_SIZE,
      y:      this.gameWorld.height - BLOCK_SIZE
    });

    var worm = new Worm();

    this.gameWorld.addWorldObject(leftWall);
    this.gameWorld.addWorldObject(rightWall);
    this.gameWorld.addWorldObject(topWall);
    this.gameWorld.addWorldObject(bottomWall);
    this.gameWorld.addWorldObject(worm);
    this.addRenderer(new RectangleRenderer(leftWall));
    this.addRenderer(new RectangleRenderer(rightWall));
    this.addRenderer(new RectangleRenderer(topWall));
    this.addRenderer(new RectangleRenderer(bottomWall));
    this.addRenderer(new WormRenderer(worm));
  }

  /**
   * Tick the game.
   * @param elapsed The total elapsed time, in ms.
   */
  KidCoderGame.prototype.tick = function(elapsed)
  {
    if (this.getState() === 'playing')
    {
      // 1 / 1000 chance of adding fruit to the world.
      if ($window.Math.random() >= 0.999)
      {
        var name  = 'fruit' + this._fruitAdded++;
        var fruit = new Fruit(name);
        this.gameWorld.addWorldObject(fruit);
        this.addRenderer(new RectangleRenderer(fruit));
      }
    }

    Game.prototype.tick.call(this, elapsed);
  };

  return KidCoderGame;
}]);


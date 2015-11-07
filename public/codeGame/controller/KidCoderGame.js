angular.module('bsyKidCoder')

/**
 * Specialized game for KidCoder.
 */
.factory('KidCoderGame',
['$window', 'BOARD_WIDTH', 'BOARD_HEIGHT', 'Game', 'GameWorld', 'Worm', 'Wall', 'Fruit',
function($window, BOARD_WIDTH, BOARD_HEIGHT, Game, GameWorld, Worm, Wall, Fruit)
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

    this.gameWorld.addWorldObject(new Worm());
    this.gameWorld.addWorldObject(
      new Wall(this.gameWorld.width,  this.gameWorld.height, 'top'));
    this.gameWorld.addWorldObject(
      new Wall(this.gameWorld.width,  this.gameWorld.height, 'left'));
    this.gameWorld.addWorldObject(
      new Wall(this.gameWorld.width,  this.gameWorld.height, 'bottom'));
    this.gameWorld.addWorldObject(
      new Wall(this.gameWorld.width,  this.gameWorld.height, 'right'));
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
      if ($window.Math.random() >= .999)
      {
        var name  = 'fruit' + this._fruitAdded++;
        this.gameWorld.addWorldObject(new Fruit(name));
      }
    }

    Game.prototype.tick.call(this, elapsed);
  };

  return KidCoderGame;
}]);


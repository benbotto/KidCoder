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

    this.gameWorld.addGameWorldObject(new Worm());
    this.gameWorld.addGameWorldObject(
      new Wall(this.gameWorld.width,  this.gameWorld.height, 'top'));
    this.gameWorld.addGameWorldObject(
      new Wall(this.gameWorld.width,  this.gameWorld.height, 'left'));
    this.gameWorld.addGameWorldObject(
      new Wall(this.gameWorld.width,  this.gameWorld.height, 'bottom'));
    this.gameWorld.addGameWorldObject(
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
        this.gameWorld.addGameWorldObject(new Fruit(name));
      }
    }

    Game.prototype.tick.call(this, elapsed);
  };

  return KidCoderGame;
}]);


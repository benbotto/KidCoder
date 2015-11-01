angular.module('bsyKidCoder')

/**
 * Specialized game for KidCoder.
 */
.factory('KidCoderGame',
['Game', 'Worm', 'Wall',
function(Game, Worm, Wall)
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
    Game.call(this);

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

  return KidCoderGame;
}]);


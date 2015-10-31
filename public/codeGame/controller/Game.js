angular.module('bsyKidCoder')

/**
 * A Game model.  The game holds the game world, and the state of the game
 * (playing, paused, etc.).
 */
.factory('Game',
[
function()
{
  'use strict';

  Game.GAME_STATE =
  {
    PLAYING:   'playing',
    PAUSED:    'paused',
    GAME_OVER: 'game over'
  };

  /**
   * Initialize the game.
   * @param gameWorld An instance of a GameWorld.
   */
  function Game(gameWorld)
  {
    this.gameWorld  = gameWorld;
    this.speed      = 20; // In units per second.
    this._gameState = Game.GAME_STATE.PAUSED;
    this._elapsed   = 0;
  }

  /**
   * Get the state of the game.
   */
  Game.prototype.getState = function()
  {
    return this._gameState;
  };

  /**
   * Start the game.
   */
  Game.prototype.start = function()
  {
    this._gameState = Game.GAME_STATE.PLAYING;
  };

  /**
   * Pause the game.
   */
  Game.prototype.pause = function()
  {
    this._gameState = Game.GAME_STATE.PAUSED;
  };

  /**
   * Sets the game as over.
   */
  Game.prototype.gameOver = function()
  {
    this._gameState = Game.GAME_STATE.GAME_OVER;
  };

  /**
   * Get the elapsed time.
   */
  Game.prototype.getElapsed = function()
  {
    return this._elapsed;
  };

  /**
   * Tick the game.
   * @param elapsed The elapsed time, in ms, since the last tick.
   */
  Game.prototype.tick = function(elapsed)
  {
    this._elapsed += elapsed;
  };

  return Game;
}]);


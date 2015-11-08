angular.module('bsyGame')

/**
 * A Game controller.  The game holds the game world, and the state of the game
 * (playing, paused, etc.).
 */
.factory('Game',
['GameWorld',
function(GameWorld)
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
   * @param gameWorld An instance of a GameWorld (defaults to new GameWorld()).
   */
  function Game(gameWorld)
  {
    this.renderers  = [];
    this.gameWorld  = gameWorld || new GameWorld();
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
   * @param elapsed The total elapsed time, in ms.
   */
  Game.prototype.tick = function(elapsed)
  {
    if (this.getState() === 'playing')
      this.gameWorld.tick(elapsed - this._elapsed);
    this._elapsed = elapsed;
  };

  /**
   * Add a renderer (view).
   * @param renderer A renderer that draws a GameObject.
   */
  Game.prototype.addRenderer = function(renderer)
  {
    this.renderers.push(renderer);
  };

  /**
   * Get the array of renderers.
   */
  Game.prototype.getRenderers = function()
  {
    return this.renderers;
  };

  return Game;
}]);


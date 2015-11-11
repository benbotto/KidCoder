angular.module('bsyGame')

/**
 * A game timer that drives a game's update loop.
 */
.factory('GameTimer',
['$interval',
function($interval)
{
  'use strict';

  /**
   * Initialize the game timer.
   * @param tickTime How often to tick, in milliseconds.
   * @param game The game instance.  tick() is called each update with the
   *        total elapsed time.
   */
  function GameTimer(tickTime, game)
  {
    var start = new Date();

    $interval(function()
    {
      var now = new Date();
      game.tick(now.getTime() - start.getTime());
    }, tickTime);
  }

  return GameTimer;
}]);


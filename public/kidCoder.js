angular.module('bsyKidCoder', ['ngRoute'])

/**
 * Configure the routing.
 */
.config(['$routeProvider', function($routeProvider)
{
  'use strict';

  $routeProvider
    .when('/',
    {
      templateUrl: 'codeGame/code-game.html',
      controller: 'CodeGameCtrl'
    })
    .otherwise
    ({
      redirectTo: '/'
    });
}])

/**
 * Game-wide constants.
 */
.value('BOARD_WIDTH',  500)  // Width of the board.
.value('BOARD_HEIGHT', 500)  // Height of the board.
.value('BLOCK_SIZE',   10)   // Width/height of a block.
.value('TICK_TIME',    500); // In milliseconds.


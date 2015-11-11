angular.module('bsyKidCoder')

/**
 * Controller for the code game.  This is the entry point for the game.
 */
.controller('CodeGameCtrl',
['$scope', 'TICK_TIME', 'KidCoderGame', 'GameTimer',
function($scope, TICK_TIME, KidCoderGame, GameTimer)
{
  'use strict';

  $scope.game   = new KidCoderGame();
  var gameTimer = new GameTimer(TICK_TIME, $scope.game);
}]);


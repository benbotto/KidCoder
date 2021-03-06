angular.module('bsyKidCoder')

/**
 * Controller for the code game.  This is the entry point for the game.
 */
.controller('CodeGameCtrl',
['$scope', 'TICK_TIME', 'KidCoderGame', 'GameTimer',
function($scope, TICK_TIME, KidCoderGame, GameTimer)
{
  'use strict';

  $scope.restart = function()
  {
    $scope.game = new KidCoderGame();
    new GameTimer(TICK_TIME, $scope.game);
  };

  $scope.restart();
}]);


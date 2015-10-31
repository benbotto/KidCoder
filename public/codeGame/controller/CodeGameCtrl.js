angular.module('bsyKidCoder')

/**
 * Controller for the code game.  This is the entry point for the game.
 */
.controller('CodeGameCtrl',
['$scope', '$window', 'Game', 'GameWorld', 'Worm', 'Wall',
function($scope, $window, Game, GameWorld, Worm, Wall)
{
  'use strict';

  $scope.game = new Game(new GameWorld());
  $scope.game.gameWorld.addGameWorldObject(new Worm());
  $scope.game.gameWorld.addGameWorldObject(
    new Wall($scope.game.gameWorld.width,  $scope.game.gameWorld.height, 'top'));
  $scope.game.gameWorld.addGameWorldObject(
    new Wall($scope.game.gameWorld.width,  $scope.game.gameWorld.height, 'left'));
  $scope.game.gameWorld.addGameWorldObject(
    new Wall($scope.game.gameWorld.width,  $scope.game.gameWorld.height, 'bottom'));
  $scope.game.gameWorld.addGameWorldObject(
    new Wall($scope.game.gameWorld.width,  $scope.game.gameWorld.height, 'right'));

  function tick(elapsed)
  {
    // Update the game world, passing in the elapsed time (in ms) so that
    // the speed of objects can be calculated consistently across machines.
    $scope.game.tick(elapsed);

    // Fire animations at the screen's refresh rate.
    $window.requestAnimationFrame(tick);

    // requestAnimationFrame is outside of angular's digest, so an apply is
    // needed.  (Generally $apply is used only in directives, but in this case
    // the game is controlling the game world, and the view is just a dumb
    // renderer.)
    $scope.$apply();
  }
  
  // Start the main game loop.
  $window.requestAnimationFrame(tick);
}]);


describe('CodeGameCtrl test suite.', function()
{
  'use strict';

  var $scope;

  beforeEach(module('bsyKidCoder'));
  beforeEach(inject(function($controller, $rootScope)
  {
    $scope = $rootScope.$new();
    $controller('CodeGameCtrl', {$scope: $scope});
  }));

  // Makes sure the GameWorld instance is present on scope.
  it('makes sure the GameWorld instance is present on scope.', function()
  {
    expect($scope.game).toBeDefined();
    expect($scope.restart).toBeDefined();
  });

  // Makes sure that the restart function works.
  it('makes sure that the restart function works.', function()
  {
    var game = $scope.game;
    $scope.restart();

    expect($scope.game).toBeDefined();
    expect($scope.game).not.toBe(game);
  });
});

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
  });
});

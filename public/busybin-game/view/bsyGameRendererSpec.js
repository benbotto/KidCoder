describe('bsyGameRenderer test suite.', function()
{
  'use strict';

  var scope, iScope, elapsed = 0;

  beforeEach(module('bsyGame'));
  beforeEach(inject(function($rootScope, $compile)
  {
    scope = $rootScope.$new();

    scope.width  = 500;
    scope.height = 600;
    scope.tick   = function()
    {
      ++elapsed;
    };

    scope.getElapsed = function()
    {
      return elapsed;
    };

    scope.renderers = 
    [
      {render: jasmine.createSpy('render1')},
      {render: jasmine.createSpy('render2')}
    ];

    var gameRendEle = $compile
    (
      '<bsy-game-renderer width="width" height="height" renderers="renderers"></bsy-game-renderer>'
    )(scope);

    iScope = gameRendEle.isolateScope();
  }));

  // Checks that the passed-in parameters are defined.
  it('checks that the passed-in parameters are defined.', function()
  {
    expect(iScope.width).toBe(500);
    expect(iScope.height).toBe(600);
    expect(iScope.renderers.length).toBe(2);
  });
});


describe('KidCoderGameSpec', function()
{
  'use strict';

  var game, $window;

  beforeEach(module('bsyKidCoder'));
  beforeEach(module(function($provide)
  {
    $provide.value('BOARD_WIDTH',  500);
    $provide.value('BOARD_HEIGHT', 500);
  }));
  beforeEach(inject(function(KidCoderGame, _$window_)
  {
    game = new KidCoderGame();
    $window = _$window_;
  }));

  // Checks that the game objects are present.
  it('checks that the game objects are present.', function()
  {
    var gw = game.gameWorld;
    expect(gw.getGameWorldObject('worm')).toBeDefined();
    expect(gw.getGameWorldObject('left_wall')).toBeDefined();
    expect(gw.getGameWorldObject('right_wall')).toBeDefined();
    expect(gw.getGameWorldObject('top_wall')).toBeDefined();
    expect(gw.getGameWorldObject('bottom_wall')).toBeDefined();
  });

  // Adds random food to the world.
  it('adds random food to the world.', function()
  {
    var random = spyOn($window.Math, 'random');

    // Not started.
    game.tick(500);
    expect($window.Math.random.calls.count()).toBe(0);

    game.start();
    random.and.returnValue(.998); // Not high enough.
    game.tick(500);
    expect($window.Math.random.calls.count()).toBe(1);

    random.and.returnValue(1); // Add fruit.
    game.tick(500);
    expect(game.gameWorld.getGameWorldObject('fruit0')).toBeDefined();
  });
});


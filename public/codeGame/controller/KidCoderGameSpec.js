describe('KidCoderGameSpec', function()
{
  'use strict';

  var game;

  beforeEach(module('bsyKidCoder'));
  beforeEach(inject(function(KidCoderGame)
  {
    game = new KidCoderGame();
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
});


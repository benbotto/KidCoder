describe('Game test suite.', function()
{
  'use strict';

  var game;

  beforeEach(module('bsyKidCoder'));
  beforeEach(inject(function(Game, GameWorld)
  {
    var gw = new GameWorld();
    game   = new Game(gw);
  }));

  // Checks the default state of the game.
  it('checks the default state of the game.', function()
  {
    expect(game.getState()).toBe('paused');
    expect(game.speed).toBe(20);
  });

  // Starts the game.
  it('starts the game.', function()
  {
    game.start();
    expect(game.getState()).toBe('playing');
  });

  // Pauses the game.
  it('pauses the game.', function()
  {
    game.pause();
    expect(game.getState()).toBe('paused');
  });

  // Flags the game as over.
  it('flags the game as over.', function()
  {
    game.gameOver();
    expect(game.getState()).toBe('game over');
  });

  // Ticks the game.
  it('ticks the game.', function()
  {
    expect(game.getElapsed()).toBe(0);
    game.tick(100);
    expect(game.getElapsed()).toBe(100);
    game.tick(100);
    expect(game.getElapsed()).toBe(200);
  });
});


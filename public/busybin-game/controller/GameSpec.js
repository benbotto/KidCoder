describe('Game test suite.', function()
{
  'use strict';

  var game, Renderer;

  beforeEach(module('bsyGame'));
  beforeEach(inject(function(Game, GameWorld, _Renderer_)
  {
    var gw = new GameWorld();
    game   = new Game(gw);

    Renderer = _Renderer_;
  }));

  // Checks the default state of the game.
  it('checks the default state of the game.', function()
  {
    expect(game.getState()).toBe('paused');
    expect(game.renderers.length).toBe(0);
  });

  // Adds and gets renderers.
  it('adds and gets renderers.', function()
  {
    game.addRenderer({foo: 'bar'});
    game.addRenderer({baz: 'boo'});

    expect(game.getRenderers().length).toBe(2);
  });

  // Removes a renderer.
  it('removes a renderer.', function()
  {
    var wo1 = {name: 'wo1'};
    var wo2 = {name: 'wo2'};
    var wo3 = {name: 'wo3'};

    game.addRenderer(new Renderer(wo1));
    game.addRenderer(new Renderer(wo2));
    game.addRenderer(new Renderer(wo3));

    expect(game.getRenderers().length).toBe(3);
    expect(game.getRenderers()[1].getWorldObject().name).toBe('wo2');

    game.removeRenderer(wo2);
    expect(game.getRenderers().length).toBe(2);
    expect(game.getRenderers()[1].getWorldObject().name).toBe('wo3');

    game.removeRenderer(wo1);
    expect(game.getRenderers().length).toBe(1);
    expect(game.getRenderers()[0].getWorldObject().name).toBe('wo3');

    game.removeRenderer(wo3);
    expect(game.getRenderers().length).toBe(0);
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
    spyOn(game.gameWorld, 'tick');

    game.start();

    expect(game.getElapsed()).toBe(0);
    game.tick(100);
    expect(game.getElapsed()).toBe(100);
    game.tick(200);
    expect(game.getElapsed()).toBe(200);

    expect(game.gameWorld.tick.calls.count()).toBe(2);
  });

  // Makes sure that the game doesn't tick when not playing.
  it('makes sure that the game doesn\'t tick when not playing.', function()
  {
    spyOn(game.gameWorld, 'tick');
    game.tick(100);
    expect(game.gameWorld.tick.calls.count()).toBe(0);
  });
});


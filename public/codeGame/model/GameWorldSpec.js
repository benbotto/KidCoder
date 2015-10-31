describe('GameWorld test suite.', function()
{
  'use strict';

  var GameWorld;

  beforeEach(module('bsyKidCoder'));
  beforeEach(inject(function(_GameWorld_)
  {
    GameWorld = _GameWorld_;
  }));

  // Checks that the game world has appropriate defaults.
  it('Checks that the game world has appropriate defaults.', function()
  {
    var gw = new GameWorld();
    expect(gw.width).toBe(500);
    expect(gw.height).toBe(500);
  });

  // Adds objects to the game.
  it('adds objects to the game.', function()
  {
    var gw   = new GameWorld();
    var worm = {name: 'worm'};
    var dirt = {name: 'dirt'};
    gw.addGameWorldObject(worm)
      .addGameWorldObject(dirt);

    expect(gw.getGameWorldObject('worm')).toBe(worm);
    expect(gw.getGameWorldObject('dirt')).toBe(dirt);
    expect(gw.getGameWorldObjects().length).toBe(2);
    expect(gw.getGameWorldObjects()[0]).toBe(worm);
    expect(gw.getGameWorldObjects()[1]).toBe(dirt);
  });

  // Checks that getting an object that does not exist throws an exception.
  it('checks that getting an object that does not exist throws an exception.', function()
  {
    var gw = new GameWorld();

    expect(function()
    {
      gw.getGameWorldObject('foo');
    }).toThrowError('"foo" is not a valid name.');
  });

  // Checks that names must be unique.
  it('checks that names must be unique.', function()
  {
    var gw   = new GameWorld();
    var worm = {name: 'worm'};

    gw.addGameWorldObject(worm);

    expect(function()
    {
      gw.addGameWorldObject(worm);
    }).toThrowError('"worm" is not a unique name.');
  });

  // Checks that tick updates all game world objects.
  it('checks that tick updates all game world objects.', function()
  {
    var gw   = new GameWorld();
    var worm = {name: 'worm', tick: function() {}};
    var dirt = {name: 'dirt', tick: function() {}};

    spyOn(worm, 'tick');
    spyOn(dirt, 'tick');

    gw.addGameWorldObject(worm)
      .addGameWorldObject(dirt);

    gw.tick(100);

    expect(worm.tick).toHaveBeenCalledWith(100);
    expect(dirt.tick).toHaveBeenCalledWith(100);
  });

  // Checks that an object can be removed.
  it('checks that an object can be removed.', function()
  {
    var gw   = new GameWorld();
    var worm = {name: 'worm', tick: function() {}};
    var dirt = {name: 'dirt', tick: function() {}};

    gw.addGameWorldObject(worm)
      .addGameWorldObject(dirt);

    gw.removeGameWorldObject('worm');

    expect(function()
    {
      gw.getGameWorldObject('worm');
    }).toThrowError('"worm" is not a valid name.');

    expect(gw.getGameWorldObjects().length).toBe(1);
  });
});


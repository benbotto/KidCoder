describe('GameWorld test suite.', function()
{
  'use strict';

  var GameWorld;

  beforeEach(module('bsyGame'));
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
    gw.addWorldObject(worm)
      .addWorldObject(dirt);

    expect(gw.getWorldObject('worm')).toBe(worm);
    expect(gw.getWorldObject('dirt')).toBe(dirt);
    expect(gw.getWorldObjects().length).toBe(2);
    expect(gw.getWorldObjects()[0]).toBe(worm);
    expect(gw.getWorldObjects()[1]).toBe(dirt);
  });

  // Checks that getting an object that does not exist throws an exception.
  it('checks that getting an object that does not exist throws an exception.', function()
  {
    var gw = new GameWorld();

    expect(function()
    {
      gw.getWorldObject('foo');
    }).toThrowError('"foo" is not a valid name.');
  });

  // Checks that names must be unique.
  it('checks that names must be unique.', function()
  {
    var gw   = new GameWorld();
    var worm = {name: 'worm'};

    gw.addWorldObject(worm);

    expect(function()
    {
      gw.addWorldObject(worm);
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

    gw.addWorldObject(worm)
      .addWorldObject(dirt);

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

    gw.addWorldObject(worm)
      .addWorldObject(dirt);

    gw.removeWorldObject('worm');

    expect(function()
    {
      gw.getWorldObject('worm');
    }).toThrowError('"worm" is not a valid name.');

    expect(gw.getWorldObjects().length).toBe(1);
  });
});


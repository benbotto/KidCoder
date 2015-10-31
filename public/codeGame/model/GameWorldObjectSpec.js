describe('GameWorldObject test suite.', function()
{
  'use strict';

  var GameWorldObject;

  beforeEach(module('bsyKidCoder'));
  beforeEach(inject(function(_GameWorldObject_)
  {
    GameWorldObject = _GameWorldObject_;
  }));

  // Checks the defaults.
  it('checks the defaults.', function()
  {
    var gwo = new GameWorldObject('worm');
    expect(gwo.name).toBe('worm');

    expect(function()
    {
      new GameWorldObject();
    }).toThrowError('Name is required.');
  });

  // Checks the initial position.
  it('checks the initial position.', function()
  {
    var gwo = new GameWorldObject('worm');
    expect(gwo.getLocation()).toEqual({x: 0, y: 0});
  });

  // Sets the location.
  it('sets the location.', function()
  {
    var gwo = new GameWorldObject('worm');
    gwo.setLocation(10, 20);
    expect(gwo.getLocation()).toEqual({x: 10, y: 20});
  });

  // Moves the object.
  it('moves the object.', function()
  {
    var gwo = new GameWorldObject('worm');
    gwo.move(3, 2);
    gwo.move(3, 2);
    expect(gwo.getLocation()).toEqual({x: 6, y: 4});
  });

  // Fires the do-nothing tick function.
  it('fires the do-nothing tick function.', function()
  {
    var gwo = new GameWorldObject('worm');
    expect(function()
    {
      gwo.tick(100);
    }).not.toThrow();
  });

  // Adds some shapes to the GameWorldObject.
  it('adds some shapes to the GameWorldObject.', function()
  {
    var gwo = new GameWorldObject('worm');
    var s1  = {x: 0, y: 1};
    var s2  = {x: 2, y: 3};

    gwo
      .addShape(s1)
      .addShape(s2);

    expect(gwo.getShapes().length).toBe(2);
    expect(gwo.getShapes()[0]).toBe(s1);
    expect(gwo.getShapes()[1]).toBe(s2);
  });
});


describe('Wall test suite.', function()
{
  'use strict';

  var Wall;

  beforeEach(module('bsyKidCoder'));
  beforeEach(inject(function(_Wall_)
  {
    Wall = _Wall_;
  }));

  // Verifies that wall location must be valid.
  it('verifies that wall location must be valid.', function()
  {
    expect(function()
    {
      new Wall(500, 500);
    }).toThrowError('Invalid location.');

    expect(function()
    {
      new Wall(500, 500, 'top');
      new Wall(500, 500, 'right');
      new Wall(500, 500, 'bottom');
      new Wall(500, 500, 'left');
    }).not.toThrow();
  });

  // Checks the initial location.
  it('checks the initial location.', function()
  {
    var wall;

    wall = new Wall(500, 500, 'top');
    expect(wall.getLocation()).toEqual({x: 0, y: 0});
    wall = new Wall(500, 500, 'left');
    expect(wall.getLocation()).toEqual({x: 0, y: 0});
    wall = new Wall(500, 500, 'bottom');
    expect(wall.getLocation()).toEqual({x: 0, y: 500});
    wall = new Wall(500, 500, 'right');
    expect(wall.getLocation()).toEqual({x: 500, y: 0});
  });

  // Checks the shapes.
  it('checks the shapes.', function()
  {
    var wall;
    
    wall = new Wall(500, 500, 'top');
    expect(wall.getShapes().length).toBe(50);
    wall = new Wall(500, 500, 'left');
    expect(wall.getShapes().length).toBe(50);
    wall = new Wall(500, 500, 'bottom');
    expect(wall.getShapes().length).toBe(50);
    wall = new Wall(500, 500, 'right');
    expect(wall.getShapes().length).toBe(50);
  });
});


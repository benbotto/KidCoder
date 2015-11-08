describe('WorldObject test suite.', function()
{
  'use strict';

  var WorldObject, vec2;

  beforeEach(module('bsyGame'));
  beforeEach(inject(function(_WorldObject_, _vec2_)
  {
    WorldObject = _WorldObject_;
    vec2        = _vec2_;
  }));

  // Checks the defaults.
  it('checks the defaults.', function()
  {
    var gwo = new WorldObject({name: 'worm'});
    expect(gwo.name).toBe('worm');
    expect(gwo.color).toBe('red');

    expect(function()
    {
      new WorldObject({});
    }).toThrowError('Name is required.');
  });

  // Fires the do-nothing tick function.
  it('fires the do-nothing tick function.', function()
  {
    var gwo = new WorldObject({name: 'worm'});
    expect(function()
    {
      gwo.tick(100);
    }).not.toThrow();
  });

  // Checks that translate works correctly.
  it('checks that translate works correctly.', function()
  {
    var gwo = new WorldObject({name: 'apple'});
    var loc = vec2.fromValues(0, 0);

    // The default matrix is identity - the location does not move.
    vec2.transformMat3(loc, loc, gwo.transform);
    expect(loc).toEqual(vec2.create());

    gwo.translate(10, 5);
    vec2.transformMat3(loc, loc, gwo.transform);
    expect(loc).toEqual(vec2.fromValues(10, 5));

    // Starting at 10, 5, translating by 20, 10, get 30, 15.
    gwo.translate(10, 5);
    vec2.transformMat3(loc, loc, gwo.transform);
    expect(loc).toEqual(vec2.fromValues(30, 15));
  });

  // Translates using the constructor.
  it('translates using the constructor.', function()
  {
    var gwo = new WorldObject({name: 'apple', x: 10, y: 12});
    var loc = vec2.fromValues(0, 0);

    vec2.transformMat3(loc, loc, gwo.transform);
    expect(loc[0]).toBe(10);
    expect(loc[1]).toBe(12);
  });

  // Sets the color in the constructor.
  it('sets the color in the constructor.', function()
  {
    var gwo = new WorldObject({name: 'apple', color: 'green'});
    expect(gwo.color).toBe('green');
  });

  // Makes sure that the world bounds must be implemented.
  it('makes sure that the world bounds must be implemented.', function()
  {
    expect(function()
    {
      var gwo = new WorldObject({name: 'asdf'});
      gwo.getWorldBounds();
    }).toThrowError('WorldObject::getWorldBounds not implemented.');
  });
});


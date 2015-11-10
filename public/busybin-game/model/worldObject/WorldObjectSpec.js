describe('WorldObject test suite.', function()
{
  'use strict';

  var WorldObject, vec2, BoundedWO;

  beforeEach(module('bsyGame'));
  beforeEach(inject(function(_WorldObject_, _vec2_)
  {
    WorldObject = _WorldObject_;
    vec2        = _vec2_;
    BoundedWO   = function(settings)
    {
      this.wb =
      {
        transform: null,
        setTransform: function(trans)
        {
          this.transform = trans;
        }
      };

      WorldObject.call(this, settings);
    };

    // BoundedWO extends WorldObject.
    BoundedWO.prototype = Object.create(WorldObject.prototype);
    BoundedWO.prototype.constructor = BoundedWO;

    // Mock getWorldBounds impl.
    BoundedWO.prototype.getWorldBounds = function()
    {
      return this.wb;
    };
  }));

  // Checks the defaults.
  it('checks the defaults.', function()
  {
    var gwo = new BoundedWO({name: 'worm'});
    expect(gwo.name).toBe('worm');
    expect(gwo.color).toBe('red');

    expect(function()
    {
      new BoundedWO({});
    }).toThrowError('Name is required.');
  });

  // Fires the do-nothing tick function.
  it('fires the do-nothing tick function.', function()
  {
    var gwo = new BoundedWO({name: 'worm'});
    expect(function()
    {
      gwo.tick(100);
    }).not.toThrow();
  });

  // Makes sure that setTransform() updates the WorldBound's transform.
  it('makes sure that setTransform() updates the WorldBound\'s transform.', function()
  {
    var gwo = new BoundedWO({name: 'apple'});
    expect(gwo.getWorldBounds().transform).toBe(gwo.getTransform());
  });

  // Checks that translate works correctly.
  it('checks that translate works correctly.', function()
  {
    var gwo = new BoundedWO({name: 'apple'});
    var loc = vec2.fromValues(0, 0);

    // The default matrix is identity - the location does not move.
    vec2.transformMat3(loc, loc, gwo.getTransform());
    expect(loc).toEqual(vec2.create());

    gwo.translate(10, 5);
    vec2.transformMat3(loc, loc, gwo.getTransform());
    expect(loc).toEqual(vec2.fromValues(10, 5));

    // Starting at 10, 5, translating by 20, 10, get 30, 15.
    gwo.translate(10, 5);
    vec2.transformMat3(loc, loc, gwo.getTransform());
    expect(loc).toEqual(vec2.fromValues(30, 15));
  });

  // Makes sure that translate() updates the WorldBound's transform.
  it('makes sure that translate() updates the WorldBound\'s transform.', function()
  {
    var gwo = new BoundedWO({name: 'apple'});
    expect(gwo.getWorldBounds().transform).toBe(gwo.getTransform());
  });

  // Translates using the constructor.
  it('translates using the constructor.', function()
  {
    var gwo = new BoundedWO({name: 'apple', x: 10, y: 12});
    var loc = vec2.fromValues(0, 0);

    vec2.transformMat3(loc, loc, gwo.getTransform());
    expect(loc[0]).toBe(10);
    expect(loc[1]).toBe(12);
  });

  // Sets the color in the constructor.
  it('sets the color in the constructor.', function()
  {
    var gwo = new BoundedWO({name: 'apple', color: 'green'});
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

  describe('WorldObject collision test suite.', function()
  {
    var Rectangle;

    beforeEach(inject(function(_Rectangle_)
    {
      Rectangle = _Rectangle_;
    }));

    // Checks that a WorldObject does not collide with itself by default.
    it('checks that a WorldObject does not collide with itself by default.', function()
    {
      var gwo = new BoundedWO({name: 'wo1'});
      expect(gwo.collidesWith(gwo)).toBe(false);
    });

    // Checks the collision handling with a Rectangle WorldObject.
    it('checks the collision handling with a Rectangle WorldObject.', function()
    {
      var r1 = new Rectangle({width: 10, height: 10, x: 10, y: 10});
      var r2 = new Rectangle({width: 10, height: 10, x: 15, y: 15});

      expect(r1.collidesWith(r2)).toBe(true);

      r2 = new Rectangle({width: 10, height: 10, x: 21, y: 15});
      expect(r1.collidesWith(r2)).toBe(false);
    });
  });
});


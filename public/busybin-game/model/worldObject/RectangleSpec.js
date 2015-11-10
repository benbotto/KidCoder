describe('Rectangle spec.', function()
{
  'use strict';

  var Rectangle, vec2, mat3;

  beforeEach(module('bsyGame'));
  beforeEach(inject(function(_Rectangle_, _vec2_, _mat3_)
  {
    Rectangle = _Rectangle_;
    vec2      = _vec2_;
    mat3      = _mat3_;
  }));

  // Checks the defaults.
  it('checks the defaults.', function()
  {
    expect(function()
    {
      new Rectangle({});
    }).toThrowError('width is required.');

    expect(function()
    {
      new Rectangle({width: 10});
    }).toThrowError('height is required.');
  });

  // Checks explicit values.
  it('checks explicit values.', function()
  {
    var r = new Rectangle({name: 'rect', width: 10, height: 40, color: 'green'});
    expect(r.name).toBe('rect');
    expect(r.width).toBe(10);
    expect(r.height).toBe(40);
    expect(r.color).toBe('green');
  });

  // Checks that a Rectangle is its own WorldBounds.
  it('checks that a Rectangle is its own WorldBounds.', function()
  {
    var r = new Rectangle({width: 10, height: 10});
    expect(r.getWorldBounds()).toBe(r);
  });

  // Checks the edge location functions.
  it('checks the edge location functions.', function()
  {
    var r = new Rectangle({width: 10, height: 20});
    expect(r.getTop()).toEqual(0);
    expect(r.getLeft()).toEqual(0);
    expect(r.getBottom()).toEqual(20);
    expect(r.getRight()).toBe(10);

    r.translate(5, 6);
    expect(r.getTop()).toEqual(6);
    expect(r.getLeft()).toEqual(5);
    expect(r.getBottom()).toEqual(26);
    expect(r.getRight()).toBe(15);
  });

  // Checks collisions (overlaps).
  it('checks collisions (overlaps).', function()
  {
    var r1 = new Rectangle({width: 10, height: 20});
    var r2 = new Rectangle({width: 10, height: 10});

    r1.translate(10, 10); // r1 goes from (10,10) to (20,30).

    expect(r1.overlaps(r2)).toBe(false);

    r2.translate(1, 1); // (1,1) to (11,11).
    expect(r1.overlaps(r2)).toBe(true);

    r2.translate(4, 4); // (5,5) to (15,15).
    expect(r1.overlaps(r2)).toBe(true);

    r2 = new Rectangle({width: 9, height: 15});
    expect(r1.overlaps(r2)).toBe(false);

    r2.translate(31, 0); // (31,0) to (40,15).
    expect(r1.overlaps(r2)).toBe(false);

    r2 = new Rectangle({x: 11, y: 31, width: 9, height: 9});
    expect(r1.overlaps(r2)).toBe(false);

    r2 = new Rectangle({x: 11, y: 0, width: 9, height: 9});
    expect(r1.overlaps(r2)).toBe(false);
  });

  // Sets a transform directly and verifies that the WorldBounds are updated.
  it('sets a transform directly and verifies that the WorldBounds are updated.', function()
  {
    var trans = mat3.create();
    var by    = vec2.fromValues(3, 5);
    var r     = new Rectangle({width: 10, height: 10});

    mat3.translate(trans, trans, by);

    expect(r.getTransform()).toEqual(mat3.create());
    r.setTransform(trans);
    expect(r.getTransform()).toEqual(trans);
    expect(r.getTop()).toEqual(5);
    expect(r.getBottom()).toEqual(15);
    expect(r.getLeft()).toEqual(3);
    expect(r.getRight()).toBe(13);
  });
});


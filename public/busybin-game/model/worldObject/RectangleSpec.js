describe('Rectangle spec.', function()
{
  'use strict';

  var Rectangle, vec2;

  beforeEach(module('bsyGame'));
  beforeEach(inject(function(_Rectangle_, _vec2_)
  {
    Rectangle = _Rectangle_;
    vec2 = _vec2_;
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

  // Checks the world bounds.
  it('checks the world bounds.', function()
  {
    var r = new Rectangle({width: 10, height: 20});
    var wb = r.getWorldBounds();
    expect(wb.topLeft[0]).toEqual(0);
    expect(wb.topLeft[1]).toEqual(0);
    expect(wb.bottomRight[0]).toEqual(10);
    expect(wb.bottomRight[1]).toEqual(20);

    r.translate(5, 6);
    wb = r.getWorldBounds();
    expect(wb.topLeft[0]).toEqual(5);
    expect(wb.topLeft[1]).toEqual(6);
    expect(wb.bottomRight[0]).toEqual(15);
    expect(wb.bottomRight[1]).toEqual(26);
  });

  // Checks collisions (contains).
  it('checks collisions (contains).', function()
  {
    var r = new Rectangle({width: 10, height: 20});
    var wb;

    r.translate(10, 10); // r goes from (10, 10) to (20, 30).

    wb =
    {
      topLeft: vec2.fromValues(0, 0),
      bottomRight: vec2.fromValues(10, 10)
    };
    expect(r.contains(wb)).toBe(true);

    wb =
    {
      topLeft: vec2.fromValues(5, 5),
      bottomRight: vec2.fromValues(15, 15)
    };
    expect(r.contains(wb)).toBe(true);

    wb =
    {
      topLeft: vec2.fromValues(0, 0),
      bottomRight: vec2.fromValues(9, 15)
    };
    expect(r.contains(wb)).toBe(false);

    wb =
    {
      topLeft: vec2.fromValues(31, 0),
      bottomRight: vec2.fromValues(40, 15)
    };
    expect(r.contains(wb)).toBe(false);

    wb =
    {
      topLeft: vec2.fromValues(11, 31),
      bottomRight: vec2.fromValues(30, 40)
    };
    expect(r.contains(wb)).toBe(false);

    wb =
    {
      topLeft: vec2.fromValues(11, 0),
      bottomRight: vec2.fromValues(20, 9)
    };
    expect(r.contains(wb)).toBe(false);
  });

  // Checks the getLocation() helper function.
  it('checks the getLocation() helper function.', function()
  {
    var r = new Rectangle({width: 10, height: 20, x: 30, y: 40});

    expect(r.getLocation()[0]).toBe(30);
    expect(r.getLocation()[1]).toBe(40);
  });
});


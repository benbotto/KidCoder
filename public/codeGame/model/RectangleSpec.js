describe('Rectangle spec.', function()
{
  'use strict';

  var Rectangle;

  beforeEach(module('bsyKidCoder'));
  beforeEach(inject(function(_Rectangle_)
  {
    Rectangle = _Rectangle_;
  }));

  // Checks the defaults.
  it('checks the defaults.', function()
  {
    var r = new Rectangle();
    expect(r.x).toBe(0);
    expect(r.y).toBe(0);
    expect(r.width).toBe(10);
    expect(r.height).toBe(10);
    expect(r.color).toBe('red');
  });

  // Checks explicit values.
  it('checks explicit values.', function()
  {
    var r = new Rectangle(10, 20, 30, 40, 'green');
    expect(r.x).toBe(10);
    expect(r.y).toBe(20);
    expect(r.width).toBe(30);
    expect(r.height).toBe(40);
    expect(r.color).toBe('green');
  });
});


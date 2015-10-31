describe('Shape test suite.', function()
{
  'use strict';

  var Shape;

  beforeEach(module('bsyKidCoder'));
  beforeEach(inject(function(_Shape_)
  {
    Shape = _Shape_;
  }));

  // Checks the defaults.
  it('checks the defaults.', function()
  {
    var r = new Shape();
    expect(r.x).toBe(0);
    expect(r.y).toBe(0);
    expect(r.color).toBe('red');
  });

  // Checks explicit values.
  it('checks explicit values.', function()
  {
    var r = new Shape(10, 20, 'green');
    expect(r.x).toBe(10);
    expect(r.y).toBe(20);
    expect(r.color).toBe('green');
  });
});


describe('Fruit test suite.', function()
{
  'use strict';

  var Fruit, $window;

  beforeEach(module('bsyKidCoder'));
  beforeEach(module(function($provide)
  {
    $provide.value('BOARD_WIDTH',  500);
    $provide.value('BOARD_HEIGHT', 500);
    $provide.value('BLOCK_SIZE',   10);
  }));
  beforeEach(inject(function(_Fruit_, _$window_)
  {
    Fruit = _Fruit_;
    $window = _$window_;
  }));

  // Checks the rectangle of the fruit.
  it('checks the rectangle of the fruit.', function()
  {
    var f;
    var random = spyOn($window.Math, 'random');
    random.and.returnValue(0);
    
    f = new Fruit('fruit0');
    expect(f.getLocation()).toEqual({x: 0, y: 0});
    expect(f.name).toBe('fruit0');
    expect(f.getShapes()[0].x).toBe(0);
    expect(f.getShapes()[0].y).toBe(0);
    expect(f.getShapes()[0].color).toBe('blue');
  });

  // Checks the random location.
  it('checks the random location.', function()
  {
    var f;
    var random = spyOn($window.Math, 'random');
    random.and.returnValue(.999);
    f = new Fruit('fruit0');
    expect(f.getLocation()).toEqual({x: 490, y: 490});
    expect(f.getShapes()[0].x).toBe(490);
    expect(f.getShapes()[0].y).toBe(490);
  });
});


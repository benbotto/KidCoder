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
    var f = new Fruit('fruit0');
    expect(f.name).toBe('fruit0');
    expect(f.color).toBe('blue');
  });

  // Checks the minimum location.
  it('checks the minimum location.', function()
  {
    var f;
    var random = spyOn($window.Math, 'random');
    random.and.returnValue(0);

    f = new Fruit('fruit0');

    // Minimum is right next to the left/top walls.
    expect(f.getLeft()).toEqual(10);
    expect(f.getTop()).toEqual(10);
  });

  // Checks the maximum location.
  it('checks the maximum location.', function()
  {
    var f;
    var random = spyOn($window.Math, 'random');
    random.and.returnValue(0.999999);

    f = new Fruit('fruit0');

    // Maximum is right next to the right/bottom walls.
    expect(f.getLeft()).toEqual(480);
    expect(f.getTop()).toEqual(480);
  });
});


describe('Worm test suite.', function()
{
  'use strict';

  var worm;

  beforeEach(module('bsyKidCoder'));
  beforeEach(inject(function(Worm)
  {
    worm = new Worm();
  }));
  
  // Checks the defaults.
  it('checks the defaults.', function()
  {
    expect(worm.speed).toBe(20);
    expect(worm.name).toBe('worm');
    expect(worm.color).toBe('red');
    expect(worm.width).toBe(10);
    expect(worm.height).toBe(10);
    expect(worm.getLocation()).toEqual({x: 250, y: 250});
  });

  // Changes the worm's heading.
  it('changes the worm\'s heading.', function()
  {
    worm.setHeading('up');
    expect(worm.getHeading()).toBe('up');
    worm.setHeading('left');
    expect(worm.getHeading()).toBe('left');
    worm.setHeading('down');
    expect(worm.getHeading()).toBe('down');
    worm.setHeading('right');
    expect(worm.getHeading()).toBe('right');
    worm.setHeading('none');
    expect(worm.getHeading()).toBe('none');
    expect(function()
    {
      worm.setHeading('foo');
    }).toThrowError('Invalid heading.');
  });

  // Makes sure that the worm moves on tick.
  it('makes sure that the worm moves on tick.', function()
  {
    worm.setHeading('up');
    worm.tick(1000);
    expect(worm.getLocation()).toEqual({x: 250, y: 230});

    worm.setHeading('left');
    worm.tick(1000);
    expect(worm.getLocation()).toEqual({x: 230, y: 230});

    worm.setHeading('down');
    worm.tick(1000);
    expect(worm.getLocation()).toEqual({x: 230, y: 250});

    worm.setHeading('right');
    worm.tick(1000);
    expect(worm.getLocation()).toEqual({x: 250, y: 250});

    worm.setHeading('none');
    worm.tick(1000);
    expect(worm.getLocation()).toEqual({x: 250, y: 250});
  });
});


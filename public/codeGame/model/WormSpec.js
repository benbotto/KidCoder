describe('Worm test suite.', function()
{
  'use strict';

  var worm;

  beforeEach(module('bsyKidCoder'));
  beforeEach(module(function($provide)
  {
    $provide.value('TICK_TIME',    500);
    $provide.value('BLOCK_SIZE',   10);
    $provide.value('BOARD_WIDTH',  500);
    $provide.value('BOARD_HEIGHT', 500);
  }));
  beforeEach(inject(function(Worm)
  {
    worm = new Worm();
  }));
  
  // Checks the defaults.
  it('checks the defaults.', function()
  {
    var x, y;
    var width = worm.getShapes()[0].width;

    expect(worm.speed).toBe(20);
    expect(worm.name).toBe('worm');
    expect(worm.getLocation()).toEqual({x: 250, y: 250});
    expect(worm.getShapes().length).toBe(4);

    for (var i = 0; i < worm.getShapes().length; ++i)
    {
      y = worm.getLocation().y + i * width;

      expect(worm.getShapes()[i].x).toBe(250);
      expect(worm.getShapes()[i].y).toBe(y);
    }
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
    worm.tick(500);
    expect(worm.getLocation()).toEqual({x: 250, y: 240});

    worm.setHeading('left');
    worm.tick(250); // Time delta too small - no movement.
    expect(worm.getLocation()).toEqual({x: 250, y: 240});
    worm.tick(250);
    expect(worm.getLocation()).toEqual({x: 240, y: 240});

    worm.setHeading('down');
    worm.tick(500);
    expect(worm.getLocation()).toEqual({x: 240, y: 250});

    worm.setHeading('right');
    worm.tick(500);
    expect(worm.getLocation()).toEqual({x: 250, y: 250});

    worm.setHeading('none');
    worm.tick(500);
    expect(worm.getLocation()).toEqual({x: 250, y: 250});
  });

  // Makes sure that the body parts move.
  it('makes sure that the body parts move.', function()
  {
    var shapes = worm.getShapes();

    worm.setLocation(250, 240);
    expect(shapes[0].x).toBe(250);
    expect(shapes[0].y).toBe(240);
    expect(shapes[1].x).toBe(250);
    expect(shapes[1].y).toBe(250);
    expect(shapes[2].x).toBe(250);
    expect(shapes[2].y).toBe(260);
    expect(shapes[3].x).toBe(250);
    expect(shapes[3].y).toBe(270);

    // No movement, no update.
    worm.setLocation(250, 240);
    expect(shapes[0].x).toBe(250);
    expect(shapes[0].y).toBe(240);
    expect(shapes[1].x).toBe(250);
    expect(shapes[1].y).toBe(250);
    expect(shapes[2].x).toBe(250);
    expect(shapes[2].y).toBe(260);
    expect(shapes[3].x).toBe(250);
    expect(shapes[3].y).toBe(270);

    worm.setLocation(250, 230);
    expect(shapes[0].x).toBe(250);
    expect(shapes[0].y).toBe(230);
    expect(shapes[1].x).toBe(250);
    expect(shapes[1].y).toBe(240);
    expect(shapes[2].x).toBe(250);
    expect(shapes[2].y).toBe(250);
    expect(shapes[3].x).toBe(250);
    expect(shapes[3].y).toBe(260);

    worm.setLocation(240, 230);
    worm.setLocation(230, 230);
    expect(shapes[0].x).toBe(230);
    expect(shapes[0].y).toBe(230);
    expect(shapes[1].x).toBe(240);
    expect(shapes[1].y).toBe(230);
    expect(shapes[2].x).toBe(250);
    expect(shapes[2].y).toBe(230);
    expect(shapes[3].x).toBe(250);
    expect(shapes[3].y).toBe(240);
  });
});


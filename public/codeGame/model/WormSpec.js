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
    var y;
    var width = worm.wormParts[0].width;

    expect(worm.speed).toBe(20);
    expect(worm.name).toBe('worm');
    expect(worm.getWorldBounds().getLeft()).toBe(250);
    expect(worm.getWorldBounds().getTop()).toBe(250);
    expect(worm.wormParts.length).toBe(4);

    for (var i = 0; i < worm.wormParts.length; ++i)
    {
      y = worm.getWorldBounds().getTop() + i * width;

      expect(worm.wormParts[i].getWorldBounds().getLeft()).toBe(250);
      expect(worm.wormParts[i].getWorldBounds().getTop()).toBe(y);
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
    expect(worm.getWorldBounds().getLeft()).toBe(250);
    expect(worm.getWorldBounds().getTop()).toBe(240);

    worm.setHeading('left');
    worm.tick(250); // Time delta too small - no movement.
    expect(worm.getWorldBounds().getLeft()).toBe(250);
    expect(worm.getWorldBounds().getTop()).toBe(240);
    worm.tick(250);
    expect(worm.getWorldBounds().getLeft()).toBe(240);
    expect(worm.getWorldBounds().getTop()).toBe(240);

    worm.setHeading('down');
    worm.tick(500);
    expect(worm.getWorldBounds().getLeft()).toBe(240);
    expect(worm.getWorldBounds().getTop()).toBe(250);

    worm.setHeading('right');
    worm.tick(500);
    expect(worm.getWorldBounds().getLeft()).toBe(250);
    expect(worm.getWorldBounds().getTop()).toBe(250);

    worm.setHeading('none');
    worm.tick(500);
    expect(worm.getWorldBounds().getLeft()).toBe(250);
    expect(worm.getWorldBounds().getTop()).toBe(250);
  });

  // Makes sure that the body parts move.
  it('makes sure that the body parts move.', function()
  {
    worm.translate(0, -10);
    expect(worm.wormParts[0].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[0].getWorldBounds().getTop()).toBe(240);
    expect(worm.wormParts[1].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[1].getWorldBounds().getTop()).toBe(250);
    expect(worm.wormParts[2].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[2].getWorldBounds().getTop()).toBe(260);
    expect(worm.wormParts[3].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[3].getWorldBounds().getTop()).toBe(270);

    // No movement, no update.
    worm.translate(0, 0);
    expect(worm.wormParts[0].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[0].getWorldBounds().getTop()).toBe(240);
    expect(worm.wormParts[1].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[1].getWorldBounds().getTop()).toBe(250);
    expect(worm.wormParts[2].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[2].getWorldBounds().getTop()).toBe(260);
    expect(worm.wormParts[3].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[3].getWorldBounds().getTop()).toBe(270);

    worm.translate(0, -10);
    expect(worm.wormParts[0].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[0].getWorldBounds().getTop()).toBe(230);
    expect(worm.wormParts[1].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[1].getWorldBounds().getTop()).toBe(240);
    expect(worm.wormParts[2].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[2].getWorldBounds().getTop()).toBe(250);
    expect(worm.wormParts[3].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[3].getWorldBounds().getTop()).toBe(260);

    worm.translate(-10, 0);
    worm.translate(-10, 0);
    expect(worm.wormParts[0].getWorldBounds().getLeft()).toBe(230);
    expect(worm.wormParts[0].getWorldBounds().getTop()).toBe(230);
    expect(worm.wormParts[1].getWorldBounds().getLeft()).toBe(240);
    expect(worm.wormParts[1].getWorldBounds().getTop()).toBe(230);
    expect(worm.wormParts[2].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[2].getWorldBounds().getTop()).toBe(230);
    expect(worm.wormParts[3].getWorldBounds().getLeft()).toBe(250);
    expect(worm.wormParts[3].getWorldBounds().getTop()).toBe(240);
  });
});


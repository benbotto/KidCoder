describe('WormRenderer test suite.', function()
{
  'use strict';

  var wormRenderer;
  var RectangleRenderer = function() {};

  beforeEach(module('bsyKidCoder'));
  beforeEach(module(function($provide)
  {
    RectangleRenderer.prototype.render = jasmine.createSpy('render');

    $provide.value('BLOCK_SIZE',        10);
    $provide.value('BOARD_WIDTH',       500);
    $provide.value('BOARD_HEIGHT',      500);
    $provide.value('RectangleRenderer', RectangleRenderer);
  }));
  beforeEach(inject(function(WormRenderer, Worm)
  {
    wormRenderer = new WormRenderer(new Worm());
  }));

  // Checks the defaults.
  it('checks the defaults.', function()
  {
    wormRenderer.render();

    // A new RectangleRenderer should be created for each body
    // part, and each body part should be rendered.
    expect(RectangleRenderer.prototype.render.calls.count()).toBe(4);
  });
});
  

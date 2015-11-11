describe('Renderer test suite.', function()
{
  'use strict';

  var Renderer;
  var wo = {name: 'world-object'};

  beforeEach(module('bsyGame'));
  beforeEach(inject(function(_Renderer_)
  {
    Renderer = _Renderer_;
  }));

  // Checks that the WorldObject can be retrieved.
  it('checks that the WorldObject can be retrieved.', function()
  {
    var rend = new Renderer(wo);
    expect(rend.getWorldObject()).toBe(wo);
  });

  // Checks that render must be implemented.
  it('checks that render must be implemented.', function()
  {
    expect(function()
    {
      var rend = new Renderer(wo);
      rend.render();
    }).toThrowError('Renderer::render not implemented.');
  });
});


describe('RectangleRenderer test suite.', function()
{
  'use strict';

  var RectangleRenderer, Rectangle;
  var ctx =
  {
    fillStyle: null,
    fillRect: function() {},
    strokeRect: function() {}
  };

  beforeEach(module('bsyGame'));
  beforeEach(inject(function(_RectangleRenderer_, _Rectangle_)
  {
    RectangleRenderer = _RectangleRenderer_;
    Rectangle = _Rectangle_;

    spyOn(ctx, 'fillRect').and.stub();
    spyOn(ctx, 'strokeRect').and.stub();
  }));

  // Renders a rectangle.
  it('renders a rectangle.', function()
  {
    var rect = new Rectangle({width: 10, height: 10, color: 'red'});
    var renderer = new RectangleRenderer(rect);

    rect.translate(20, 20);
    renderer.render(ctx);

    expect(ctx.fillStyle).toBe('red');
    expect(ctx.fillRect.calls.argsFor(0)).toEqual([20, 20, 10, 10]);
    expect(ctx.strokeRect.calls.argsFor(0)).toEqual([20, 20, 10, 10]);
  });
});


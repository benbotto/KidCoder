angular.module('bsyGame')

/**
 * A renderer for Rectangles.
 */
.factory('RectangleRenderer',
[
function()
{
  'use strict';

  /**
   * Initialize.
   * @param rect The Rectangle instance that this renderer renders.
   */
  function RectangleRenderer(rect)
  {
    this._rect = rect;
  }

  /**
   * Render the rectangle.
   * @param ctx A render context.
   */
  RectangleRenderer.prototype.render = function(ctx)
  {
    var wb = this._rect.getWorldBounds();

    ctx.fillStyle = this._rect.color;
    ctx.fillRect(wb.topLeft[0], wb.topLeft[1], this._rect.width, this._rect.height);
    ctx.strokeRect(wb.topLeft[0], wb.topLeft[1], this._rect.width, this._rect.height);
  };

  return RectangleRenderer;
}]);


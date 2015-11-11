angular.module('bsyGame')

/**
 * A renderer for Rectangles.
 */
.factory('RectangleRenderer',
['Renderer',
function(Renderer)
{
  'use strict';

  // RectangleRenderer extends Renderer.
  RectangleRenderer.prototype = Object.create(Renderer.prototype);
  RectangleRenderer.prototype.constructor = RectangleRenderer;

  /**
   * Initialize.
   * @param rect The Rectangle instance that this renderer renders.
   */
  function RectangleRenderer(rect)
  {
    Renderer.call(this, rect);
  }

  /**
   * Render the rectangle.
   * @param ctx A render context.
   */
  RectangleRenderer.prototype.render = function(ctx)
  {
    var wb = this.getWorldObject().getWorldBounds();

    ctx.fillStyle = this.getWorldObject().color;
    ctx.fillRect(wb.getLeft(), wb.getTop(), this.getWorldObject().width, this.getWorldObject().height);
    ctx.strokeRect(wb.getLeft(), wb.getTop(), this.getWorldObject().width, this.getWorldObject().height);
  };

  return RectangleRenderer;
}]);


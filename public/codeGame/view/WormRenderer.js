angular.module('bsyKidCoder')

/**
 * A renderer for a Worm instance.
 */
.factory('WormRenderer',
['Renderer', 'RectangleRenderer',
function(Renderer, RectangleRenderer)
{
  'use strict';

  // WormRenderer extends Renderer.
  WormRenderer.prototype = Object.create(Renderer.prototype);
  WormRenderer.prototype.constructor = WormRenderer;

  /**
   * Initialize.
   * @param worm The worm instance to render.
   */
  function WormRenderer(worm)
  {
    Renderer.call(this, worm);
  }

  /**
   * Render the worm.
   * @param ctx A render context.
   */
  WormRenderer.prototype.render = function(ctx)
  {
    this.getWorldObject().wormParts.forEach(function(rect)
    {
      new RectangleRenderer(rect).render(ctx);
    });
  };

  return WormRenderer;
}]);


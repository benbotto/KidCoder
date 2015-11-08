angular.module('bsyKidCoder')

/**
 * A renderer for a Worm instance.
 */
.factory('WormRenderer',
['RectangleRenderer',
function(RectangleRenderer)
{
  'use strict';

  /**
   * Initialize.
   * @param worm The worm instance to render.
   */
  function WormRenderer(worm)
  {
    this.worm = worm;
  }

  /**
   * Render the worm.
   * @param ctx A render context.
   */
  WormRenderer.prototype.render = function(ctx)
  {
    this.worm.wormParts.forEach(function(rect)
    {
      new RectangleRenderer(rect).render(ctx);
    });
  };

  return WormRenderer;
}]);


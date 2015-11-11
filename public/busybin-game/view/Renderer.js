angular.module('bsyGame')

/**
 * Base class for Renderers.
 */
.factory('Renderer',
[
function()
{
  'use strict';

  /**
   * Initialize.
   * @param wo The WorldObject instance to render.
   */
  function Renderer(wo)
  {
    this._worldObject = wo;
  }

  /**
   * Get the WorldObject instance.
   */
  Renderer.prototype.getWorldObject = function()
  {
    return this._worldObject;
  };

  /**
   * Render the WorldObject.
   * @param ctx A render context.
   */
  Renderer.prototype.render = function(/*ctx*/)
  {
    throw new Error('Renderer::render not implemented.');
  };

  return Renderer;
}]);


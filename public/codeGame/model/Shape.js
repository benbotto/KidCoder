angular.module('bsyKidCoder')

/**
 * A Shape base class.
 */
.factory('Shape',
[
function()
{
  'use strict';

  /**
   * Initialize the Shape.
   * @param x The x position.
   * @param y The y position.
   * @param color The color.
   */
  function Shape(x, y, color)
  {
    this.x     = x     || 0;
    this.y     = y     || 0;
    this.color = color || 'red';
  }

  return Shape;
}]);


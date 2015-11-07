angular.module('bsyGame')

/**
 * A Rectangle class for drawing a rectangle on a canvas.
 */
.factory('Rectangle',
['Shape',
function(Shape)
{
  'use strict';

  // Rectangle extends Shape.
  Rectangle.prototype = Object.create(Shape.prototype);
  Rectangle.prototype.constructor = Rectangle;

  /**
   * Initialize the rectangle.
   * @param x The x position.
   * @param y The y position.
   * @param width The width.
   * @param height The height.
   * @param color The color.
   */
  function Rectangle(x, y, width, height, color)
  {
    Shape.call(this, x, y, color);

    this.width  = width  || 10;
    this.height = height || 10;
  }

  return Rectangle;
}]);


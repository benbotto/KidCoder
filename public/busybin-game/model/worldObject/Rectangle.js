angular.module('bsyGame')

/**
 * A Rectangle class for drawing a rectangle on a canvas.
 */
.factory('Rectangle',
['WorldObject', 'vec2',
function(WorldObject, vec2)
{
  'use strict';

  // Rectangle extends WorldObject.
  Rectangle.prototype = Object.create(WorldObject.prototype);
  Rectangle.prototype.constructor = Rectangle;

  var defaults =
  {
    name: 'Rectangle'
  };

  /**
   * Initialize the rectangle.
   * @param settings An object with the following keys.
   * {
   *   name:   {String} // Optional string describing the object.  Defaults to 'Rectangle'.
   *   color:  {String} // Optional color for the object. Defaults to red.
   *   width:  {Number} // Required width of the rectangle.
   *   height: {Number} // Required height of the rectangle.
   *   x:      {Number} // Optional world location x coordinate. Defaults to 0.
   *   y:      {Number} // Optional world location y coordinate. Defaults to 0.
   * }
   */
  function Rectangle(settings)
  {
    settings = angular.extend({}, defaults, settings);

    if (settings.width === undefined)
      throw new Error('width is required.');
    if (settings.height === undefined)
      throw new Error('height is required.');

    this.width        = settings.width;
    this.height       = settings.height;
    this._worldBounds = {};

    // WorldObject will call translate, which in turn will update the world bounds.
    WorldObject.call(this, settings);
  }

  /**
   * Update the world bounds using the current transform.
   */
  Rectangle.prototype._updateWorldBounds = function()
  {
    var topLeft  = vec2.create();
    var botRight = vec2.fromValues(this.width, this.height);

    vec2.transformMat3(topLeft, topLeft, this.transform);
    vec2.add(botRight, botRight, topLeft);

    this._worldBounds.topLeft     = topLeft;
    this._worldBounds.bottomRight = botRight;
  };

  /**
   * When the object moves update the world bounds.
   * @param x The x amount to translate.
   * @param y The y amount to translate.
   */
  Rectangle.prototype.translate = function(x, y)
  {
    WorldObject.prototype.translate.call(this, x, y);
    this._updateWorldBounds();
  };

  /**
   * Get the world bounds.
   */
  Rectangle.prototype.getWorldBounds = function()
  {
    return this._worldBounds;
  };

  /**
   * Check if this rectangle contains another world object.
   * @param wb The world bounds of another object.
   */
  Rectangle.prototype.contains = function(wb)
  {
    // This rectangle is completely on the right.
    if (this._worldBounds.topLeft[0] > wb.bottomRight[0])
      return false;

    // This rectangle is completely on the left.
    if (this._worldBounds.bottomRight[0] < wb.topLeft[0])
      return false;

    // This rectangle is above.
    if (this._worldBounds.bottomRight[1] < wb.topLeft[1])
      return false;

    // This rectangle is below.
    if (this._worldBounds.topLeft[1] > wb.bottomRight[1])
      return false;

    return true;
  };

  /**
   * Helper function to get the rectangles location (top-left point).
   */
  Rectangle.prototype.getLocation = function()
  {
    return this._worldBounds.topLeft;
  };

  return Rectangle;
}]);


angular.module('bsyGame')

/**
 * A Rectangle class for drawing a rectangle on a canvas.
 */
.factory('Rectangle',
['WorldObject', 'vec2', 'mat3',
function(WorldObject, vec2, mat3)
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
   * Update the world bounds using transform.
   */
  Rectangle.prototype._updateWorldBounds = function()
  {
    var topLeft  = vec2.create();
    var botRight = vec2.fromValues(this.width, this.height);

    vec2.transformMat3(topLeft, topLeft, this.getTransform());
    vec2.add(botRight, botRight, topLeft);

    this._worldBounds.topLeft     = topLeft;
    this._worldBounds.bottomRight = botRight;
  };

  /**
   * Overridden setTransform function that stores the transform then updates
   * the world bounds.  The transform is copied, not stored by reference.
   * @param transform The transform to _copy_ to this object.
   */
  Rectangle.prototype.setTransform = function(transform)
  {
    var thisTrans = this.getTransform();
    mat3.copy(thisTrans, transform);
    this._updateWorldBounds();
    return this;
  };

  /**
   * Get the world bounds.  A Rectangle it its own WorldBounds.
   */
  Rectangle.prototype.getWorldBounds = function()
  {
    return this;
  };

  /**
   * Get the top-most edge location (the y value).
   */
  Rectangle.prototype.getTop = function()
  {
    return this._worldBounds.topLeft[1];
  };

  /**
   * Get the bottom-most edge location (the y value).
   */
  Rectangle.prototype.getBottom = function()
  {
    return this._worldBounds.bottomRight[1];
  };

  /**
   * Get the left-most edge location (the x value).
   */
  Rectangle.prototype.getLeft = function()
  {
    return this._worldBounds.topLeft[0];
  };

  /**
   * Get the right-most edge location (the x value).
   */
  Rectangle.prototype.getRight = function()
  {
    return this._worldBounds.bottomRight[0];
  };

  /**
   * Check if this rectangle overlaps another world object.
   * @param rect The bounding Rectangle of another object.
   */
  Rectangle.prototype.overlaps = function(rect)
  {
    // This rectangle is completely on the right.
    if (this.getLeft() >= rect.getRight())
      return false;

    // This rectangle is completely on the left.
    if (this.getRight() <= rect.getLeft())
      return false;

    // This rectangle is above.
    if (this.getBottom() <= rect.getTop())
      return false;

    // This rectangle is below.
    if (this.getTop() >= rect.getBottom())
      return false;

    return true;
  };

  return Rectangle;
}]);


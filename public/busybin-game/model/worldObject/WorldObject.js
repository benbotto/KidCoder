angular.module('bsyGame')

/**
 * Base class for all the objects in the game.
 */
.factory('WorldObject',
['mat3', 'vec2',
function(mat3, vec2)
{
  'use strict';

  var defaults =
  {
    color: 'red',
    x:     0,
    y:     0
  };

  /**
   * Initialize the object.
   * @param settings An object with the following keys.
   * {
   *   name:  {String} // Required string describing the object.
   *   color: {String} // Optional color for the object. Defaults to red.
   *   x:     {Number} // Optional world location x coordinate. Defaults to 0.
   *   y:     {Number} // Optional world location y coordinate. Defaults to 0.
   * }
   */
  function WorldObject(settings)
  {
    if (settings.name === undefined)
      throw new Error('Name is required.');

    settings = angular.extend({}, defaults, settings);

    this.name       = settings.name;
    this.color      = settings.color;
    this._transform = mat3.create();

    this.translate(settings.x, settings.y);
  }

  /**
   * Default do-nothing update.  This should generally be overridden in
   * subclasses.
   * @param elapsed The elapsed time since the last update, in ms.
   */
  WorldObject.prototype.tick = function(/*elapsed*/)
  {
    return this;
  };

  /**
   * Get the current transform matrix by reference.  It is not safe to modify
   * it directly.  If you want to manually update the transform, make a copy,
   * modify the copy, and then use the setTransform() method.
   */
  WorldObject.prototype.getTransform = function()
  {
    return this._transform;
  };

  /**
   * Set a new transformation matrix.
   * @param transform The new transformation matrix.
   */
  WorldObject.prototype.setTransform = function(transform)
  {
    mat3.copy(this._transform, transform);
    this.getWorldBounds().setTransform(this._transform);
    return this;
  };

  /**
   * Move the world object.
   * @param x The x amount to translate.
   * @param y The y amount to translate.
   */
  WorldObject.prototype.translate = function(x, y)
  {
    mat3.translate(this._transform, this._transform, vec2.fromValues(x, y));
    this.getWorldBounds().setTransform(this._transform);
    return this;
  };

  /**
   * All concrete WorldObjects with must implement this method.  The method
   * should return a Rectangle with a overlaps(Rectangle) method.
   */
  WorldObject.prototype.getWorldBounds = function()
  {
    throw new Error('WorldObject::getWorldBounds not implemented.');
  };

  /**
   * Check if this WorldObject collides with another WorldObject (wo).  The
   * other object may be this WorldObject.  That is, depending on the game
   * a WorldObject may be able to collide with itself.
   * The default implementation checks if this overlaps the world bounds of
   * the wo.
   * The default implementation returns false if wo === this.
   * @param wo The other WorldObject, which may be this.
   */
  WorldObject.prototype.collidesWith = function(wo)
  {
    if (this === wo)
      return false;
    return this.getWorldBounds().overlaps(wo.getWorldBounds());
  };

  return WorldObject;
}]);


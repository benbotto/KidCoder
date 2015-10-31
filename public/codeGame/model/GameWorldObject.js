angular.module('bsyKidCoder')

/**
 * 
 */
.factory('GameWorldObject',
[
function()
{
  'use strict';

  /**
   * Initialize the object.
   * @param name The name of the object.
   * @param color The color of the object (defaults to red).
   * @param width The width of the object (defaults to 10).
   * @param height The height of the object (defaults to 10).
   */
  function GameWorldObject(name, color, width, height)
  {
    this.name      = name;
    this.color     = color  || 'red';
    this.width     = width  || 10;
    this.height    = height || 10;
    this._location = {x: 0, y:0};

    if (name === undefined)
      throw new Error('Name is required.');
  }

  /**
   * Get the location of the object.
   */
  GameWorldObject.prototype.getLocation = function()
  {
    return this._location;
  };

  /**
   * Set the location of the object.
   * @param x The x location of the object.
   * @param y The y location of the object.
   */
  GameWorldObject.prototype.setLocation = function(x, y)
  {
    this._location.x = x;
    this._location.y = y;
    return this;
  };

  /**
   * Move the object.
   * @param x The amount to move in the x direction.
   * @param y The amount to move in the y direction.
   */
  GameWorldObject.prototype.move = function(x, y)
  {
    this._location.x += x;
    this._location.y += y;
    return this;
  };

  /**
   * Default do-nothing update.  This should generally be overridden in
   * subclasses.
   * @param elapsed The elapsed time since the last update, in ms.
   */
  GameWorldObject.prototype.tick = function(/*elapsed*/)
  {
    return this;
  };

  return GameWorldObject;
}]);


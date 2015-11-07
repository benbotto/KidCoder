angular.module('bsyGame')

/**
 * Base class for all the objects in the game.
 */
.factory('WorldObject',
[
function()
{
  'use strict';

  /**
   * Initialize the object.
   * @param name The name of the object.
   * @param color The color of the object (defaults to red).
   */
  function WorldObject(name, color)
  {
    if (name === undefined)
      throw new Error('Name is required.');

    this.name      = name;
    this._location = {x: 0, y: 0};
    this._shapes   = [];
  }

  /**
   * Get the location of the object.
   */
  WorldObject.prototype.getLocation = function()
  {
    return this._location;
  };

  /**
   * Set the location of the object.
   * @param x The x location of the object.
   * @param y The y location of the object.
   */
  WorldObject.prototype.setLocation = function(x, y)
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
  WorldObject.prototype.move = function(x, y)
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
  WorldObject.prototype.tick = function(/*elapsed*/)
  {
    return this;
  };

  /**
   * Add a Shape to the object.
   * @param shape The Shape instance to add.
   */
  WorldObject.prototype.addShape = function(shape)
  {
    this._shapes.push(shape);
    return this;
  };

  /**
   * Get the array of shapes.
   */
  WorldObject.prototype.getShapes = function()
  {
    return this._shapes;
  };

  return WorldObject;
}]);


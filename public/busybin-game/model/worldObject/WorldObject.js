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

    this.name      = settings.name;
    this.color     = settings.color;
    this.transform = mat3.create();

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
   * Move the world object.
   * @param x The x amount to translate.
   * @param y The y amount to translate.
   */
  WorldObject.prototype.translate = function(x, y)
  {
    mat3.translate(this.transform, this.transform, vec2.fromValues(x, y));
  };

  /**
   * All concrete WorldObjects must provide world bounds.
   */
  WorldObject.prototype.getWorldBounds = function()
  {
    throw new Error('WorldObject::getWorldBounds not implemented.');
  };

  return WorldObject;
}]);


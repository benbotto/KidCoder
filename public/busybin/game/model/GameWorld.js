angular.module('bsyGame')

/**
 * Class that represents the game world.
 */
.factory('GameWorld',
[
function()
{
  'use strict';

  /**
   * GameWorld.
   * @param width The width of the world.
   * @param height The height of the world.
   */
  function GameWorld(width, height)
  {
    this.width         = width  || 500;
    this.height        = height || 500;
    this._worldObjects = [];
    this._gwoLookup    = {};
  }

  /**
   * Add an object to the world.
   * @param gwo The WorldObject to add.
   */
  GameWorld.prototype.addWorldObject = function(gwo)
  {
    if (this._gwoLookup[gwo.name] !== undefined)
      throw new Error('"' + gwo.name + '"' + ' is not a unique name.');

    this._worldObjects.push(gwo);
    this._gwoLookup[gwo.name] = gwo;

    return this;
  };

  /**
   * Remove an object to the world.
   * @param name The name of the object.
   */
  GameWorld.prototype.removeWorldObject = function(name)
  {
    var gwo = this.getWorldObject(name);
    var ind = this._worldObjects.indexOf(gwo);

    this._worldObjects.splice(ind, 1);
    delete this._gwoLookup[gwo.name];

    return this;
  };

  /**
   * Get a WorldObject instance by name.
   * @param name The name of the object.
   */
  GameWorld.prototype.getWorldObject = function(name)
  {
    var gwo = this._gwoLookup[name];

    if (gwo === undefined)
      throw new Error('"' + name + '"' + ' is not a valid name.');

    return gwo;
  };

  /**
   * Get the array of WorldObject instances.
   */
  GameWorld.prototype.getWorldObjects = function()
  {
    return this._worldObjects;
  };

  /**
   * Update each WorldObject.
   * @param elapsed The elapsed time since the last update, in ms.
   */
  GameWorld.prototype.tick = function(elapsed)
  {
    for (var i = 0; i < this._worldObjects.length; ++i)
      this._worldObjects[i].tick(elapsed);

    return this;
  };

  return GameWorld;
}]);


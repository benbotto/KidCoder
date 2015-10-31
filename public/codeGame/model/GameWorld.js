angular.module('bsyKidCoder')

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
   */
  function GameWorld()
  {
    this.width             = 500;
    this.height            = 500;
    this._gameWorldObjects = [];
    this._gwoLookup        = {};
  }

  /**
   * Add an object to the world.
   * @param gwo The GameWorldObject to add.
   */
  GameWorld.prototype.addGameWorldObject = function(gwo)
  {
    if (this._gwoLookup[gwo.name] !== undefined)
      throw new Error('"' + gwo.name + '"' + ' is not a unique name.');

    this._gameWorldObjects.push(gwo);
    this._gwoLookup[gwo.name] = gwo;

    return this;
  };

  /**
   * Remove an object to the world.
   * @param name The name of the object.
   */
  GameWorld.prototype.removeGameWorldObject = function(name)
  {
    var gwo = this.getGameWorldObject(name);
    var ind = this._gameWorldObjects.indexOf(gwo);

    this._gameWorldObjects.splice(ind, 1);
    delete this._gwoLookup[gwo.name];

    return this;
  };

  /**
   * Get a GameWorldObject instance by name.
   * @param name The name of the object.
   */
  GameWorld.prototype.getGameWorldObject = function(name)
  {
    var gwo = this._gwoLookup[name];

    if (gwo === undefined)
      throw new Error('"' + name + '"' + ' is not a valid name.');

    return gwo;
  };

  /**
   * Get the array of GameWorldObject instances.
   */
  GameWorld.prototype.getGameWorldObjects = function()
  {
    return this._gameWorldObjects;
  };

  /**
   * Update each GameWorldObject.
   * @param elapsed The elapsed time since the last update, in ms.
   */
  GameWorld.prototype.tick = function(elapsed)
  {
    for (var i = 0; i < this._gameWorldObjects.length; ++i)
      this._gameWorldObjects[i].tick(elapsed);

    return this;
  };

  return GameWorld;
}]);


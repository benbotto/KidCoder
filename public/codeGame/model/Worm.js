angular.module('bsyKidCoder')

/**
 * The worm object.
 */
.factory('Worm',
['GameWorldObject',
function(GameWorldObject)
{
  'use strict';

  Worm.HEADING =
  {
    UP:    'up',
    LEFT:  'left',
    DOWN:  'down',
    RIGHT: 'right',
    NONE:  'none'
  };

  // Worm extends GameWorldObject.
  Worm.prototype = Object.create(GameWorldObject.prototype);
  Worm.prototype.constructor = Worm;

  /**
   * Initialize the worm.
   */
  function Worm()
  {
    GameWorldObject.call(this, 'worm');
    this.setLocation(250, 250);

    this.speed    = 20; // In units per second.
    this._heading = Worm.HEADING.UP;
  }

  /**
   * Get the worm's heading.
   */
  Worm.prototype.getHeading = function()
  {
    return this._heading;
  };

  /**
   * Set the worm's heading.
   * @param heading a Worm.HEADING.
   */
  Worm.prototype.setHeading = function(heading)
  {
    // Make sure the heading is valid, and set it if so.
    var found = false;
    for (var h in Worm.HEADING)
    {
      if (heading === Worm.HEADING[h])
      {
        found = true;
        this._heading = heading;
        break;
      }
    }

    if (!found)
      throw new Error('Invalid heading.');

    return this;
  };

  /**
   * On tick, move the worm.
   * @param elapsed The elapsed time, in ms, since the last tick.
   */
  Worm.prototype.tick = function(elapsed)
  {
    // The speed is in units per second.  Calculate the delta based on
    // the elapsed time.
    var moveDelta = 20 / 1000 * elapsed;
    var loc       = this.getLocation();

    // Move in the correct direction.
    switch (this._heading)
    {
      case Worm.HEADING.UP:
        this.setLocation(loc.x, loc.y - moveDelta);
        break;
      case Worm.HEADING.LEFT:
        this.setLocation(loc.x - moveDelta, loc.y);
        break;
      case Worm.HEADING.DOWN:
        this.setLocation(loc.x, loc.y + moveDelta);
        break;
      case Worm.HEADING.RIGHT:
        this.setLocation(loc.x + moveDelta, loc.y);
        break;
      case Worm.HEADING.NONE:
        break;
    }

    return this;
  };

  return Worm;
}]);


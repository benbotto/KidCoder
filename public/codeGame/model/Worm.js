angular.module('bsyKidCoder')

/**
 * The worm object.
 */
.factory('Worm',
['GameWorldObject', 'Rectangle',
function(GameWorldObject, Rectangle)
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

    this.speed     = 20; // In units per second.
    this._heading  = Worm.HEADING.UP;
    this._moveTime = 0;

    // The worm is composed of a series of rectangles.
    this.addShape(new Rectangle(250, 250, 10, 10, 'green'));
    this.addShape(new Rectangle(250, 260, 10, 10, 'red'));
    this.addShape(new Rectangle(250, 270, 10, 10, 'red'));
    this.addShape(new Rectangle(250, 280, 10, 10, 'red'));
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
    // Only move 1 per half second.
    this._moveTime += elapsed;
    if (this._moveTime < 500) return;
    this._moveTime = 0;

    // The speed is in units per second.  Calculate the delta based on
    // the elapsed time.
    var moveDelta = this.speed / 1000 * 500;
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

  /**
   * Override of setLocation that sets each rectangle's location.
   * @param x The x location of the object.
   * @param y The y location of the object.
   */
  Worm.prototype.setLocation = function(x, y)
  {
    GameWorldObject.prototype.setLocation.call(this, x, y);

    var shapes = this.getShapes();

    // No shapes (initializing).
    if (shapes.length === 0)
      return;

    // No movement.
    if (shapes[0].x === x && shapes[0].y === y)
      return;

    // Move all the body parts.  Each one moves to the position of
    // its forward-attached rectangle.
    for (var i = shapes.length - 1; i > 0; --i)
    {
      shapes[i].x = shapes[i - 1].x;
      shapes[i].y = shapes[i - 1].y;
    }

    // Move the head.
    shapes[0].x = x;
    shapes[0].y = y;

    return this;
  };

  return Worm;
}]);


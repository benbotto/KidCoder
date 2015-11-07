angular.module('bsyKidCoder')

/**
 * The worm object.
 */
.factory('Worm',
['TICK_TIME', 'BLOCK_SIZE', 'BOARD_WIDTH', 'BOARD_HEIGHT', 'WorldObject', 'Rectangle',
function(TICK_TIME, BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, WorldObject, Rectangle)
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

  // Worm extends WorldObject.
  Worm.prototype = Object.create(WorldObject.prototype);
  Worm.prototype.constructor = Worm;

  /**
   * Initialize the worm.
   */
  function Worm()
  {
    WorldObject.call(this, 'worm');

    // Start somewhere around the middle.
    var x = BLOCK_SIZE;
    var y = BLOCK_SIZE;
    while (x < BOARD_WIDTH  / 2) x += BLOCK_SIZE;
    while (y < BOARD_HEIGHT / 2) y += BLOCK_SIZE;

    this.setLocation(x, y);

    // Move 1 block size per tick.
    this.speed     = BLOCK_SIZE / (TICK_TIME / 1000);
    this._heading  = Worm.HEADING.UP;
    this._moveTime = 0;

    // The worm is composed of a series of rectangles.
    this.addShape(new Rectangle(x, y + BLOCK_SIZE * 0, BLOCK_SIZE, BLOCK_SIZE, 'green'));
    this.addShape(new Rectangle(x, y + BLOCK_SIZE * 1, BLOCK_SIZE, BLOCK_SIZE, 'red'));
    this.addShape(new Rectangle(x, y + BLOCK_SIZE * 2, BLOCK_SIZE, BLOCK_SIZE, 'red'));
    this.addShape(new Rectangle(x, y + BLOCK_SIZE * 3, BLOCK_SIZE, BLOCK_SIZE, 'red'));
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
    if (this._moveTime < TICK_TIME) return;
    this._moveTime = 0;

    // The speed is in units per second.  Calculate the delta based on
    // the elapsed time.
    var moveDelta = this.speed / 1000 * TICK_TIME;
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
    WorldObject.prototype.setLocation.call(this, x, y);

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


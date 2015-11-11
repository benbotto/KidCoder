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
    // Start somewhere around the middle.
    var x = BLOCK_SIZE;
    var y = BLOCK_SIZE;
    while (x < BOARD_WIDTH  / 2) x += BLOCK_SIZE;
    while (y < BOARD_HEIGHT / 2) y += BLOCK_SIZE;

    // Move 1 block size per tick.
    this.speed     = BLOCK_SIZE / (TICK_TIME / 1000);
    this._heading  = Worm.HEADING.UP;
    this._moveTime = 0;

    // The worm is composed of a series of rectangles.
    this.wormParts =
    [
      new Rectangle({name: 'wp0', x: x, y: y + BLOCK_SIZE * 0, width: BLOCK_SIZE, height: BLOCK_SIZE, color: 'green'}),
      new Rectangle({name: 'wp1', x: x, y: y + BLOCK_SIZE * 1, width: BLOCK_SIZE, height: BLOCK_SIZE, color: 'red'}),
      new Rectangle({name: 'wp2', x: x, y: y + BLOCK_SIZE * 2, width: BLOCK_SIZE, height: BLOCK_SIZE, color: 'red'}),
      new Rectangle({name: 'wp3', x: x, y: y + BLOCK_SIZE * 3, width: BLOCK_SIZE, height: BLOCK_SIZE, color: 'red'})
    ];

    WorldObject.call(this, {name: 'worm'});
  }

  /**
   * Overrides the getWorldBounds method.  The world bounds are determined by
   * the head only.
   */
  Worm.prototype.getWorldBounds = function()
  {
    return this.wormParts[0].getWorldBounds();
  };

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

    // Move in the correct direction.
    switch (this._heading)
    {
      case Worm.HEADING.UP:
        this.translate(0, -moveDelta);
        break;
      case Worm.HEADING.LEFT:
        this.translate(-moveDelta, 0);
        break;
      case Worm.HEADING.DOWN:
        this.translate(0, moveDelta);
        break;
      case Worm.HEADING.RIGHT:
        this.translate(moveDelta, 0);
        break;
      case Worm.HEADING.NONE:
        break;
    }

    return this;
  };

  /**
   * Override of translate that sets each rectangle's location.
   * @param x The x location of the object.
   * @param y The y location of the object.
   */
  Worm.prototype.translate = function(x, y)
  {
    // No movement (initializing).
    if (x === 0 && y === 0)
      return this;

    // Move all the body parts.  Each one moves to the position of
    // its forward-attached rectangle.
    for (var i = this.wormParts.length - 1; i > 0; --i)
      this.wormParts[i].setTransform(this.wormParts[i - 1].getTransform());

    // Move the head.
    this.wormParts[0].translate(x, y);

    return this;
  };

  /**
   * Grow the worm (add a rectangle).
   */
  Worm.prototype.grow = function()
  {
    var name = 'wp' + this.wormParts.length;
    var part = new Rectangle({name: name, width: BLOCK_SIZE, height: BLOCK_SIZE, color: 'red'});

    // Add the new worm part on top of the end part.  On the next translate
    // call the part will snake along with the rest.
    part.setTransform(this.wormParts[this.wormParts.length - 1].getTransform());
    this.wormParts.push(part);
    return this;
  };

  /**
   * Check if the Worm collides with itself.  If not, use the default check.
   * @param wo The other WorldObject, which may be this.
   */
  Worm.prototype.collidesWith = function(wo)
  {
    if (this === wo)
    {
      var head = this.wormParts[0];

      for (var i = 1; i < this.wormParts.length; ++i)
      {
        // Head hits some part of the tail.
        if (head.overlaps(this.wormParts[i]))
          return true;
      }
    }

    return WorldObject.prototype.collidesWith.call(this, wo);
  };

  return Worm;
}]);


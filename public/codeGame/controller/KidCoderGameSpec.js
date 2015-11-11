describe('KidCoderGameSpec', function()
{
  'use strict';

  var game, $window, Rectangle;

  beforeEach(module('bsyKidCoder'));
  beforeEach(module(function($provide)
  {
    $provide.value('BOARD_WIDTH',  500);
    $provide.value('BOARD_HEIGHT', 500);
  }));
  beforeEach(inject(function(KidCoderGame, _$window_, _Rectangle_)
  {
    game      = new KidCoderGame();
    $window   = _$window_;
    Rectangle = _Rectangle_;
  }));

  // Checks that the game objects are present.
  it('checks that the game objects are present.', function()
  {
    var gw = game.gameWorld;
    expect(gw.getWorldObject('worm')).toBeDefined();
    expect(gw.getWorldObject('left_wall')).toBeDefined();
    expect(gw.getWorldObject('right_wall')).toBeDefined();
    expect(gw.getWorldObject('top_wall')).toBeDefined();
    expect(gw.getWorldObject('bottom_wall')).toBeDefined();
  });

  // Adds random food to the world.
  it('adds random food to the world.', function()
  {
    var random = spyOn($window.Math, 'random');

    // Not started.
    game.tick(500);
    expect($window.Math.random.calls.count()).toBe(0);

    game.start();
    random.and.returnValue(0.89); // Not high enough.
    game.tick(500);
    expect($window.Math.random.calls.count()).toBe(1);

    random.and.returnValue(.9); // Add fruit.
    game.tick(500);
    expect(game.gameWorld.getWorldObject('fruit0')).toBeDefined();
  });

  describe('KidCoderGame collision test suite.', function()
  {
    var Rectangle, RectangleRenderer;

    beforeEach(inject(function(_Rectangle_, _RectangleRenderer_)
    {
      Rectangle = _Rectangle_;
      RectangleRenderer = _RectangleRenderer_;
    }));

    // Checks the worm-vs-worm collision.
    it('checks the worm-vs-worm collision.', function()
    {
      var worm = game.gameWorld.getWorldObject('worm');
      game.start();

      worm.grow();
      worm.setHeading('up');
      game.tick(500);

      worm.setHeading('right');
      game.tick(1000);

      worm.setHeading('down');
      game.tick(1500);

      worm.setHeading('left');
      game.tick(2000);

      // Worm is now hitting its tail itself.
      expect(game.getState()).toBe('game over');
    });

    // Checks the worm-on-wall collision.
    it('checks the worm-on-wall collision.', function()
    {
      game.start();

      // The worms starts in the middle.  25 ticks moves it to the top wall.
      for (var i = 0; i < 25; ++i)
        game.tick(500 * (i + 1));

      expect(game.getState()).toBe('game over');
    });

    // Checks the worm-on-food collision.
    it('checks the worm-on-food collision.', function()
    {
      var fruit     = new Rectangle({name: 'fruit0', width: 10, height: 10, x: 250, y: 230});
      var renderer  = new RectangleRenderer(fruit);
      var worm      = game.gameWorld.getWorldObject('worm');
      var wormParts = worm.wormParts.length;
      var random    = spyOn($window.Math, 'random');

      game.gameWorld.addWorldObject(fruit);
      expect(game.gameWorld.getWorldObject('fruit0')).toBe(fruit);
      game.addRenderer(renderer);
      expect(game.getRenderers()[game.getRenderers().length - 1]).toBe(renderer);

      // This makes sure that no fruit randomly gets added to the world.
      random.and.returnValue(0);

      game.start();
      game.tick();
      game.tick();

      expect(worm.wormParts.length).toBe(wormParts + 1);

      // Food should be gone from the world.
      expect(function()
      {
        game.gameWorld.getWorldObject('fruit0');
      }).toThrowError('"fruit0" is not a valid name.');

      // Food's renderer should be removed.
      expect(game.getRenderers()[game.getRenderers().length - 1]).not.toBe(renderer);
    });
  });
});


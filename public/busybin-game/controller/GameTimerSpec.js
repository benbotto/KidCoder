describe('GameTimer test suite.', function()
{
  'use strict';

  var game, gameTimer, intervalCallback, timeDelta, $window;
  
  var $interval = function(cb, time)
  {
    intervalCallback = cb;
    timeDelta        = time;
  };

  beforeEach(module('bsyGame'));
  beforeEach(module(function($provide)
  {
    $provide.value('$interval', $interval);
  }));
  beforeEach(inject(function(GameTimer, _$window_)
  {
    game =
    {
      tick: jasmine.createSpy('tick')
    };
    gameTimer = new GameTimer(50, game);

    $window = _$window_;
  }));

  // Checks that the interval is wired up
  it('checks that the interval is wired up', function()
  {
    expect(intervalCallback).toBeDefined();
    expect(timeDelta).toBe(50);
  });

  // Makes sure that the game's tick() function gets called on each interval.
  it('makes sure that the game\'s tick() function gets called on each interval.', function()
  {
    expect(game.tick.calls.count()).toBe(0);
    intervalCallback();
    expect(game.tick.calls.count()).toBe(1);
  });

  // Makes sure that game gets called with the total elapsed time.
  it('makes sure that game gets called with the total elapsed time.', function(done)
  {
    $window.setTimeout(function()
    {
      intervalCallback();
      expect(game.tick.calls.argsFor(0)).toBeGreaterThan(49);
      done();
    }, 50);
  });
});


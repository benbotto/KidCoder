angular.module('bsyKidCoder')

/**
 * This directive lays out the board canvas.
 */
.directive('bsyKkGame',
['$window', 'Rectangle',
function($window, Rectangle)
{
  'use strict';

  var ddo =
  {
    restrict: 'E',
    scope:
    {
      game: '='
    },
    link: function(scope, ele, attrs)
    {
      // Create the canvas and add it to the screen.
      var canvas = document.createElement('canvas');
      canvas.width  = scope.game.gameWorld.width;
      canvas.height = scope.game.gameWorld.height;
      ele.append(canvas);

      // This is the canvas context, used for drawing.
      var ctx = canvas.getContext('2d');

      function render()
      {
        // Reset the canvas's transform to identity.  This must happen
        // before clearing the canvas, otherwise the clear will be transformed
        // as well.
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Clear the canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        scope.game.gameWorld.getGameWorldObjects().forEach(function(gwo)
        {
          gwo.getShapes().forEach(function(shape)
          {
            if (shape instanceof Rectangle)
            {
              ctx.fillStyle = shape.color;
              ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
              ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
            else
            {
              throw new Error('Invalid shape.');
            }
          });
        });
      }

      // Every time the game ticks (elapsed time changes) render the world.
      scope.$watch(scope.game.getElapsed.bind(scope.game), render);
    }
  };

  return ddo;
}]);


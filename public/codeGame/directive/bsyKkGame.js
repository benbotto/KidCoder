angular.module('bsyKidCoder')

/**
 * This directive lays out the board canvas.
 */
.directive('bsyKkGame', ['$window', function($window)
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

      function render(time)
      {
        // Reset the canvas's transform to identity.  This must happen
        // before clearing the canvas, otherwise the clear will be transformed
        // as well.
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Clear the canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // The movement amount is based on time.
        /*var speed = scope.game.speed / 1000;
        var xDist = time * speed;
        var yDist = time * speed;

        ctx.translate(xDist, yDist);
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 10, 10);*/

        //console.log(Math.floor(time / 1000), Math.floor(xDist), Math.floor(yDist));
      }

      scope.$watch(scope.game.getElapsed.bind(scope.game), function(elapsed)
      {
        console.log('render here..', elapsed);
      });
    }
  };

  return ddo;
}]);


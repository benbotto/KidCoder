angular.module('bsyGame')

/**
 * This directive renders the game on a canvas.
 */
.directive('bsyGameRenderer',
['$window',
function($window)
{
  'use strict';

  var ddo =
  {
    restrict: 'E',
    scope:
    {
      renderers:  '=',
      width:      '=',
      height:     '='
    },
    link: function(scope, ele)
    {
      // Create the canvas and add it to the screen.
      var canvas = $window.document.createElement('canvas');
      var ctx    = canvas.getContext('2d');

      canvas.width  = scope.width;
      canvas.height = scope.height;

      ele.append(canvas);

      function render()
      {
        // Reset the canvas's transform to identity.  This must happen
        // before clearing the canvas, otherwise the clear will be transformed
        // as well.
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Clear the canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        scope.renderers.forEach(function(renderer)
        {
          renderer.render(ctx);
        });

        $window.requestAnimationFrame(render);
      }

      // Redraw using the computer's refresh rate.
      $window.requestAnimationFrame(render);
    }
  };

  return ddo;
}]);


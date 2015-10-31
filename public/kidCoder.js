angular.module('bsyKidCoder', ['ngRoute'])

/**
 * Configure the routing.
 */
.config(['$routeProvider', function($routeProvider)
{
  'use strict';

  $routeProvider
    .when('/',
    {
      templateUrl: 'codeGame/code-game.html',
      controller: 'CodeGameCtrl'
    })
    .otherwise
    ({
      redirectTo: '/'
    });
}]);


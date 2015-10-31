/**
 * This function gathers all scripts used in the project and puts them in an object.
 */
module.exports = function(verbose)
{
  'use strict';

  var glob    = require('glob');
  var opts    = {cwd: __dirname + '/../'};
  var scripts = {};

  // Library files.
  scripts.lib =
  [
    'public/bower_components/angular/angular.min.js',
    'public/bower_components/angular-route/angular-route.min.js',
    'public/bower_components/angular-mocks/angular-mocks.js'
  ];
  
  // All the scripts that make up the app.  Note that the module declarations
  // must come first.
  scripts.app = ['public/kidCoder.js']
    .concat(glob.sync('public/**/*.js', opts)
    .filter(function(script)
    {
      return !script.match(/bower_components/) &&
             !script.match(/public\/KidCoder.js/) &&
             !script.match(/Spec.js$/);
    }));

  // Grunt tasks.
  scripts.grunt = glob.sync('grunt/**/*.js');

  // Specs.
  scripts.spec = {unit: []};
  scripts.spec.unit = glob.sync('public/**/*Spec.js', opts);

  if (verbose)
  {
    console.log('Script garner gathered the following files.\n');
    console.dir(scripts);
    console.log('\n');
  }

  return scripts;
};


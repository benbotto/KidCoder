module.exports = function(grunt, buildDir)
{
  'use strict';

  // Make revisions of all js and css files.
  var filerev = 
  {
    js:
    {
      src: buildDir + 'js/*.js'
    },
    css:
    {
      src: buildDir + 'css/*.css'
    }
  };

  grunt.loadNpmTasks('grunt-filerev');

  return filerev;
};


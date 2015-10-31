module.exports = function(grunt, srcIndex, buildDir)
{
  'use strict';

  var useminPrepare =
  {
    html: srcIndex,
    options:
    {
      dest: buildDir
    }
  };

  grunt.loadNpmTasks('grunt-usemin');

  return useminPrepare;
};


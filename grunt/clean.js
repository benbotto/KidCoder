module.exports = function(grunt, buildDir, tmpDir)
{
  'use strict';

  var clean =
  {
    build: [buildDir],
    tmp:   [tmpDir]
  };

  grunt.loadNpmTasks('grunt-contrib-clean');

  return clean;
};


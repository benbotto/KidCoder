module.exports = function(grunt, buildIndex)
{
  'use strict';

  var usemin =
  {
    html: [buildIndex]
  };

  grunt.loadNpmTasks('grunt-usemin');

  return usemin;
};


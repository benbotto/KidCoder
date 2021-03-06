module.exports = function(grunt)
{
  'use strict';

  var buildDir   = __dirname + '/build/';
  var tmpDir     = __dirname + '/.tmp/';
  var srcIndex   = __dirname + '/public/index.html';
  var buildIndex = buildDir  + 'index.html';
  var verbose    = true;

  // This object contains all scripts for the application.  The object has
  // properties describing each type of script (app, grunt, unitTests, etc.).
  // Pass true for verbose output.
  var scripts = require('./grunt/scriptGarner')(verbose);

  // This array contains all the html files for the application.  These files
  // are partial files, and are added to a javascript file as part of the
  // ngtemplates task.
  var html = require('./grunt/htmlGarner')(verbose);

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-filerev');

  grunt.initConfig
  ({
    clean:         require('./grunt/clean')(grunt, buildDir, tmpDir),
    jshint:        require('./grunt/jshint')(grunt, scripts),
    copy:          require('./grunt/copy')(grunt, srcIndex, buildIndex),
    useminPrepare: require('./grunt/useminPrepare')(grunt, srcIndex, buildDir),
    ngtemplates:   require('./grunt/ngtemplates')(grunt, html),
    filerev:       require('./grunt/filerev')(grunt, buildDir),
    usemin:        require('./grunt/usemin')(grunt, buildIndex),
    karma:         require('./grunt/karma')(grunt, scripts, html)
  });

  // Clean the temp and build directories.
  grunt.registerTask('clean_prebuild',  ['clean:tmp', 'clean:build']);

  // Copy static assets to the build directory.
  grunt.registerTask('copy_assets', ['copy:index', 'copy:img', 'copy:fonts']);

  // Build the native (desktop) application.
  grunt.registerTask('build_native',
  [
    'clean_prebuild',          // Remove the old build and .tmp directories.
    'jshint',                  // Check for lint.
    'copy_assets',             // Copy any static assets, such as images.
    'useminPrepare',           // Parse scripts and stylesheets from the index file.
    'ngtemplates',             // Put all template HTML into a script (preload angular cache).
    'concat',                  // Concatenate all JS and CSS.
    'uglify',                  // Minify JS.
    'cssmin',                  // Minify CSS.
    'filerev',                 // Cache bust with a hash of the file.
    'usemin',                  // Use the minified, cache-busted files.
    'clean:tmp'                // Remove the temporary folder.
  ]);

  // By default just build the native (desktop) application.
  grunt.registerTask('default', ['build_native']);

  // Alias for the karma task.
  grunt.registerTask('test', ['karma']);
};


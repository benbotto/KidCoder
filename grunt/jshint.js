module.exports = function(grunt, scripts)
{
  'use strict';

  var jshint =
  {
    /* Global options. */
    options:
    {
      strict:    true,
      eqeqeq:    true,
      indent:    2,
      quotmark:  'single',
      undef:     true,
      unused:    true
    },

    /* Get the lint out of all app files. */
    app:
    {
      options:
      {
        globals:
        {
          angular: true
        }
      },
      files:
      {
        src: scripts.app
      }
    },

    /* Unit tests. */
    /* TODO: lint these as well. */
    /*unitTests:
    {
      options:
      {
        globals:
        {
          angular:    true,
          describe:   true,
          it:         true,
          expect:     true,
          beforeEach: true,
          afterEach:  true,
          spyOn:      true,
          inject:     true,
          jasmine:    true,
          console:    true
        }
      },
      files:
      {
        src: scripts.spec.unit
      }
    },*/

    /* Grunt files. */
    grunt:
    {
      options:
      {
        node: true
      },
      files:
      {
        src: scripts.grunt
      }
    },
  };

  grunt.loadNpmTasks('grunt-contrib-jshint');

  return jshint;
};


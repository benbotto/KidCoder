module.exports = function(grunt, scripts, html)
{
  'use strict';

  var files = scripts.lib
    .concat(scripts.app)
    .concat(scripts.spec.unit)
    .concat(html);

  var karma =
  {
    options:
    {
      frameworks: ['jasmine'],
      port:       8765,
      files:      files,

      // Any html (directives) are put into a JS file and added to the template
      // cache.  In this manner no GET requests are made when testing
      // directives that use templateURL.  Each HTML file is added to a
      // self-titled module.  Refer to
      // https://github.com/karma-runner/karma-ng-html2js-preprocessor 
      // http://karma-runner.github.io/0.12/config/configuration-file.html
      // https://github.com/vojtajina/ng-directive-testing
      preprocessors:
      {
        '**/*.html': ['ng-html2js']
      },
      ngHtml2JsPreprocessor:
      {
        stripPrefix: 'public/'
      }
    },
    interactive: {}
  };

  grunt.loadNpmTasks('grunt-karma');

  return karma;
};


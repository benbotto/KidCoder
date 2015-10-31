module.exports = function(grunt, html)
{
  'use strict';

  var files = html.map(function(file)
  {
    return file.replace(/^public\//, '');
  });

  var ngtemplates =
  {
    'acca.hqa':
    {
      src:    files,
      cwd:    __dirname + '/../public/',
      dest:   '.tmp/js/templates.js',
      options:
      {
        // This is the usemin task to which the templates get concatenated.
        usemin: 'js/hqa.acca.min.js',
        htmlmin:
        {
          removeComments:     true,
          collapseWhitespace: true
        }
      }
    }
  };

  grunt.loadNpmTasks('grunt-angular-templates');

  return ngtemplates;
};


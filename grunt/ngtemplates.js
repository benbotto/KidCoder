module.exports = function(grunt, html)
{
  'use strict';

  var files = html.map(function(file)
  {
    return file.replace(/^public\//, '');
  });

  var ngtemplates =
  {
    bsyKidCoder:
    {
      src:    files,
      cwd:    __dirname + '/../public/',
      dest:   '.tmp/js/templates.js',
      options:
      {
        // This is the usemin task to which the templates get concatenated.
        usemin: 'js/kidCoder.min.js',
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


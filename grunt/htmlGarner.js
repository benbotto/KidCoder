'use strict';

module.exports = function(verbose)
{
  var glob     = require('glob');
  var globOpts = {cwd: __dirname + '/../'};

  // All the HTML files in the application that should be built.
  var html = glob.sync('public/**/*.html', globOpts).filter(function(script)
  {
    return !script.match(/bower_components/) &&
           !script.match(/index.html/);
  });

  if (verbose)
  {
    console.log('htmlGarner gathered the following files.\n');
    console.log(html);
    console.log('\n');
  }

  return html;
};


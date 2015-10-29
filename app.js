var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var app     = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404s.
app.use(function(req, res, next)
{
  res.status(404).sendFile(__dirname + '/public/404.html');
});

module.exports = app;


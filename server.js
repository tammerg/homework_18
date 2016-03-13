var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var parser = require('body-parser');
var logger = require('cheerio');
var request = require('request');
var PORT = 8080;

app.listen(PORT, function(req, res){
  console.log('You are listening on port %s', PORT);
});


//Express Routes
app.get('/', function(req, res){
  res.render('index');
});

var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var parser = require('body-parser');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var request = require('request');
mongoose.connect('mongodb://localhost/homework18DB');
var PORT = process.env.PORT || 8080;

app.use('/scripts', express.static('public/scripts'));
app.use('/css', express.static('public/stylesheets'));
app.use('/img', express.static('public/img'));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.listen(PORT, function(req, res){
  console.log('You are listening on port %s', PORT);
});

//Express Routes
app.get('/', function(req, res){
  res.render('index');
});

var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var parser = require('body-parser');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var request = require('request');
mongoose.connect('mongodb://localhost/homework18DB');

const PORT = process.env.PORT || 8080;

app.use(parser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/scripts', express.static('public/scripts'));
app.use('/css', express.static('public/stylesheets'));
app.use('/img', express.static('public/img'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(PORT, function(req, res){
  console.log('You are listening on port %s', PORT);
});

//Express Routes
app.get('/', function(req, res){
  var request = require('request');
  var cheerio = require('cheerio');
  request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('span.comhead').each(function(i, element){
      var a = $(this).prev();
      var rank = a.parent().parent().text();
      var title = a.text();
      var url = a.attr('href');
      var subtext = a.parent().parent().next().children('.subtext').children();
      var points = $(subtext).eq(0).text();
      var username = $(subtext).eq(1).text();
      var comments = $(subtext).eq(2).text();
      // Our parsed meta data object
      var metadata = {
        rank: parseInt(rank),
        title: title,
        url: url,
        points: parseInt(points),
        username: username,
        comments: parseInt(comments)
      };
      console.log(metadata);
      res.render('index');
    });
  }
});
});

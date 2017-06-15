var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


var Article = require('./models/article.js');

var app = express();
var PORT = process.env.PORT || 3000; 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));


mongoose.connect('mongodb://heroku_xqcmgtcq:mhafoc2lnhh2e3lvhu570t5im0@ds127962.mlab.com:27962/heroku_xqcmgtcq');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});


// -------------------------------------------------


app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})


app.get('/api/', function(req, res) {


  Article.find({}).sort([['date', 'descending']])
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});


app.post('/api/', function(req, res){
  var newSearch = new Article(req.body);
  console.log("url: " + req.body.url);
  console.log(req.body.main)


  Article.create({"title": req.body.main, "date": Date.now(), "url": req.body.url}, function(err){
    if(err){
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  })
});

app.put('/api/', function(req, res){
  console.log(req.body);


  Article.remove({_id: req.body._id}, function(err){
    if(err){
      console.log(err);
    }
    else {
      res.send("Removed article");
    }
  })
});


// -------------------------------------------------

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
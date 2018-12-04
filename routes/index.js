var express = require('express');
var router = express.Router();
var https = require('https');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hellow world page. */
router.get('/weather', function (req, res, next) {
  var j = 5000;
  for (var i = 0; i <= j; i++) {
    if (i === j) {
      res.render('helloworld', { title: 'Node JS Application', title2: 'Get the city weather', data: "" });
    }
  }
});

router.get('/content2', function (req, res) {
  var weatherData = '';
  var optionsget = {
    host: 'api.openweathermap.org', // here only the domain name
    // (no http/https !)
    path: '/data/2.5/weather?q=' + req.query.city + '&appid=46545ad7fc82f372ebb30c42c3585d87&units=metric', // the rest of the url with parameters if needed
    method: 'GET' // do GET
  };
  var reqGet = https.request(optionsget, function (resp) {
    console.log("statusCode: ", resp.statusCode);
  
    resp.on('data', function (d) {
      console.info('GET result :\n');
      weatherData = JSON.parse(d);
      res.render('content', { title: 'Express', data: weatherData })
    });
  });

  reqGet.end();
  reqGet.on('error', function (e) {
    console.error(e);
  });

});

module.exports = router;

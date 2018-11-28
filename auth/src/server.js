var router = require('./routes');
var bodyParser = require('body-parser');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.WEB_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  
router(app);

app.listen(port);

console.log("Listening on: " + port);

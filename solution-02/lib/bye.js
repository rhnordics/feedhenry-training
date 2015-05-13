var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function byeRoute() {
  var bye = new express.Router();
  bye.use(cors());
  bye.use(bodyParser());

  bye.get('/', function(req, res) {
    console.log(new Date(), 'In bye route GET / req.query=', req.query);
    var world = req.query && req.query.bye ? req.query.bye : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Bye ' + world});
  });

  return bye;
}

module.exports = byeRoute;

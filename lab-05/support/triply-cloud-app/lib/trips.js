var $fh = require('fh-mbaas-api');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function tripsRoute() {
  var trips = new express.Router();
  trips.use(cors());
  trips.use(bodyParser());


  trips.get('/', function(req, res) {

    // TODO: return all trip objects with the following json structure
    //  {
    //    from: 'Stockholm',
    //    to: 'Helsinki',
    //    date: '2015-09-20',
    //    userId: '666',
    //    userName: 'Alexandra'
    //  }
    //

  });

  trips.post('/', function(req, res) {
    console.log(new Date(), 'In trip route POST / req.body=', req.body);

    // TODO: Create a trip object with the following json structure
    //  {
    //    from: 'Stockholm',
    //    to: 'Helsinki',
    //    date: '2015-09-20',
    //    userId: '666',
    //    userName: 'Alexandra'
    //  }
    //

  });

  return trips;
}

module.exports = tripsRoute;

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient


/* GET users listing. */
router.get('/', function(req, res, next) {
  
  MongoClient.connect('mongodb+srv://d190129k_chikitsa:z@UKqEpMU@cluster0.3xkqp.mongodb.net/test', function (err, client) {
    if (err) throw 'deepak err'+ err

    var db = client.db('shop')
      db.collection("customers").findOne({}, function(err, result) {
        if (err) throw err;
        return res.send({
          status: 200,
          msg: 'Record found',
          data: result
        });
      });
  });

});

router.post( '/', function( req, res, next ) {


  MongoClient.connect('mongodb+srv://d190129k_chikitsa:z@UKqEpMU@cluster0.3xkqp.mongodb.net/test', function (err, client) {
    if (err) throw 'deepak err'+ err

    var db = client.db('shop')

    var myobj = { name: "Company Inc", address: "Highway 37" };
      db.collection("customers").insertOne(myobj, function(err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        // db.close();
        return res.send({
          status: 200,
          msg: 'Record inserted',
          data: myobj
        });
      });
  });
} );

module.exports = router;

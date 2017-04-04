var express = require('express');
var router = express.Router();
var mysql = require('mysql');

function connectToDatabase() {
    var connection = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: 'thermometerdb'
    });

    connection.connect();

    return connection;
}

router.route('session/:sessionid')

    .get(function(req, res) {
        var connection = connectToDatabase();

        connection.query('SELECT id, readingTime, temperature, probeId FROM probereadings WHERE sessionid = ' + req.params.sesionid, function(err, rows, fields) {
            if (err) throw err;
            
            connection.end();

            res.status(200).json(rows);
        });
    });

router.route('')    
    .post(function(req, res) {
        var connection = connectToDatabase();

        connection.query('INSERT INTO probereadings (temperature, probeId, sessionId) VALUES (' + req.body.temperature + ', ' + req.body.probeId + ', ' + req.body.sessionId + ')', function(err, rows, fields) {
            if(err) throw err;

            // Created
            res.status(201).json();
            connection.end();
        });
    });

module.exports = router;
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var probeReadingRepo = require('../data_access/probeReadingRepository.js');

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

router.route('/session/:sessionid')

    .get(function(req, res) {
        probeReadingRepo.getById(req.params.sessionid, function(probeReadings) {
            res.status(200).json(probeReadings);
        });
    });

router.route('')    
    .post(function(req, res) {
        probeReadingRepo.add(req.body, function() {
            res.status(201).json();
        });
    });

module.exports = router;
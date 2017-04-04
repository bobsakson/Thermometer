var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sessionRepo = require('../data_access/sessionRepository.js');

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

router.route('')
    .get(function(req, res) {
        sessionRepo.get(function(sessions) {
            res.status(200).json(sessions);
        });

    });

router.route('/:sessionid')
    .get(function(req, res) {
        sessionRepo.getById(req.params.sessionid, function(sessions) {
            res.status(200).json(sessions);
        });
    });    

router.route('')    
    .post(function(req, res) {
        sessionRepo.add(req.body.sessiondate, function(session) {
                res.status(201).json(session);
        });
    });

module.exports = router;
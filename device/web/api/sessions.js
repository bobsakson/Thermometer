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

router.route('')

    .get(function(req, res) {
        var connection = connectToDatabase();

        connection.query('SELECT id, sessionDate FROM sessions', function(err, rows, fields) {
            if (err) throw err;

            res.status(200).json(rows);
            connection.end();
        });
    });

router.route('/:sessionid')

    .get(function(req, res) {
        var connection = connectToDatabase();

        connection.query('SELECT id, sessionDate FROM sessions WHERE id = ' + req.params.sessionid, function(err, rows, fields) {
            if (err) throw err;

            res.status(200).json(rows);
            connection.end();
        });
    });    

router.route('')    
    .post(function(req, res) {
        var connection = connectToDatabase();

        connection.query('INSERT INTO sessions (sessionDate) VALUES ("' + req.body.sessiondate + '")', function(err, rows, fields) {
            if(err) throw err;
            
            connection.query('SELECT id, sessionDate FROM sessions WHERE id = LAST_INSERT_ID()', function(e, r, f) {
                if(e) throw e;
                
                // Created
                res.status(201).json(r);
                connection.end();
            });
        });
    });

module.exports = router;
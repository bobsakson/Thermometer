var database = require('./database.js');

var add = function(probeReading, cb) {
    var connection = database.connect();

    connection.query('INSERT INTO probereadings (temperature, probeId, sessionId) VALUES (' + probeReading.temperature + ', ' + probeReading.probeId + ', ' + probeReading.sessionId + ')', function(err, rows, fields) {
        if(err) throw err;

        // Created
        cb();
        connection.end();
    });
};

var getById = function(sessionid, cb) {
    var connection = database.connect();

    connection.query('SELECT id, readingTime, temperature, probeId FROM probereadings WHERE sessionid = ' + sessionid, function(err, rows, fields) {
        if (err) throw err;
        
        connection.end();

        cb(rows);
    });
};

module.exports.add = add;
module.exports.getById = getById;
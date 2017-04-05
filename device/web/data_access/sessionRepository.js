var database = require('./database.js');

var get = function(cb) {
    var connection = database.connect();

    connection.query('SELECT id, sessionDate FROM sessions', function(err, rows, fields) {
        if (err) throw err;

        cb(rows);
        connection.end();
    });
};

var getById = function(id, cb) {
    var connection = database.connect();

    connection.query('SELECT id, sessionDate FROM sessions WHERE id = ' + id, function(err, rows, fields) {
        if (err) throw err;

        cb(rows);
        connection.end();
    });
};

var add = function(sessiondate, cb) {
    var connection = database.connect();

    connection.query('INSERT INTO sessions (sessionDate) VALUES ("' + sessiondate + '")', function(err, rows, fields) {
            if(err) throw err;
            
            connection.query('SELECT id, sessionDate FROM sessions WHERE id = LAST_INSERT_ID()', function(e, r, f) {
                if(e) throw e;
                
                // Created
                cb(r);
                connection.end();
            });
        });
};

module.exports.get = get;
module.exports.getById = getById;
module.exports.add = add;
var mysql = require('mysql');

var connect = function connect() {
    var connection = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: 'thermometerdb'
    });

    connection.connect();

    return connection;
}

module.exports.connect = connect;
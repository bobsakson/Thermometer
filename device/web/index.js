var express = require('express');
var path = require('path');
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var dnode = require('dnode');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var indexRoutes = require('./routes/index.js');
app.use('/', indexRoutes);

app.use('/client', express.static(path.resolve(__dirname, 'client')))
app.use('/node_modules', express.static(path.resolve(__dirname, 'node_modules')))

app.set('views', './views')
app.set('view engine', 'pug');

server.listen(3000, function () {
    console.log('App running on port 3000.');
});

// TODO: Once Rxjs is implemented, see if socket.io is still needed
io.on("connection", function(socket){
  console.log('connection established');
    socket.on('startPollingProbe', function(msg){
        console.log('socket message received');
        var client = dnode({    
          poll : function (cb) {
                  console.log('Poll');
                  cb();
              }
          });

          client.connect(6060, function (remote, conn) {    
              remote.startProbe(function (curTemp) {
                  io.emit('temperatureReading', curTemp);
              });
          });
    });
});
var dnode = require('dnode');
var mcp3008 = require('mcp3008.js');
var Probe = require('./probe.js');
var http = require('http');

var intervalObject = new Array();
var adc = null;

// TODO: These variables are hardcoded for now. Need to create endpoints to retrieve these values.
var probes = [1, 2];
var sessionId = 1;

var saveReadingToDB = function(channel, fahrenheit, celsius, kelvin) {
    var post_data = {
        "temperature": fahrenheit,
        "probeId": probes[channel - 1], //TODO: Figure this out, won't work beyond simulation.
        "sessionId": sessionId
    };

    var post_options = {
      url: 'http://localhost:3000/api/probeReadings',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      json: post_data
  };

var request = require('request');

 request(post_options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    }
});
};

var getProbesFromDB = function(cb) {
   // TODO: create an endpoint to retieve probes from the datbase.
   var rows = [new Probe(1, 'Meat'), new Probe(2, 'Grill')];
   cb(rows);
};

/*
 The simulate methods are meant to be used when the application is not running on a Rapsberry Pi.
 Start the application with a 1 as the first parameter:

 node index.js 1
 */

var simulatePollProbe = function(channel, cb) {
    var currentTemperature = Math.floor(Math.random() * 100) + 1;
    var iteration = 1;

    intervalObject.push(setInterval(function() {
        if((iteration % 10) === 0) {
            currentTemperature++;
            iteration = 1;
        }

        saveReadingToDB(channel, currentTemperature, 0, 0);

        iteration++;
        cb({ 'channel': channel, 'currentTemperature': currentTemperature });
    }, 1000));
};

var simulateStart = function(probes, cb) {
    console.log('Simulation starting.');
    console.log(probes.length);
    probes.forEach(function(element, index, array) {
        console.log('Setting up probe to poll -', element.channel);
        simulatePollProbe(element.channel, cb);
    });
};

var simulateStop = function(cb) {
    console.log('Simulation stopping.');
    intervalObject.forEach(function(element, index, array) {
        clearInterval(element);
    });
    
    intervalObject = new Array();
    cb();
};

/* End simulation methods */

var start = function(probes, cb) {
    probes.forEach(function(element, index, array) {
        console.log('Setting up probe to poll -', element.channel);
        pollProbe(element.channel, cb);
    });
};

var pollProbe = function(channel, cb) {
    adc.poll(channel, 1000, function(reading) {               
        var volts = (reading * 3.3) / 1024;
        var ohms = ((1 / volts) * 3300) - 1000;
        var lnohm = Math.log1p(ohms);
        
        var a =  0.000570569668444;
        var b =  0.000239344111326;
        var c =  0.000000047282773;
        
        var t1 = (b * lnohm);
        var c2 = c * lnohm;
        var t2 = Math.pow(c2, 3);

        var tempK = 1 / (a + t1 + t2);
        var tempC = tempK - 273.15 - 4;
        var tempF = tempC * (9 / 5) + 32;

        saveReadingToDB(tempF, tempC, tempK);

        cb({ 'channel': channel, 'currentTemperature': tempF });
    });
};

var stop = function(cb) {
    adc.stop();
    adc.close();
    cb();
};

var isSimulationMode = function() {
    if(process.argv[2] && process.argv[2] === '1') {
        return true;
    }
    else {
        return false;
    }
};

dnode(function (client) {
    this.startProbe = function (cb) {
        client.poll(function () {
            getProbesFromDB(function(probes) {
                console.log('Probe - Start');

                if(isSimulationMode()) {
                    simulateStart(probes, cb);
                }
                else {
                    if(!adc) {
                        adc = new mcp3008();
                    }
                    
                    start(probes, cb);
                }
            });        
        });
    }; 

    this.stopProbe = function (cb) {
        console.log('Probe - Stop');

        if(isSimulationMode()) {
            simulateStop(cb);
        }
        else {
            stop(cb);
            adc = null;
        }            
    };
}).listen(6060);

console.log('Probe ready');
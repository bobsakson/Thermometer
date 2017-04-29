var stats = require('stats-lite');
var oled = require('oled-spi');
var font = require('oled-font-5x7');
var mcp3008 = require('mcp3008.js');

var sampleSize = 10;
var pollFrequency = 1000 / sampleSize;

var probes = {
    channels: [0,7],
    readings: {}
};

var opts = {
  width: 128,
  height: 64,
  dcPin: 23,
  rstPin : 24,
  device: "/dev/spidev0.1"
};

var intervalObject = new Array();
var oleddisplay = null;
var adc = null;

var isSimulationMode = function() {
    if(process.argv[2] && process.argv[2] === '1') {
        return true;
    }
    else {
        return false;
    }
};

var takeReading = function(r, channel) {
    if(!probes.readings[channel] || probes.readings[channel].length === sampleSize) {
        probes.readings[channel] = [r];
    }
    else {
        probes.readings[channel].push(r);
    }

    if(probes.readings[channel].length === sampleSize) {
        logtemp(probes.readings[channel], channel);
    }
}

var isWithinStdDev = function(avg, stddev) {
    return function(reading) {
        return Math.abs(reading - avg) <= stddev;
    }
};

var logtemp = function(readings, channel) {
    console.log(readings);
    var stddev = stats.stdev(readings);
    var avg = stats.mean(readings);
    console.log(readings.filter(isWithinStdDev(avg, stddev)));
    var r = stats.mean(readings.filter(isWithinStdDev(avg, stddev)));
    
    var volts = (r * 3.3) / 1024;
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

    if(!isSimulationMode()) {
        oleddisplay.clearDisplay();
        oleddisplay.setCursor(1, 1);
        oleddisplay.writeString(font, 1, 'Channel ' + channel + ' temp ' + tempF, 1, true);
    }

    console.log('Channel ' + channel + ' temp ' + tempF);
}

var simulatePollProbe = function(channel) {
    var currentTemperature = Math.floor(Math.random() * 100) + 1;
    var iteration = 1;

    intervalObject.push(setInterval(function() {
        if((iteration % 10) === 0) {
            currentTemperature++;
            iteration = 1;
        }

        //console.log('Channel ' + channel + ' temp ' + currentTemperature);
        takeReading(currentTemperature, channel);

        iteration++;
    }, pollFrequency));
};

if(isSimulationMode()) {
    probes.channels.forEach(function(element, index, array) {
        console.log('Setting up probe to poll -', element);
        simulatePollProbe(element);
    });
}
else {
    oleddisplay = new oled(opts);
    oleddisplay.begin(function() {
        oled.setCursor(1, 1);
        oled.writeString(font, 1, 'Initializing...', 1, true);
    });

    adc = new mcp3008();
    adc.poll(0, pollFrequency, function(reading) { takeReading(reading, 0)});
    adc.poll(7, pollFrequency, function(reading) { takeReading(reading, 7)});
}
var oled = require('oled-spi');
var opts = {
  width: 128,
  height: 64,
  dcPin: 23,
  rstPin : 24,
  device: "/dev/spidev0.1"
};

var font = require('oled-font-5x7');

var oled = new oled(opts);
oled.begin(function(){
    oled.setCursor(1, 1);
    oled.writeString(font, 1, 'Initializing...', 1, true);
});

var mcp3008 = require('mcp3008.js');
var adc = new mcp3008();
var stats = require('stats-lite');

// var logtemp = function(r, channel) {
//     var volts = (r * 3.3) / 1024;
//     var ohms = ((1 / volts) * 3300) - 1000;
//     var lnohm = Math.log1p(ohms);
    
//     var a =  0.000570569668444;
//     var b =  0.000239344111326;
//     var c =  0.000000047282773;
    
//     var t1 = (b * lnohm);
//     var c2 = c * lnohm;
//     var t2 = Math.pow(c2, 3);

//     var tempK = 1 / (a + t1 + t2);
//     var tempC = tempK - 273.15 - 4;
//     var tempF = tempC * (9 / 5) + 32;

//     oled.clearDisplay();
//     oled.setCursor(1, 1);
//     oled.writeString(font, 1, 'Channel ' + channel + ' temp ' + tempF, 1, true);
//     console.log('Channel ' + channel + ' temp ' + tempF);
// }
var probes = {
    channels: [0,7],
    readings: {}
};

var sampleSize = 10;

var takeReading = function(r, channel) {
    if(!probes.readings.channel || probes.readings.channel.length === sampleSize) {
        probes.readings.channel = [r];
    }
    else {
        probes.readings.channel.push(r);
    }

    if(probes.readings.channel.length === sampleSize) {
        logtemp(probes.readings.channel);
    }
}

var isWithinStdDev = function(reading, avg, stddev) {
    return Math.abs(reading - avg) <= stddev;
};

var logtemp = function(readings) {
    var stddev = stats.stdev(readings);
    var avg = stats.mean(readings);
    var r = stats.avg(readings.filter(isWithinStdDev(avg, stddev)));

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

    oled.clearDisplay();
    oled.setCursor(1, 1);
    oled.writeString(font, 1, 'Channel ' + channel + ' temp ' + tempF, 1, true);
    console.log('Channel ' + channel + ' temp ' + tempF);
}

 adc.poll(0, 100, function(reading) { takeReading(reading, 0)});
//  adc.poll(1, 1000, function(reading) { logtemp(reading, 1)});
//  adc.poll(2, 1000, function(reading) { logtemp(reading, 2)});
//  adc.poll(3, 1000, function(reading) { logtemp(reading, 3)});
//  adc.poll(4, 1000, function(reading) { logtemp(reading, 4)});
//  adc.poll(5, 1000, function(reading) { logtemp(reading, 5)});
//  adc.poll(6, 1000, function(reading) { logtemp(reading, 6)});
 adc.poll(7, 100, function(reading) { takeReading(reading, 7)});
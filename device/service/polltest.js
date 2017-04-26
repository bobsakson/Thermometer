var mcp3008 = require('mcp3008.js');
var adc = new mcp3008();

var logtemp = function(reading, channel) {
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

    console.log('Channel ' + channel + ' temp ' + tempF);
}

 adc.poll(0, 1000, logtemp(reading, 0));
 adc.poll(0, 1000, logtemp(reading, 1));
 adc.poll(0, 1000, logtemp(reading, 2));
 adc.poll(0, 1000, logtemp(reading, 3));
 adc.poll(0, 1000, logtemp(reading, 4));
 adc.poll(0, 1000, logtemp(reading, 5));
 adc.poll(0, 1000, logtemp(reading, 6));
 adc.poll(0, 1000, logtemp(reading, 7));
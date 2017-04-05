var isProbeRunning = false;

function startStop() {
    var socket = io();

    if(!isProbeRunning) {
        socket.emit('startPollingProbe');
    }
    else {
        socket.emit('stopPollingProbe');
    }

    socket.on('temperatureReading', function(reading) {
        temperatureReading(reading);
    });

    isProbeRunning = !isProbeRunning;
}

function temperatureReading(reading) {
    console.log(reading);
    $('.probe' + reading.channel).text(reading.currentTemperature);
}
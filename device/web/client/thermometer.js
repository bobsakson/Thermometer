var isProbeRunning = false;

function startStop() {
    var socket = io();

    if(!isProbeRunning) {
        socket.emit('startPollingProbe');
    }
    else {
        socket.emit('stopPollingProbe');
    }

    isProbeRunning = !isProbeRunning;
}
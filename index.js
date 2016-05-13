var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serialport = require('serialport');

var SerialPort = serialport.SerialPort;
var port = new SerialPort('/dev/ttyACM0', {
  parser: serialport.parsers.raw
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    if (msg == "ON"){
      port.write('a');
    }
    if (msg == "OFF"){
      port.write('t');
    }
    io.emit('chat message', msg);
  });
});


http.listen(8000, function(){
  console.log('listening on *:8000');
});

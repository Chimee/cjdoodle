var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var app = express();
var io = require('socket.io')(server);
var server = require('http').createServer(app);
var path = require('path');
var wget = require('wget');


var hostname = '0.0.0.0'; //hostname will use later
var port = 8000; 

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res, next){	
	res.sendFile(__dirname + '/index.html');
		
	
});

server.listen(port);



var io = require('socket.io').listen(server);




io.sockets.on('connection', function(socket){
    console.log("We're Connected");



socket.on('changeBgColor', function (color) {
        console.log(color);
        socket.broadcast.emit('changeBgColorEveryWhere', color.color);
        socket.emit('changeBgColorEveryWhere', color.color);    //send color change to client
		});
	
	
	//Send Date Data To Client
    setInterval(function(){
	io.sockets.emit('date', {'date': new Date()});
	
	}, 1000);

socket.on('userinputsent', function (userinput, backcolor) {
        console.log(userinput, backcolor);
        socket.broadcast.emit('displayimage', userinput, backcolor);
        socket.emit('displayimage', userinput, backcolor);    //send color change to client
		});
	
socket.on('picturesubmitted', function () {
        console.log('submission received');
        socket.broadcast.emit('displaypicture');
        socket.emit('displaypicture');    //send color change to client
		});
			
socket.on('clearscreenclicked', function () {
        console.log('Sending Clear Screen Approval');
        socket.broadcast.emit('clearthescreen');
        socket.emit('clearthescreen');    //send clear screen change to client
		});
});






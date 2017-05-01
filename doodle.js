
var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var app = express();
var io = require('socket.io')(server);
var server = require('http').createServer(app);
var path = require('path');
var wget = require('wget');
var connect = require('connect');
var multer = require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');


var hostname = '0.0.0.0'; //hostname will use later
var port = 8000; 


app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res, next){	
	res.sendFile(__dirname + '/index.html');
});


app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});




app.get('/image.png', function (req, res) {
    
	res.sendFile(path.resolve('./uploads/image.png'));
}); 


server.listen(port);



var io = require('socket.io').listen(server);




io.sockets.on('connection', function(socket){
    console.log("We're Connected");




	
	
	//Send Date Data To Client
 
	

socket.on('userinputsent', function (userinput, backcolor, jtroncolor) {
        console.log(userinput, backcolor, jtroncolor);
        socket.broadcast.emit('displayimage', userinput, backcolor, jtroncolor);
        socket.emit('displayimage', userinput, backcolor, jtroncolor);    //send color change to client
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






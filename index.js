var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var port = process.env.PORT || 9000;
// var mqtt = require('mqtt');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
 });

app.use(express.static('scripts'));

http.listen(port, function(){
  console.log('listening on *: ' + port);
});

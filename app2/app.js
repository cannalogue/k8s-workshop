var express = require('express');
var http = require('http');
var app = express();

// get current-time service
app.get('/current-time', function (req, res) {
  res.send(new Date());
});

http.createServer(app).listen(3003, () => console.log('Server listening on port 3003...'));
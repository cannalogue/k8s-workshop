var express = require('express');
var http = require('http');
var axios = require('axios');
var app = express();

var timeServiceAPI = process.env.TIME_SERVICE_API || 'http://localhost:3003/current-time'

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
});

app.get('/tell-me-time', function (req, res) {
  axios.get(timeServiceAPI)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
  });
});

http.createServer(app).listen(3000, () => console.log('Server listening on port 3000...'));
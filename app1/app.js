var express = require('express');
var http = require('http');
var axios = require('axios');
var app = express();

var timeServiceAPI = process.env.TIME_SERVICE_API || 'http://localhost:3003/current-time';

var shouldRun = true;
function blockCpuFor(ms) {
	var now = new Date().getTime();
	var result = 0
	while(shouldRun) {
		result += Math.random() * Math.random();
		if (new Date().getTime() > now +ms)
			return;
	}	
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/make-me-busy', (req, res) => {
  blockCpuFor(10000); // block cpu for 20 seconds
  res.send('finally, i am back!!');
});

// call time service and return the result
app.get('/tell-me-time', (req, res) => {
  axios.get(timeServiceAPI)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
  });
});

http.createServer(app).listen(3000, () => console.log('Server listening on port 3000...'));
var express = require('express');
var http = require('http');
var axios = require('axios');
var fs = require('fs');
var app = express();

var timeServiceAPI = process.env.TIME_SERVICE_API || 'http://localhost:3003/current-time';
var countFilePath = 'files/count.json';
if (!fs.existsSync(countFilePath)) {
  fs.writeFileSync(countFilePath, '{ "count": 0 }',{ flag: 'w' });
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

// block the thread for 10 seconds and then repond
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

// return the current count
app.get('/count', (req, res) => {
  var countJson = JSON.parse(fs.readFileSync(countFilePath).toString());
  var currentCount = countJson.count + 1;
  fs.writeFileSync(countFilePath, JSON.stringify({ count: currentCount }))
  res.send({ count: currentCount });
});

http.createServer(app).listen(3000, () => console.log('Server listening on port 3000...'));

var shouldRun = true;
function blockCpuFor(ms) {
	var now = new Date().getTime();
	var result = 0
	while(shouldRun) {
		result += Math.random() * Math.random();
		if (new Date().getTime() > now +ms)
			return;
	}	
};
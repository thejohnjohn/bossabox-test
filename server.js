const express = require('express');

const app = express();
const port = 3000;

const { data } = require('./data.js')
const { isSubset } = require('./utils/queryhandler');

const attributes = Object.keys(data[0]);

app.get('/tools', (req, res) => {
  let requestAttributes = Object.keys(req.query);
  
	requestAttributes.length === 0 ? res.send(data) : res.send('OK');
});

app.post('/tools', (req, res) => {
  res.send(`You post ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});


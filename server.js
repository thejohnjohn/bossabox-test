const express = require('express');

const { data } = require('./data.js');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/tools', (req, res) => {
  let requestAttributes = Object.keys(req.query);
  
	requestAttributes.length === 0 ? res.send(data) : res.send('OK');
});

app.post('/tools', (req, res) => {
  data.push(req.body);
  res.send(res.statusCode);
});

app.delete('/tools/:id', (req, res) => {
  res.send(`Delete id ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});


const express = require('express');

const app = express();
const port = 3000;

const { data } = require('./data.js')

app.get('/tools', (req, res) => {
	res.send(data);
});

app.post('/:id', (req, res) => {
  res.send(`You post ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});


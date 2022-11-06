const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Hello, world on port ${port}`);
});

app.post('/:id', (req, res) => {
  res.send(`You post ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});


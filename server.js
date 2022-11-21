const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  const { url } = request;
  console.log(url);
  const regex = /^(\/tools)((\/[0-9]+)|(\?[a-z]+\=[a-z]+((\&[a-z]+\=[a-z]+)+)?))?/;
  const result = regex.exec(url);
  
  if (!result) {
    response.writeHead(404);
    response.end(`The ${url} address is not found.`);
  }

  response.writeHead(200);
  response.end(`${result}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

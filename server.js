const http = require('http');

const { ToolsService } = require('./src/tools/tools.service');

const hostname = '127.0.0.1';
const port = 3000;

const toolsService = new ToolsService();

const server = http.createServer(async (request, response) => {
  const { url, method } = request;
  const regex = /^(\/tools)((\/[0-9]+)|(\?[a-z]+\=[a-z]+((\&[a-z]+\=[a-z]+)+)?))?/;
  const result = regex.exec(url);
  
  if (!result) {
    response.writeHead(404);
    response.end(`The ${url} address is not found.`);
  }
  
  switch (method) {
    case 'GET':
      let result = await toolsService.getAllTools();
     
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(result));
      response.end();
    break;
    case 'POST':
      let body = '';
      request.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
      });
      request.on('end', () => {
          console.log(body);
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(body);
      });
    break;
    default:
      response.writeHead(404);
      response.end(`Not found`);
    break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


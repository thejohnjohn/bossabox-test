const http = require('http');
const url = require('url');

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
      let toolList = await toolsService.getAllTools();
     
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(toolList));
      response.end();
    break;
    case 'POST':
      let body = '';

      request.on('data', chunk => {
        body += chunk.toString();
      });

      request.on('end', () => {
        (
          async(param) => {
            param = JSON.parse(param);
            await toolsService.insertTool(param);
          }
        )(body); 

        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(body);
      });

    break;
    case 'PUT':
      const id = parseInt(url.split('/')[2]);
      let updatedTool = ''; 
 
      request.on('data', chunk => {
        updatedTool += chunk.toString();
      });

      request.on('end', async () => {
        updatedTool = JSON.parse(updatedTool);
        await toolsService.updateToolById(id, updatedTool); 
        
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(updatedTool));
      });

    break;
    case 'DELETE':
      const deleteId = parseInt(url.split('/')[2]);
      console.log(deleteId);
      (
        async(param) => {
          await toolsService.deleteToolById(param); 
        }
      )(deleteId);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end('OK');
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


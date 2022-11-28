const http = require('http');
const querystring = require('querystring');

const { ToolsService } = require('./src/tools/tools.service');
const { isAuthenticated, createToken } = require('./utils/tokenhandler');
const { PORT, SECRET, EXPIRES } = require('./constants');

const hostname = '127.0.0.1';
const port = PORT || 3000;

const toolsService = new ToolsService();

const server = http.createServer(async (request, response) => {
  const { url, method } = request;

  if (url === '/login' && method === 'POST') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });

    request.on('end', async () => {
      body = JSON.parse(body);
      const access_token = createToken(body);
      
      response.writeHead(200, { "Content-Type": "application/json" });
      console.log(JSON.stringify({access_token}));

      response.end();
    });
  }
  
  const regex = /^(\/tools)((\/[0-9]+)|(\?[a-z]+\=[a-z]+((\&[a-z]+\=[a-z]+)+)?))?/;
  const result = regex.exec(url);
  
  switch (method) {
    case 'GET':
      console.log(querystring.decode(url.split('?')[1]));    

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
        response.write(body);
      });

      response.end();
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


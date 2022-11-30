const http = require('http');
const querystring = require('querystring');

const { ToolsService } = require('./src/tools/tools.service');
const { getRequestData } = require('./utils/utils');
const { isAuthenticated, createToken } = require('./utils/tokenhandler');
const { PORT, SECRET, EXPIRES } = require('./env');

const hostname = '127.0.0.1';
const port = PORT || 3000;

const toolsService = new ToolsService();

const server = http.createServer(async (request, response) => {
  const { url, method } = request;
 
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
      let data = await getRequestData(request);
      
      data = JSON.parse(data);
      
      if (url === '/login') {
        let authenticated = isAuthenticated(data);

        if (authenticated === -1) {
          response.writeHead(401);
          response.write('Unauthorized');
        } else {
          const access_token = createToken(data);

          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify({ access_token }));
        }
      }
      
      if(url === '/tools') {
        await toolsService.insertTool(tool);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(data);
      }
      
      response.end();
    break;
    case 'PUT':
      const id = parseInt(url.split('/')[2]);
      
      let updatedTool = await getRequestData(request); 
      await toolsService.updateToolById(id, updatedTool);
      
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(updatedTool));
    break;
    case 'DELETE':
      const idToDelete = parseInt(url.split('/')[2]);
      await toolsService.deleteToolById(idToDelete);
      
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


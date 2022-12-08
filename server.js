const http = require('http');
const querystring = require('querystring');

const { ToolsService } = require('./src/tools/tools.service');
const { getRequestData } = require('./utils/utils');
const { isAuthenticated, createToken, verifyToken } = require('./utils/tokenhandler');
const { HOST, PORT } = require('./env');

const hostname = HOST || '127.0.0.1';
const port = PORT || 3000;

const toolsService = new ToolsService();

const server = http.createServer(async (request, response) => {
  const { url, method } = request;
  
  switch (method) {
    case 'GET':
      const parameters = querystring.decode(url.split('?')[1]);    
      
      let toolList = '';
      if (Object.keys(parameters).length === 0) {  
        toolList = await toolsService.getAllTools();
      } else {
        if (Array.isArray(parameters.tags) !== true) {
          parameters.tags = [parameters.tags];
        }
        toolList = await toolsService.getToolsByTag([...parameters.tags]);
      }
      
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
        data = await toolsService.insertTool(data);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(data);
      }
      
      response.end();
    break;
    case 'PUT':
      const id = parseInt(url.split('/')[2]);
      
      let headers = request.rawHeaders;
     
      let authorizationIndex = headers.indexOf('Authorization') + 1;

      let token = headers[authorizationIndex].split('Bearer ')[1];

      let result = verifyToken(token);
     
      if(result instanceof Error) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end('Access expired.');
      }

      let updatedTool = await getRequestData(request); 
      await toolsService.updateToolById(id, JSON.parse(updatedTool));
      
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


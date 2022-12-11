const http = require('http');
const querystring = require('querystring');

const xpress = require('./utils/xpress');
const { ToolsService } = require('./src/tools/tools.service');
const { getRequestData } = require('./utils/utils');
const { isAuthenticated, createToken, verifyToken } = require('./utils/tokenhandler');
const { HOST, PORT } = require('./env');

const hostname = HOST || '127.0.0.1';
const port = PORT || 3000;

const toolsService = new ToolsService();

xpress.post('/login', async (request, response) => {
    let data = await getRequestData(request);
      
    data = JSON.parse(data);

    /* let authenticated = isAuthenticated(data);

    if (authenticated === -1) {
      response.writeHead(401);
      response.write('Unauthorized');
    } else {
      const access_token = createToken(data);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ access_token }));
    } */

    response.writeHead(200);
    response.write('ok');
    response.end();
});

xpress.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`));


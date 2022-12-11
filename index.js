const xpress = require('./utils/xpress');
const { ToolsService } = require('./src/tools/tools.service');
const { getRequestData } = require('./utils/utils');
const { isAuthenticated, createToken, verifyToken } = require('./utils/tokenhandler');
const { HOST, PORT } = require('./env');

const hostname = HOST || '127.0.0.1';
const port = PORT || 3000;

const toolsService = new ToolsService();

xpress.post('/login', async (request, response) => {
  const data = request.body;

  const authenticated = isAuthenticated(data);

  if (authenticated === -1) {
    response.status(401).send('Unauthorized');
  } else {
    // eslint-disable-next-line camelcase
    const access_token = createToken(data);

    // eslint-disable-next-line camelcase
    response.status(200).send(JSON.stringify({ access_token }));
  }
});

xpress.put('/tools/4', async (request, response) => {
  const { url } = request;
  const id = parseInt(url.split('/')[2], 10);

  const headers = request.rawHeaders;
  const authorizationIndex = headers.indexOf('Authorization') + 1;
  const token = headers[authorizationIndex].split('Bearer ')[1];
  const result = verifyToken(token);

  if (result instanceof Error) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end('Access expired.');
  }

  const updatedTool = request.body;
  console.log(updatedTool);
  /* await toolsService.updateToolById(id, JSON.parse(updatedTool));

  response.writeHead(200, { 'Content-Type': 'application/json' }); */
  response.status(200).send(JSON.stringify(updatedTool));
});

xpress.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`));

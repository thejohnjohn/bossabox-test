const querystring = require('querystring');
const xpress = require('./utils/xpress');
const { ToolsService } = require('./src/tools/tools.service');
const { isAuthenticated, createToken, verifyToken } = require('./utils/tokenhandler');
const { HOST, PORT } = require('./env');

const hostname = HOST || '127.0.0.1';
const port = PORT || 3000;

const toolsService = new ToolsService();

const getToken = (request) => {
  const headers = request.rawHeaders;
  const authorizationIndex = headers.indexOf('Authorization') + 1;
  const token = headers[authorizationIndex].split('Bearer ')[1];

  return token;
};

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

xpress.post('/tools', async (request, response) => {
  const data = request.body;
  const insertedData = await toolsService.insertTool(data);

  response.status(200).send(JSON.stringify(insertedData));
});

xpress.get('/tools', async (request, response) => {
  const { url } = request;
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

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.status(200).send(JSON.stringify(toolList));
});

xpress.put('/tools/4', async (request, response) => {
  const { url, body } = request;
  const id = parseInt(url.split('/')[2], 10);

  const token = getToken(request);
  const result = verifyToken(token);

  if (result instanceof Error) {
    response.status(401).send('Acess expired');
  }

  const updatedTool = await toolsService.updateToolById(id, JSON.parse(body));

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.status(200).send(JSON.stringify(updatedTool));
});

xpress.del('/tools/4', async (request, response) => {
  const idToDelete = parseInt(request.url.split('/')[2], 10);
  await toolsService.deleteToolById(idToDelete);

  response.status(200).send('OK');
});

xpress.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`));

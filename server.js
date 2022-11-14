const express = require('express');

const { ToolsService } = require('./src/tools/tools.service');

const app = express();
const port = 3000;

app.use(express.json());

const toolsService = new ToolsService();

app.get('/tools', async (req, res) => {
  let queries = Object.keys(req.query);
  
  if (queries.length === 0) {
    let list = await toolsService.getAllTools();

    res.send(list);
  } else {
    res.send('OK');
  }
});

app.post('/tools', async (req, res) => {
  let tool = req.body;

  let inserdtedId = await toolsService.insertTool(tool);

  res.send(inserdtedId);
});

app.delete('/tools/:id', async (req, res) => {
  let toolId = parseInt(req.params.id);

  let deletedCount = await toolsService.deleteToolById(toolId);

  res.send(`${deletedCount} document(s) was/were deleted.`);
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});


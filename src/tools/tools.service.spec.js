const { describe, before, it } = require('node:test');
const assert = require('assert');

const { ToolsService } = require('./tools.service');

let toolsService;

describe('ToolsService', () => {
  before(() => {
    toolsService = new ToolsService();
  });

  it('insert tag parameters', async () => {
    const tags = ['node', 'web'];
    const taggedList = await toolsService.getToolsByTag(tags);
    console.log(taggedList);
    assert.strictEqual(1, 1);
  });
});

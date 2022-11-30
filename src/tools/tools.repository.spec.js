const { describe, before, it } = require('node:test');
const assert = require('assert');

const { ToolsRepository } = require('./tools.repository');

let toolsRepository;

describe('ToolsRepository', () => {
  before(() => {
    toolsRepository = new ToolsRepository();
  });

  it('insert tag parameters', async () => {
    const tags = ['node', 'web'];
    const taggedList = await toolsRepository.findByTag(tags);
    console.log(taggedList);
    assert.strictEqual(1, 1);
  });
});

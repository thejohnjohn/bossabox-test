const assert = require('node:assert');

const { isSubset } = require('../../utils/queryhandler');

// variables for test purposes
const attributes = ['id', 'title', 'link', 'description', 'tags'];

const rightCopy = ['id', 'title', 'link'];
const wrongCopy = ['id', 'title', 'like'];
// variables for test purposes

assert.equal(isSubset(attributes, rightCopy), true);
assert.equal(isSubset(attributes, wrongCopy), false);


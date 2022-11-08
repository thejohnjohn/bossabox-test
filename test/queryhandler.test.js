const assert = require('assert');

const { validateAttributes } = require('../queryhandler');

// variables for test purposes
const attributes = ['id', 'title', 'link', 'description', 'tags'];

const rightCopy = ['id', 'title', 'link'];
const wrongCopy = ['id', 'title', 'like'];
// variables for test purposes

console.log(validateAttributes(attributes, rightCopy));
console.log(validateAttributes(attributes, wrongCopy));

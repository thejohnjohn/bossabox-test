const validateAttributes = (attr, newAttr) => {	
  return newAttr.every((element) => {
    attr.includes(element);
  });
}

module.exports = {
  validateAttributes
};

const isSubset = (array1, array2) => array2.every((element) => array1.includes(element));

const selectByQuery = (array1, array2) => {
  if (!isSubset(array1[0], array2)) {
    throw new Error(`Attributes does not match`);
  }

  for (let index = 0; index < array1.length; index ++) {
    for (let indexAux = 0; indexAux < array2.length; indexAux ++) {
        
    }  
  }
}

module.exports = {
  isSubset,
  selectByQuery
};

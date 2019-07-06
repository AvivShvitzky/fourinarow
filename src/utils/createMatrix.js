function matrixCreator(dim1, dim2, value){
  return Array(dim1).fill().map(() => Array(dim2).fill(value))
}

module.exports = matrixCreator



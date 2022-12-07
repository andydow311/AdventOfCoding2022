const fs = require('fs')
let output = 0

const array = (firstIntegerOfFirstAssignment, secondIntegerOfFirstAssignment) => {
  var numbers = []
  for(let i = firstIntegerOfFirstAssignment; i <= secondIntegerOfFirstAssignment; i++) {
      numbers.push(i)
  }
  return numbers
}

const checker = (arr, target) => target.some(v => arr.includes(v));

const parseData = (data) => {
  const lines = data.toString().split("\n")
  for (let i = 0; i < lines.length; ++i) {
    const firstArray = array(parseInt(lines[i].split(",")[0].split("-")[0]), parseInt(lines[i].split(",")[0].split("-")[1]))
    const secondArray = array(parseInt(lines[i].split(",")[1].split("-")[0]), parseInt(lines[i].split(",")[1].split("-")[1]))
    if(checker(firstArray, secondArray) || checker(secondArray, firstArray)){
      output++
    }
}
}

const solve = (err, data) => {
  parseData(data)
  console.log(`output is ${output}`)
}

fs.readFile("input.txt", solve)
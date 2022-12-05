const fs = require('fs')
const readline = require('readline')
const message = "SOMETHING IS WRONG!"
const testFile = 'test_input.txt'
const actualFile = 'input.txt'
const expectedTestValue = 2

function getArrayOfIntegers(firstIntegerOfFirstAssignment, secondIntegerOfFirstAssignment){
    var numbers = []
    for(let i = firstIntegerOfFirstAssignment; i <= secondIntegerOfFirstAssignment; i++) {
        numbers.push(i)
    }
    return numbers
}

async function processLineByLine(fileName) {
    const fileStream = fs.createReadStream(fileName)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    let output = 0
    for await (const line of rl) {
      if (line.length > 0){
          const firstIntegerOfFirstAssignment = parseInt(line.split(",")[0].split("-")[0])
          const secondIntegerOfFirstAssignment = parseInt(line.split(",")[0].split("-")[1])
          const fistArray = getArrayOfIntegers(firstIntegerOfFirstAssignment,secondIntegerOfFirstAssignment)
          const firstIntegerOfSecondAssignment = parseInt(line.split(",")[1].split("-")[0])
          const secondIntegerOfSecondAssignment = parseInt(line.split(",")[1].split("-")[1])
          const scondarrayArray = getArrayOfIntegers(firstIntegerOfSecondAssignment,secondIntegerOfSecondAssignment)

          let checker = (arr, target) => target.every(v => arr.includes(v));

          if(checker(fistArray, scondarrayArray) || checker(scondarrayArray, fistArray)){
            output++
          }
      }
    }
    return output
  }

  async function getResult() {
    const test =  await processLineByLine(testFile)
    console.assert(test == expectedTestValue, message)
    const result = await processLineByLine(actualFile)
    console.log(`result is : ${result}`)
  }
  
  getResult()
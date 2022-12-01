const fs = require('fs');
const readline = require('readline');
const message = "SOMETHING IS WRONG!"
const testFile = 'calories_test.txt'
const actualFile = 'calories.txt'
const expectedTestValue = 45000

function compareFunction(a,b){return b-a}

function getTopThree(arr) {
    arr.sort(compareFunction)
    var first = arr[0]
    var second = arr[1]
    var third = arr[2]
    return parseInt(first) + parseInt(second) + parseInt(third)   
}

async function processLineByLine(fileName) {
  const fileStream = fs.createReadStream(fileName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let output = 0
  const calories = []
  for await (const line of rl) {
    if (line.length > 0){
        output = output + parseInt(line)
    }else{
        calories.push(parseInt(output))
        output = 0
    }
  }
  return getTopThree(calories)
}

async function getResult() {
    const test =  await processLineByLine(testFile)
    console.assert(test == expectedTestValue, message)
    const result = await processLineByLine(actualFile)
    console.log(`output is : ${result}`)
  }
  
getResult()
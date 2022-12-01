const fs = require('fs');
const readline = require('readline');
const message = "SOMETHING IS WRONG!"
const testFile = 'calories_test.txt'
const actualFile = 'calories.txt'
const expectedTestValue = 24000

async function processLineByLine(fileName) {
  const fileStream = fs.createReadStream(fileName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let output = 0
  let finalOutput = 0
  for await (const line of rl) {
    if (line.length > 0){
        output = output + parseInt(line)
    }else{
        if(finalOutput < output){
            finalOutput = parseInt(output)
        }
        output = 0
    }
  }
  return parseInt(finalOutput)
}

async function getResult() {
  const test =  await processLineByLine(testFile)
  console.assert(test == expectedTestValue, message)
  const result = await processLineByLine(actualFile)
  console.log(`output is : ${result}`)
}

getResult()
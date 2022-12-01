const fs = require('fs');
const readline = require('readline');
const message = "SMETHING IS WRONG!"
const testFile = 'calories_test.txt'
const actualFile = 'calories.txt'

async function processLineByLine(fileName) {
  const fileStream = fs.createReadStream(fileName);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let output = 0
  let finalOutput = 0
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
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
  console.assert(test == 24000, message)
  const result = await processLineByLine(actualFile)
  console.log(`output is : ${result}`)
}

getResult()
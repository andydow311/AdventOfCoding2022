const fs = require('fs')
const readline = require('readline')
const actualFile = 'actual_input.txt'

function isUnique(str) {
    return new Set(str).size == str.length;
  }

function getStartOfMessageMarker(line){
    var stringLength = 14
    for(let index = 0; index <=line.length; index++) {
        const subString = line.substring(index,stringLength)
        if(isUnique(subString)){
            return stringLength
        }
        stringLength++
    }
}

async function readAndProcessInput(actualFile) {
    const fileStream = fs.createReadStream(actualFile)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    for await (let line of rl) {
        return getStartOfMessageMarker(line)
    }
  }

  async function getResult() {
    const output = await readAndProcessInput(actualFile)
    console.log(`output: ${output}`)
  }
  
  getResult()

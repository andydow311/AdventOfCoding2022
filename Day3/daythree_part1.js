const fs = require('fs')
const readline = require('readline')
const message = "SOMETHING IS WRONG!"
const testFile = 'test_input.txt'
const actualFile = 'input.txt'
const priority = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const expectedTestValue = 157

function getCommonCharacterPriority(fistCompartment, secondCompartment){
    for(let i in fistCompartment) {
        const element = fistCompartment[i]
        const priorityValue = priority.indexOf(element) + 1
        if(secondCompartment.includes(element)){
            return priorityValue
        }
    }
    return 0
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
          //it's a given requirement that string will always be even
          const fistCompartment = line.slice(0, line.length / 2)
          const secondCompartment = line.slice(line.length / 2, line.length)
          const commonElementPrioirty = getCommonCharacterPriority(fistCompartment, secondCompartment)
          output = output + parseInt(commonElementPrioirty)
      }
    }
    return output
  }

  async function getResult() {
    const test =  await processLineByLine(testFile)
    console.assert(test == expectedTestValue, message)
    const result = await processLineByLine(actualFile)
    console.log(`output is : ${result}`)
  }
  
  getResult()
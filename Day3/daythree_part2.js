const fs = require('fs')
const readline = require('readline')
const message = "SOMETHING IS WRONG!"
const testFile = 'test_input.txt'
const actualFile = 'input.txt'
const priority = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const expectedTestValue = 70


function getCommonCharacterPriority(fistCompartment, secondCompartment, thirdCompartment){
    for(let i in thirdCompartment) {
        const element = thirdCompartment[i]
        const priorityValue = priority.indexOf(element) + 1
        if(fistCompartment.includes(element) && secondCompartment.includes(element)){
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
    let row = 0
    var firstCompartment = "" 
    var secondCompartment = "" 
    var thirdCompartment = "" 
    for await (const line of rl) {
      if (line.length > 0){
          row++
          if(row%3 == 1){
            firstCompartment = line
          }

          if(row%3 == 2){
            secondCompartment = line
          }

          if(row%3 == 0){
            thirdCompartment = line
            const commonElementPrioirty = getCommonCharacterPriority(firstCompartment, secondCompartment, thirdCompartment)
            output = output + parseInt(commonElementPrioirty)
            firstCompartment = "" 
            secondCompartment = "" 
            thirdCompartment = "" 
          }
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
const fs = require('fs')
const readline = require('readline')
const message = "SOMETHING IS WRONG!"
const testFile = 'strategy_test.txt'
const actualFile = 'strategy.txt'
const outcomes = new Map()
const myDrawStrategies = new Map()
const shapeScores = new Map()
const myWinStrategies = new Map()
const myLossStrategies = new Map()
const expectedTestValue = 12

myDrawStrategies.set('A', 'X')
myDrawStrategies.set('B', 'Y')
myDrawStrategies.set('C', 'Z')
outcomes.set('Y', myDrawStrategies)

myWinStrategies.set('A', 'Y')
myWinStrategies.set('B', 'Z')
myWinStrategies.set('C', 'X')
outcomes.set('Z', myWinStrategies)

myLossStrategies.set('A', 'Z')
myLossStrategies.set('B', 'X')
myLossStrategies.set('C', 'Y')
outcomes.set('X', myLossStrategies)

shapeScores.set('X', 1)
shapeScores.set('Y', 2)
shapeScores.set('Z', 3)

function getRoundScore(desiredOutcome, elf){
    
    const strategies = outcomes.get(desiredOutcome);
    const myStrategy = strategies.get(elf)

    if(desiredOutcome == 'Z'){
        return 6 + parseInt(shapeScores.get(myStrategy))
    }

    if(desiredOutcome == 'Y'){
        return 3+ parseInt(shapeScores.get(myStrategy))
    }

    return parseInt(shapeScores.get(myStrategy))
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
          const elf = line.charAt(0)
          const desiredOutcome = line.charAt(line.length - 1)
          const roundScore = getRoundScore(desiredOutcome, elf)
          output = output + roundScore
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
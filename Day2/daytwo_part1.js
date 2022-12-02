const fs = require('fs')
const readline = require('readline')
const message = "SOMETHING IS WRONG!"
const testFile = 'strategy_test.txt'
const actualFile = 'strategy.txt'
const expectedTestValue = 15

const winnerLoserMap = new Map()
winnerLoserMap.set('A', 'Z')
winnerLoserMap.set('B', 'X')
winnerLoserMap.set('C', 'Y')
winnerLoserMap.set('X', 'C')
winnerLoserMap.set('Y', 'A')
winnerLoserMap.set('Z', 'B')

const shapeScores = new Map()
shapeScores.set('X', 1)
shapeScores.set('Y', 2)
shapeScores.set('Z', 3)


function getRoundScore(me, elf){
    const shapeScore =  parseInt(shapeScores.get(me))
    
   if(winnerLoserMap.get(me) == elf){
    //win
    return 6 + shapeScore
   }
    
   if(winnerLoserMap.get(me) != elf && winnerLoserMap.get(elf) != me){
    //draw
    return 3+shapeScore
    }
   
    //lose
    return shapeScore 
}

async function processLineByLine(fileName) {
    const fileStream = fs.createReadStream(fileName)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    let output = 0
    for await (const line of rl) {
      if (line.length > 0){
          const elf = line.charAt(0);
          const me = line.charAt(line.length - 1)
          const roundScore = getRoundScore(me, elf)
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
const fs = require('fs')
let output = 0

const shapeScores = {
  'X': 1,
  'Y': 2,
  'Z': 3
}

const myLossStrategies = {
  'A': 'Z',
  'B': 'X',
  'C': 'Y'
}

const myWinStrategies = {
  'A': 'Y',
  'B': 'Z',
  'C': 'X'
}

const myDrawStrategies = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z'
}

const outcomes = {
  'X': myLossStrategies,
  'Y': myDrawStrategies,
  'Z': myWinStrategies
}

const resultWeights = {
  'X': 0,
  'Y': 3,
  'Z': 6
}

function myRoundScore(elfStrategy, desiredOutcome){
    const strategies = outcomes[desiredOutcome];
    const myStrategy = strategies[elfStrategy]
    return parseInt(resultWeights[desiredOutcome]) + parseInt(shapeScores[myStrategy])
}

const parseData = (data) => {
  const lines = data.toString().split("\n")
  for (let i = 0; i < lines.length; ++i) {
    const elfStrategy = lines[i][0];
    const desiredOutcome = lines[i][lines[i].length - 1]
    output = output + myRoundScore(elfStrategy, desiredOutcome)
  }
}

const solve = (err, data) => {
  parseData(data)
  console.log(`output is ${output}`)
}

fs.readFile("strategy.txt", solve)
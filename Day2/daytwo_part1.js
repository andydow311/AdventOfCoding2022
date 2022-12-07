const fs = require('fs')
let output = 0

const shapeScores = {
  'X': 1,
  'Y': 2,
  'Z': 3
}

const winnerLoserMap = {
  'A': 'Z',
  'B': 'X',
  'C': 'Y',
  'X': 'C',
  'Y': 'A',
  'Z': 'B'
}

function myRoundScore(myStrategy, elfStrategy){
  const shapeScore =  shapeScores[myStrategy]
  const win = winnerLoserMap[myStrategy] == elfStrategy
  const lose = winnerLoserMap[elfStrategy] == myStrategy
  if(win){
    return 6 + shapeScore
  }
  if(lose){
    return shapeScore
  }
  return 3+shapeScore
}

const parseData = (data) => {
  const lines = data.toString().split("\n")
  for (let i = 0; i < lines.length; ++i) {
    const elfStrategy = lines[i][0];
    const myStrategy = lines[i][lines[i].length - 1]
    output = output + myRoundScore(myStrategy, elfStrategy)
  }
}


const solve = (err, data) => {
  parseData(data)
  console.log(`output is ${output}`)
}

fs.readFile("strategy.txt", solve)
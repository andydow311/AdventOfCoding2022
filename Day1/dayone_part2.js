const fs = require('fs')
let calories = 0
let elvesCalories =[]

function compareFunction(a,b){return b-a}

function sumTopThreeCaloriesValues(arr) {
    arr.sort(compareFunction)
    var first = arr[0]
    var second = arr[1]
    var third = arr[2]
    return parseInt(first) + parseInt(second) + parseInt(third)   
}

const parseData = (data) => {
  const lines = data.toString().split("\n")
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i].length === 0) {
      elvesCalories.push(calories)
      calories = 0
    }else{
      calories = calories + parseInt(lines[i])
    }
  }
}

const solve = (err, data) => {
  parseData(data)
  console.log(console.log(`total is ${sumTopThreeCaloriesValues(elvesCalories)}`))
}


fs.readFile("calories.txt", solve)
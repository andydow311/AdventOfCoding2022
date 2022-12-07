const fs = require('fs')
let calories = 0
let maximumCalories = 0

const parseData = (data) => {
  const lines = data.toString().split("\n")
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i].length === 0) {
      if(calories > maximumCalories){
        maximumCalories = calories
      }
      calories = 0
    }else{
      calories = calories + parseInt(lines[i])
    }
  }
}

const solve = (err, data) => {
  parseData(data)
  console.log(console.log(`maximum calories is ${maximumCalories}`))
}


fs.readFile("calories.txt", solve)
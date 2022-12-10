const fs = require("fs")
let X = 1
let cycle =0
let cycles = new Map()

const signalStrength = () => {
    let limit = 20
    let output = 0
    for (const [cycle, value] of cycles) {
        if(cycle == limit){
            const signalStrength = cycle*value
            output = output + signalStrength
            limit = limit +40
        }
    }
    return output
}

const parseData = (data) => {
    const lines = data.toString().split("\n")
    for (let row = 0; row < lines.length; ++row) {
      const line = lines[row].trim()
      const instruction = line.trim().split(" ")[0]
      const value = parseInt(line.trim().split(" ")[1])
      cycle++
      if(instruction == "noop"){
        cycles.set(cycle, X)
      }else{
        cycles.set(cycle, X)
        cycle++
        cycles.set(cycle, X)
        X = X+value
      }
     }
}
  
const solve = (err, data) => {
      cycles.set(cycle, X)
      parseData(data)
      const output = signalStrength()
      console.log(`signalStrength is ${output}`)
  }
  
fs.readFile("input.txt", solve)



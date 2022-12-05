const fs = require('fs')
const readline = require('readline')
const message = "SOMETHING IS WRONG!"
const testFile = 'test_input.txt'
const actualFile = 'actual_input.txt'
const stacksMap = new Map()
let limit = 0

function populateStacksMap(line){
    limit = Math.floor(line.length/3)
    for(let index = 1; index <= limit; index++) {
        stacksMap.set(index, new Array())
    }
}

function populateStacksMapWithCrates(line){
    var count = 1
    for(let index = 0; index <=line.length; index=index+4) {
        var first = index
        var second = index+1
        var third = index+2
        const crate = line.charAt(first) + line.charAt(second) + line.charAt(third) 
        if(crate.includes("[")){
            stacksMap.get(count).push(crate)
        }
        count++
    }
}

function move(numberOfCratesToBeMoved, indexOfStackToHaveCratesRemoved,  indexOfStackToHaveCratesAdded){
    const stackToHaveCratesRemoved = stacksMap.get(indexOfStackToHaveCratesRemoved)
    const stackToHaveCratesAdded = stacksMap.get(indexOfStackToHaveCratesAdded)
    for(let i =0; i <numberOfCratesToBeMoved; i++){
        const crate =  stackToHaveCratesRemoved.shift()
        stackToHaveCratesAdded.unshift(crate)
    }
}

async function preProcessInput(fileName) {
    const fileStream = fs.createReadStream(fileName)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    let row = 0 
    for await (const line of rl) {
      row++  
      if (line.length > 0){
        if(row == 1){
            populateStacksMap(line)
        }
        
        populateStacksMapWithCrates(line)  
        
      }
    }
  }

  async function processCratesToBeMoved(fileName) {
    const fileStream = fs.createReadStream(fileName)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    let row = 0 
    for await (let line of rl) {
      row++  
      if (line.length > 0){
        if(line.includes("move")){
            line = line.replaceAll("move" ,"")
            line = line.replaceAll(" from" ,"")
            line = line.replaceAll(" to" ,"")
            const newline = line.trim()
            const numberOfCratesToBeMoved = parseInt(newline.split(" ")[0])
            const indexOfStackToHaveCratesRemoved = parseInt(newline.split(" ")[1])
            const indexOfStackToHaveCratesAdded = parseInt(newline.split(" ")[2])
            move(numberOfCratesToBeMoved, indexOfStackToHaveCratesRemoved,  indexOfStackToHaveCratesAdded)
        }
      }
    }
  }

  async function populateStacks() {
    await preProcessInput(actualFile)
  }

  async function moveCrates() {
    await processCratesToBeMoved(actualFile) 
  }

  async function getResult() {
   await populateStacks()
   await  moveCrates()
   var output = ""
    for(i =1; i<=limit; i++){
        const stack = stacksMap.get(i)
        if(stack.length > 0){
            output = output + stacksMap.get(i).shift().replaceAll("[","").replaceAll("]","")
         }
    }
    console.log(`output: ${output}`)
  }
  
  getResult()
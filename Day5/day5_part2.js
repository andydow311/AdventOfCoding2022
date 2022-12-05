const fs = require('fs')
const readline = require('readline')
const message = "SOMETHING IS WRONG!"
const testFile = 'test_input.txt'
const actualFile = 'actual_input.txt'
const stacksMap = new Map()
let limit = 0

function populateStacksMap(line){
    limit = Math.floor(line.length/3)
    for(let i = 1; i <= limit; i++) {
        stacksMap.set(i, new Array())
    }
}

function populateStacksMapWithCrates(line){
    var count = 1
    for(let i = 0; i <=line.length; i=i+4) {
        var second = i+1
        var third = i+2
        const crate = line.charAt(i) + line.charAt(second) + line.charAt(third) 
        if(crate.includes("[")){
            stacksMap.get(count).push(crate)
        }
        count++
    }
}

function move(numberOfCratesToBeMoved, indexOfStackToHaveCratesRemoved,  indexOfStackToHaveCratesAdded){
    const stackToHaveCratesRemoved = stacksMap.get(indexOfStackToHaveCratesRemoved)
    const stackToHaveCratesAdded = stacksMap.get(indexOfStackToHaveCratesAdded)
    var tempCrate = []
    for(let i =0; i <numberOfCratesToBeMoved; i++){
        const crate =  stackToHaveCratesRemoved.shift()
        tempCrate.push(crate)
    }    
    tempCrate.reverse().forEach(z => stackToHaveCratesAdded.unshift(z))
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
const fs = require('fs')
const { default: test } = require('node:test')
const readline = require('readline')
const fileName = 'input.txt'
let monkies = new Map()
let globaltestWeights = 1

function round(){
    for(const [label, monkey] of monkies){

        let items = []
        monkey.startingItems.forEach((element, index) => {
            items[index] = element
        })

        let testWeight = parseInt(monkey.testWeight)
        let trueMonkey = parseInt(monkey.trueThrowMonkey)
        let falseMonkey = parseInt(monkey.falseThrowMonkey)
        let TM = monkies.get(trueMonkey)
        let FM = monkies.get(falseMonkey)

        items.forEach((element, index) => {
            monkey.inspectionCount = monkey.inspectionCount +1
            let output = 0
            if(monkey.operationWeight.includes("old")){
                if(monkey.operationFunction.trim() == "+"){
                    output =  parseInt(element) + parseInt(element)
                }else{
                    output =  parseInt(element) * parseInt(element) 
                }
            }else{
                let weight = parseInt(monkey.operationWeight)
                if(monkey.operationFunction.trim() == "+"){
                    output =  parseInt(element) + parseInt(weight)
                }else{
                    output =  parseInt(element) * parseInt(weight) 
                }
            }
            //bored
            output = output%globaltestWeights
            //throw
            if(output%testWeight == 0){
                TM.startingItems.push(output)
            }else{
                FM.startingItems.push(output)
            }
        })
        monkey.startingItems = []
    }
}

async function readAndProcessInput() {
    const fileStream = fs.createReadStream(fileName)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    let row = -1 
    let label = 0
    let startingItems = ""
    let operationFunction = ""
    let operationWeight = 0
    let testWeight = 0
    let trueThrowMonkey = 0
    let falseThrowMonkey = 0
    for await (let line of rl) {
        row++
        if(row%7==0){ 
            startingItems = []
            operationFunction = ""
            operationWeight = 0
            testWeight = 0
            trueThrowMonkey = 0
            falseThrowMonkey = 0
        }

        if(row%7==1){
            line.replaceAll("  Starting items: ","").split(",").forEach(
                (element) => {
                    startingItems.push(parseInt(element.trim()))
                }
            )
        }

        if(row%7==2){
            const operation = line.replaceAll("  Operation: new = old ","")
            operationFunction = operation.split(" ")[0]
            operationWeight =operation.split(" ")[1]
        }

        if(row%7==3){
            testWeight = parseInt(line.replaceAll("  Test: divisible by ",""))
        }

        if(row%7==4){
            trueThrowMonkey = parseInt(line.replaceAll("    If true: throw to monkey ",""))
        }

        if(row%7==5){
            falseThrowMonkey = parseInt(line.replaceAll("    If false: throw to monkey ",""))
        }

        if(row%7==6){
            const monkey = {
                startingItems:startingItems, 
                operationFunction:operationFunction,
                operationWeight:operationWeight, 
                testWeight:testWeight, 
                trueThrowMonkey:trueThrowMonkey, 
                falseThrowMonkey:falseThrowMonkey,
                inspectionCount: 0
            }
            monkies.set(label, monkey)
            label++
        }
  }
}

async function getResult() {
    await readAndProcessInput()

    for(const [ket,value] of monkies){
        globaltestWeights = globaltestWeights * value.testWeight
    }

    let level =1
    while(level <= 10000){
        round()
        if(level ==1 || level ==20 || level%1000 ==0){
            console.log(`===========================LEVEL ${level}===================================================`)
            console.log(`globaltestWeights: ${globaltestWeights}`)
            let inspectionCount = []
            for(const [key, value] of monkies){
                console.log(`Monkey ${key} inspected items ${value.inspectionCount} times.`)
                inspectionCount.push(value.inspectionCount)
            }
            inspectionCount.sort(function(a, b){return b - a})
            const answer = inspectionCount[0]*inspectionCount[1]
            console.log(`answer: ${answer}`)
        }
        level++
    }

}
   
getResult()
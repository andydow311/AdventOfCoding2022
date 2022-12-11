const fs = require('fs')
const readline = require('readline')
const fileName = 'input.txt'
let monkies = new Map()

function printMonkey(monkey){
    console.log(`startingItems: ${monkey.startingItems}`)
    console.log(`operationFunction: ${monkey.operationFunction}`)
    console.log(`operationWeight: ${monkey.operationWeight}`)
    console.log(`testWeight: ${monkey.testWeight}`)
    console.log(`trueThrowMonkey: ${monkey.trueThrowMonkey}`)
    console.log(`falseThrowMonkey: ${monkey.falseThrowMonkey}`)
}

function round(){
    for(const [label, monkey] of monkies){
        console.log(`Monkey: ${label}`)
        console.log(`items: ${monkey.startingItems}`)

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
            console.log(`Monkey inspects an item with a worry level of ${element}`)
            monkey.inspectionCount = monkey.inspectionCount +1
            let output = 0
            if(monkey.operationWeight.includes("old")){
                if(monkey.operationFunction.trim() == "+"){
                    output =  parseInt(element) + parseInt(element)
                    console.log(`Worry level is added by ${element} to ${output}.`)
                }else{
                    output =  parseInt(element) * parseInt(element) 
                    console.log(`Worry level is multiply ${element} to ${output}.`)
                }
            }else{
                let weight = parseInt(monkey.operationWeight)
                if(monkey.operationFunction.trim() == "+"){
                    output =  parseInt(element) + parseInt(weight)
                    console.log(`Worry level is added by ${weight} to ${output}.`)
                }else{
                    output =  parseInt(element) * parseInt(weight) 
                    console.log(`Worry level is multiply ${weight} to ${output}.`)
                }
            }
            //bored
            output = Math.floor(output/3)
            console.log(`Monkey gets bored with item. Worry level is divided by 3 to ${output}.`)
            //throw
            if(output%testWeight == 0){
                console.log(`Current worry level is divisible by ${testWeight}.`)
                console.log(`Item with worry level ${output} is thrown to monkey ${trueMonkey}.`)
                TM.startingItems.push(output)
            }else{
                console.log(`Current worry level is not divisible by ${testWeight}.`)
                console.log(`Item with worry level ${output} is thrown to monkey ${falseMonkey}.`)
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
            console.log(`label: ${label}`)
            printMonkey(monkey)
            monkies.set(label, monkey)
            label++
        }
  }
}

async function getResult() {
    await readAndProcessInput()

    let level =20
    while(level > 0){
        round()
        level--
    }
 
    let inspectionCount = []
    for(const [key, value] of monkies){
        inspectionCount.push(parseInt(value.inspectionCount))
    }
    inspectionCount.sort(function(a, b){return b - a})
    const answer = inspectionCount[0]*inspectionCount[1]
    console.log(`answer: ${answer}`)

}
   
getResult()
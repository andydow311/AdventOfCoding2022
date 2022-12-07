const fs = require('fs')

const priority = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let output = 0

const commonCharacterPriority = (fistCompartment, secondCompartment, thirdCompartment) => {
  for(let i in thirdCompartment) {
    let element = thirdCompartment[i]
    if(fistCompartment.includes(element) && secondCompartment.includes(element)){
        return priority.indexOf(element) + 1
    }
}
return 0
}

const parseData = (data) => {
  const lines = data.toString().split("\n")
  for (let i = 0; i < lines.length; ++i) {
    const fistCompartment = lines[i];
    const secondCompartment = lines[i+1];
    const thirdCompartment  = lines[i+2];
    output = output + parseInt(commonCharacterPriority(fistCompartment, secondCompartment,thirdCompartment))
    i = i+2;
  }
}

const solve = (err, data) => {
  parseData(data)
  console.log(`output is ${output}`)
}

fs.readFile("input.txt", solve)
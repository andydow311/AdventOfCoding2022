const fs = require("fs")
let maxScenicScore = 0

const lookLeft = (index, treeHeight, line) => {
    let scenicscore = 0
    if(index ==0 || index == line.length-1){
        return scenicscore
    }
 
    for(let level=index; level >0; level--) {
        const secondTreeHeight = parseInt(line[level-1])
        scenicscore++
        if(secondTreeHeight >= treeHeight){
            return scenicscore
        }
    }
    return scenicscore
  }

  const lookRight = (index, treeHeight, line) => {
    let scenicscore = 0
    if(index ==0 || index == line.length-1){
        return scenicscore
    }
    for(let level=index; level<line.length-1; level++) {
        const secondTreeHeight = parseInt(line[level+1])
        scenicscore++
        if(secondTreeHeight >= treeHeight){
            return scenicscore
        }
    }
    return scenicscore
  }

const lookUp = (index, treeHeight, line, lines, level) => {
    let scenicscore = 0
    if(index ==0 || index == line.length-1){
        return scenicscore
    }
     while(level > 0){
        level--
        const lineAbove = lines[level]
        const secondTreeHeight = parseInt(lineAbove[index])
        scenicscore++
        if(secondTreeHeight >= treeHeight){
            return scenicscore;
        }
    }
    return scenicscore
}

const lookDown = (index, treeHeight, line, lines, level) => {
    let scenicscore = 0
    if(index ==0 || index == line.length-1){
        return scenicscore
    }
     while(level < lines.length-1){
        level++
        const lineBelow = lines[level]
        const secondTreeHeight = parseInt(lineBelow[index])
        scenicscore++
        if(secondTreeHeight >= treeHeight){
            return scenicscore;
        }
    }
    return scenicscore
}

const score = (left, right, up, down) => {
    return left*right*up*down
}

const parseData = (data) => {
    const lines = data.toString().split("\n")
    for (let level = 1; level < lines.length-1; ++level) {
      const line = lines[level]
        for(index=0; index< line.length; index++){
            const treeHeight = parseInt(line[index])    
            const scenicScore = score(lookLeft(index, treeHeight, line), lookRight(index, treeHeight, line),
                lookUp(index, treeHeight, line, lines, level), lookDown(index, treeHeight, line, lines, level))
            if(maxScenicScore < scenicScore){
                maxScenicScore = scenicScore
            }
        } 
    }
}
  
const solve = (err, data) => {
    parseData(data)
    console.log(`maxScenicScore is ${maxScenicScore}`)
}
  
fs.readFile("input.txt", solve)
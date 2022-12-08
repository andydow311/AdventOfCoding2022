const fs = require("fs")
let maxScenicScore = 0

const lookLeft = (index, treeHeight, line) => {
    let scenicscore = 0
    if(index ==0 || index == line.length-1){
        return scenicscore
    }
 
    for(let i=index; i >0; i--) {
        const secondTreeHeight = parseInt(line[i-1])
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
    for(let i=index; i<line.length-1; i++) {
        const secondTreeHeight = parseInt(line[i+1])
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

const parseData = (data) => {
    const lines = data.toString().split("\n")
    for (let i = 1; i < lines.length-1; ++i) {
      const line = lines[i]
        for(j=0; j< line.length; j++){
            const treeHeight = parseInt(line[j])    
            const leftScore = lookLeft(j, treeHeight, line)
            const rightScore =lookRight(j, treeHeight, line)
            const downScore =lookDown(j, treeHeight, line, lines, i)
            const upScore = lookUp(j, treeHeight, line, lines, i)
            const scenicScore = leftScore*rightScore*downScore*upScore
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
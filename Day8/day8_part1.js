const fs = require("fs")
let numberOfVisibleTrees = 0
let numberOfInVisibleTrees = 0

const lookLeft = (index, treeHeight, line) => {
    if(index ==0 || index == line.length-1){
        return true
    }
 
    for(let i=index; i >0; i--) {
        const secondTreeHeight = parseInt(line[i-1])
        if(secondTreeHeight >= treeHeight){
            return false
        }
    }
    return true
  }


  const lookRight = (index, treeHeight, line) => {
    for(let i=index; i<line.length-1; i++) {
        const secondTreeHeight = parseInt(line[i+1])
        if(secondTreeHeight >= treeHeight){
            return false
        }
    }
    return true
  }

const lookUp = (index, treeHeight, line, lines, level) => {
     while(level > 0){
        level--
        const lineAbove = lines[level]
        const secondTreeHeight = parseInt(lineAbove[index])
        if(secondTreeHeight >= treeHeight){
            return false;
        }
    }
    return true
}

const lookDown = (index, treeHeight, line, lines, level) => {
     while(level < lines.length-1){
        level++
        const lineBelow = lines[level]
        const secondTreeHeight = parseInt(lineBelow[index])
        if(secondTreeHeight >= treeHeight){
            return false;
        }
    }
    return true
}

const parseData = (data) => {
    const lines = data.toString().split("\n")
    for (let row = 0; row < lines.length; ++row) {
      const line = lines[row]
      if(row==0 || row == lines.length- 1){
          numberOfVisibleTrees = numberOfVisibleTrees + line.length
      }else{
        for(index=0; j< line.length; j++){
            const treeHeight = parseInt(line[j])    
            const visibility = lookLeft(j, treeHeight, line) ||  lookRight(j, treeHeight, line) || lookDown(j, treeHeight, line, lines, row) || lookUp(j, treeHeight, line, lines, row)
            visibility ? numberOfVisibleTrees++ : numberOfInVisibleTrees++
        }
    }
  }
}
  
  const solve = (err, data) => {
      parseData(data)
      console.log(`numberOfVisibleTrees is ${numberOfVisibleTrees}`)
  }
  
  fs.readFile("input.txt", solve)
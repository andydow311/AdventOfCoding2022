const fs = require("fs")
let numberOfVisibleTrees = 0

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
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i]
      if(i==0 || i == lines.length- 1){
          numberOfVisibleTrees = numberOfVisibleTrees + line.length
      }else{
        for(j=0; j< line.length; j++){
            const treeHeight = parseInt(line[j])    
            if(lookLeft(j, treeHeight, line)){
                numberOfVisibleTrees++
                continue
           }else{ 
                if(lookRight(j, treeHeight, line)){
                    numberOfVisibleTrees++
                    continue
                }else{
                    if(lookDown(j, treeHeight, line, lines, i)){
                        numberOfVisibleTrees++
                        continue
                    }else{
                        if(lookUp(j, treeHeight, line, lines, i)){
                            numberOfVisibleTrees++
                            continue
                        }
                    }
                }
            } 
        }
      }
    }
  }
  
  const solve = (err, data) => {
      parseData(data)
      console.log(`numberOfVisibleTrees is ${numberOfVisibleTrees}`)
  }
  
  fs.readFile("input.txt", solve)
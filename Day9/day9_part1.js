const fs = require("fs")
let headRow = 200000
let headCol = 200000
let tailRow = 200000
let tailCol = 200000
let tailPositions = []

const updatePositions = (tailRow, tailCol) => {
    let str = ''
    str+=tailRow
    str+=tailCol
    if(!tailPositions.includes(str)){
        tailPositions.push(str)
    }
}
const moveRight = (number) => {
    for(let i=0; i<number; i++){
        headCol++
        if(headCol - tailCol >1){
            //same row
           if(headRow == tailRow){
                    tailCol++
                    updatePositions(tailRow, tailCol)
                
            }else{
                //head is above
                if(headRow > tailRow){
                    tailCol++
                    tailRow++
                    updatePositions(tailRow, tailCol)
                }else{
                    //head is below
                    tailCol++
                    tailRow--
                    updatePositions(tailRow, tailCol)
                }
            }
            console.log("MOVE")
            console.log(`head is [${headRow}, ${headCol}]`)
            console.log(`tail is [${tailRow}, ${tailCol}]`)
        }else{
            console.log("MOVE")
            console.log(`head is [${headRow}, ${headCol}]`)
            console.log(`tail is [${tailRow}, ${tailCol}]`)
        }
    }
}


const moveLeft = (number) => {
    for(let i=number; i>=1; i--){
        headCol--
        if(tailCol - headCol >1){
            //same row
           if(headRow == tailRow){
                tailCol--
                updatePositions(tailRow, tailCol)
            }else{
                //head is above
                if(headRow > tailRow){
                    tailCol--
                    tailRow++
                    updatePositions(tailRow, tailCol)
                }else{
                    tailCol--
                    tailRow--
                    updatePositions(tailRow, tailCol)
                }
                console.log("MOVE")
                console.log(`head is [${headRow}, ${headCol}]`)
                console.log(`tail is [${tailRow}, ${tailCol}]`)
            }
        }else{
            console.log("MOVE")
            console.log(`head is [${headRow}, ${headCol}]`)
            console.log(`tail is [${tailRow}, ${tailCol}]`)
        }
    }
}

const moveUp = (number) => {
    for(let i=0; i<number; i++){
        headRow++
        if(headRow - tailRow >1){
            //same col
            if(headCol == tailCol){
                tailRow++
                updatePositions(tailRow, tailCol)              
        }else{
            //head is to the right of tail
            if(headCol > tailCol){
                tailCol++
                tailRow++
                updatePositions(tailRow, tailCol)
            }else{
                //head is to the left of tail
                tailCol--
                tailRow++
                updatePositions(tailRow, tailCol)
            }
        }
        console.log("MOVE")
        console.log(`head is [${headRow}, ${headCol}]`)
        console.log(`tail is [${tailRow}, ${tailCol}]`)
    }else{
        console.log("MOVE")
        console.log(`head is [${headRow}, ${headCol}]`)
        console.log(`tail is [${tailRow}, ${tailCol}]`)
    }
    }
}


const moveDown = (number) => {
    for(let i=number; i>=1; i--){
        headRow--
        if(tailRow - headRow >1){
            //same col
           if(headCol == tailCol){
                tailRow--
                updatePositions(tailRow, tailCol)
            }else{
                //head is to the right of tail
                if(headCol > tailCol){
                    tailCol++
                    tailRow--
                    updatePositions(tailRow, tailCol)
                }else{
                    tailCol--
                    tailRow--
                    updatePositions(tailRow, tailCol)
                }
            }
            console.log("MOVE")
            console.log(`head is [${headRow}, ${headCol}]`)
            console.log(`tail is [${tailRow}, ${tailCol}]`)
        }else{
            console.log("MOVE")
            console.log(`head is [${headRow}, ${headCol}]`)
            console.log(`tail is [${tailRow}, ${tailCol}]`)
        }
    }
}

const parseData = (data) => {
    const lines = data.toString().split("\n")
    for (let row = 0; row < lines.length; ++row) {
      const line = lines[row].trim()
      console.log("-------------"); 
      console.log(`line is ${line}`)
      const direction = line.trim().split(" ")[0]
      console.log(`direction is ${direction}`)
      const number = parseInt(line.trim().split(" ")[1])
      console.log(`number is ${number}`)
      if(direction == 'R'){
        moveRight(number)
      }else{
        if(direction == 'L'){
            moveLeft(number)
          }else{
            if(direction == 'U'){
                moveUp(number) 
              }else{
                if(direction == 'D'){
                    moveDown(number)
                  }
              }
          }
      }
      console.log("-------------")
  }
}
  
const solve = (err, data) => {
      updatePositions(tailRow, tailCol)
      parseData(data)
      console.log("answer = " + tailPositions.length);
  }
  
  fs.readFile("input.txt", solve)
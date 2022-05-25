'use strict'

const MINE = '💥'

console.log('hi minesweeper')
var gBoard = buildBoard(4)
// gBoard[2][3].isShown = true
gBoard[2][3].isMine = true
// gBoard[2][2].isShown = true
// gBoard[2][2].isMine = true

// gBoard[0][2].isShown = true
gBoard[0][2].isMine = true
var gMinesAround = setMinesNegsCount(gBoard)
console.log(gBoard)
renderBoard(gBoard)
console.table(gBoard)



function cellClicked(elCell, locationI, locationJ) {
    // console.log('elCell, locationI, locationJ:',elCell, locationI, locationJ)
    var currCell = gBoard[locationI][locationJ]
    currCell.isShown = true
   
    if (currCell.isMine) gameOver()
    console.log(currCell)
    renderBoard(gBoard)

}




function gameOver(){
    console.log('game over')

}



function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    }
    return board
}

function renderBoard(board) {
    var txtHtml = '<table border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {
        txtHtml += '\n<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]

            // handle shoing cell:

            if (cell.isShown && cell.isMine) var inCell = MINE
            else if (cell.isShown) inCell = gMinesAround[`${i}-${j}`]
            else  inCell = ''
            // console.log('inCell: ', inCell)
            var className = `cell cell- ${i}-${j}`
            txtHtml += `\n\t<td onclick="cellClicked(self,${i},${j})"class="${className}"> ${inCell}</td>`
        }
        txtHtml += '\n</tr>'
    }
    txtHtml += '\n</tbody></table>'
    console.log('txtHtml: \n', txtHtml)

    var elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = txtHtml
}

function setMinesNegsCount(board) {

    var MinesAround = {}
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            

            var counter = 0
            if (i > 0 && j > 1) if (board[i - 1][j - 1].isMine) counter++
            if (i > 0) if (board[i - 1][j].isMine) counter++
            if (i > 0 && j < board.length - 1) if (board[i - 1][j + 1].isMine) counter++
            if (j > 0) if (board[i][j - 1].isMine) counter++

            if (j < board.length - 1) if (board[i][j + 1].isMine) counter++
            if (j > 0 && i < board.length - 1) if (board[i + 1][j - 1].isMine) counter++
            if (i < board.length - 1) if (board[i + 1][j].isMine) counter++
            if (j > 0 && i < board.length - 1) if (board[i + 1][j - 1].isMine) counter++

            MinesAround[`${i}-${j}`] = counter
        }
    }
    console.log(MinesAround)
    return MinesAround
}



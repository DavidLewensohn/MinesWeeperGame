'use strict'

const MINE = '💥'
const FLAG = '🚩'

var gBoard
var gLevel = { SIZE: 8, MINES: 12, }
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

startGame()

function startGame() {
    gGame.isOn === false
    console.log('hi minesweeper')
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
    console.log(gBoard)

}


function randMinesPlace(firstclickI, firstclickj) {
    console.log('hi____ randMinesPlace')

    for (var i = 0; i < gLevel.MINES; i++) {

        var x = getRandomInt(0, gLevel.SIZE)
        var y = getRandomInt(0, gLevel.SIZE)

        // valid that first click not a mine
        if (x === firstclickI && y === firstclickj) {
            i--
            continue
        }

        // valid that random cell not in the same 
        if (gBoard[x][y].isMine === true) {
            i--
            continue
        }
        gBoard[x][y].isMine = true
        // console.log('mine location:',x, y)

        // console.log('gBoard[firstclickI][firstclickJ].isMine:', gBoard[firstclickI][firstclickj].isMine);

    }

}

function buildBoard(size) {
    console.log('hi____ buildBoard')

    var board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    }
    return board
}

function renderBoard(board) {
    console.log('hi____ renderBoard')


    var txtHtml = '<table border="0"><tbody>'

    for (var i = 0; i < board.length; i++) {
        txtHtml += '\n<tr>'
        for (var j = 0; j < board[0].length; j++) {

            var cell = board[i][j]
            var inCell


            if (cell.isShown && cell.isMine) inCell = MINE
            else if (cell.isShown) inCell = gBoard[i][j].minesAroundCount
            else if (cell.isMarked) inCell = FLAG
            else inCell = ''


            // console.log('inCell: ', inCell)
            var className = `cell cell- ${i}-${j}`
            txtHtml += `\n\t<td onclick="cellClicked(${i},${j})" oncontextmenu="event.preventDefault();" class="${className}"> ${inCell}</td>`
        }
        txtHtml += '\n</tr>'
    }
    txtHtml += '\n</tbody></table>'
    // console.log('txtHtml: \n', txtHtml)

    var elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = txtHtml

    addEvent() // for next right click
}

function setMinesNegsCount(board) {
    console.log('hi____setMinesNegsCount')


    for (var i = 0; i < board.length; i++) { //i = 0
        for (var j = 0; j < board.length; j++) {  // j=0

            var minesCount = 0
            for (var x = i - 1; x <= i + 1; x++) { // x=-1
                if (x < 0 || x >= board.length) continue
                for (var y = j - 1; y <= j + 1; y++) {
                    if (x === i && y === j) continue
                    if (y < 0 || y >= board.length) continue
                    if (gBoard[x][y].isMine) minesCount++
                }
            }
            // console.log('setMinesNegsCount', i, j, minesCount)
            board[i][j].minesAroundCount = minesCount
        }
    }
}

function cellClicked(locationI, locationJ) {
    console.log('hi____cellClicked')

    // console.log('cellClicked', locationI, locationJ)

    var currCell = gBoard[locationI][locationJ]
    currCell.isShown = true

    if (currCell.isMine) gameOver()
    checkWin()
    renderBoard(gBoard)
    

}

function rightClickCell(event) {
    console.log('hi___rightClickCell()')

    var txt = String(event['target'].className)
    var locationI = +txt.split('-')[1]
    var locationJ = +txt.split('-')[2]

    if (!gGame.isOn) {    // start timer in first click
        gGame.isOn = true
        startTimer()
        randMinesPlace(locationI, locationJ)
        setMinesNegsCount(gBoard)
    }

    console.log('gBoard[locatioI][locatioJ].isMarked===true: ', gBoard[locationI][locationJ].isMarked === true)
    console.log('gGame.isOn===true: ', gGame.isOn === true)


    
    console.log((event.button))
    if (event.button === 0) {
        console.log('Left button clicked.')
    }

    if (event.button === 2) {
        console.log('right button clicked.')
        gBoard[locationI][locationJ].isMarked = !gBoard[locationI][locationJ].isMarked
        console.log(gBoard[locationI][locationJ].isMarked === true)
        renderBoard(gBoard)

    }
    

    

}

function addEvent(){
    var gElCell = document.querySelectorAll('.cell')

    for (var i = 0; i < gElCell.length; i++) {
        gElCell[i].addEventListener('mouseup', rightClickCell)

    }
}


function checkWin() {
    console.log('hi____checkWin()')
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {

            // if( gBoard[i][j]) console.log((gBoard[i][j]))
        }
    }
}

function gameOver() {
    console.log('game over')
    stopTimer()

    // pop all mines
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) gBoard[i][j].isShown = true
        }
    }
}




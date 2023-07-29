import './style.css'

const board = document.querySelector('#root')
const sound = document.getElementById("sound");
const playerTag = document.querySelector("#playerTag")

let pieces = [
  ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br",],
  ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp",],
  ["", "", "", "", "", "", "", "",],
  ["", "", "", "", "", "", "", "",],
  ["", "", "", "", "", "", "", "",],
  ["", "", "", "", "", "", "", "",],
  ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp",],
  ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"]
]

let values = [
  { 'pawn': 10 },
  { 'bishop': 30 },
  { 'knight': 30 },
  { 'rook': 50 },
  { 'queen': 90 },
  { 'king': null }
]

let pieceNames = [
  'pawn',
  'bishop',
  'knight',
  'rook',
  'queen',
  'king'
]

var currentPlayer = "white"

function drawBoard() {

  for (let i = 0; i < 8; i++) {
    const row = document.createElement("div")
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div")
      if ((i + j) % 2 === 0) {
        square.style.backgroundColor = "#ffe9c5"
      }
      else {
        square.style.backgroundColor = "#d89d61"
      }
      //square.classList.add(`s${[i] + [j]}`)
      square.setAttribute('id', `s${[i] + [j]}`);

      square.classList.add('square')
      square.style.width = "50px"
      square.style.height = "50px"


      row.appendChild(square)

      row.classList.add("row")
    }
    board.append(row)

  }

}


drawBoard()

function arrangeBoard() {
  //board = new Board()
  let a = 0
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.querySelector(`#s${[i] + [j]}`)
      if (pieces[i][j] !== "") {
        square.innerHTML = `<img id='p${[i] + [j]}' src='/images/${(pieces[i][j]).toString()}.svg'/>`
        // if ([i] + [j] > 59) {
        //     piece = new Piece("white", ([i] + [j]))
        // }
        // else {
        //     piece = new Piece("black", ([i] + [j]))
        // }
      }

      square.firstChild?.classList.add([i] + [j] > 59 ? "white" : "black")
      //console.log(piece)
      square.firstChild?.setAttribute('draggable', true)
      square.setAttribute("rank", a)
      a++
    }
  }
}

arrangeBoard()

function changeIdwithRank() {
  let a = 0
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.querySelector(`#s${[i] + [j]}`)
      square.setAttribute("id", a)
      //square.append(`${a}`)
      a++
    }
  }
}

function changePlayer() {
  if (currentPlayer === "white") {
    currentPlayer = "black"
    playerTag.innerHTML = "Black"
  }
  else {
    currentPlayer = "white"
    playerTag.innerHTML = "White"
  }
}

//drag and drop

const squares = document.querySelectorAll(".square")
const images = document.querySelectorAll("img")
let draggedPiece

squares.forEach(square => {
  square.firstChild?.addEventListener('dragstart', (e) => {
    draggedPiece = e.target
  })

})

squares.forEach(square => {
  square.addEventListener('dragover', (e) => {
    e.preventDefault()
  })

})

squares.forEach(square => {
  square.addEventListener('drop', (e) => {
    sound.play()
    e.target.appendChild(draggedPiece)
    changePlayer()

  })

})

images.forEach(square => {
  square.addEventListener('drop', (e) => {
    e.stopPropagation()
    // if (e.target.classList.firstChild == draggedPiece.classList.firstChild) {
    //     console.log(e.target, draggedPiece)
    // }
    if (e.target === draggedPiece) {
      return
    }

    sound.play()
    e.target.parentNode.appendChild(draggedPiece)
    e.target.remove()
    changePlayer()
  })

})


// Chess Piece Move Logic

function getMoves(id) {

}

changeIdwithRank()

let offsetMatrix = [
  [-9, -8, -7],
  [-1, 0, 1],
  [7, 8, 9]
]

function detectEdge(square) {

}

function getMovesRecursively(square) {
  if (square.classList.contains("edge")) {
    return
  }

  getMovesRecursively(square)
}

function getPawnMoves(pawn) {
  // +16 or +8
  let currentPieceLocation = pawn.parentNode.getAttribute("rank")
  let possibleLocation = Number(currentPieceLocation) - 8
  console.log(possibleLocation)
  document.getElementById(possibleLocation).style.backgroundColor = "red"

}

function getRookMoves(rook) {
  // +16 or +8

  let currentPieceLocation = rook.parentNode.getAttribute("rank")
  let possibleLocation = [
    getRookMoves(document.querySelector(Number(currentPieceLocation) - 8)),
    Number(currentPieceLocation) - 1,
    Number(currentPieceLocation) + 8,
    Number(currentPieceLocation) + 1,

  ]
  console.log(possibleLocation)
  for (let i = 0; i < possibleLocation.length; i++) {
    document.getElementById(possibleLocation[i]).style.backgroundColor = "red"
  }

}

function getBishopMoves(bishop) {
  // +16 or +8
  let currentPieceLocation = bishop.parentNode.getAttribute("rank")
  let possibleLocation = [
    Number(currentPieceLocation) - 9,
    Number(currentPieceLocation) - 7,
    Number(currentPieceLocation) + 7,
    Number(currentPieceLocation) + 9,

  ]
  console.log(possibleLocation)
  for (let i = 0; i < possibleLocation.length; i++) {
    document.getElementById(possibleLocation[i]).style.backgroundColor = "red"
  }

}

function getQueenMoves(queen) {
  // +16 or +8
  let currentPieceLocation = queen.parentNode.getAttribute("rank")
  let possibleLocation = [
    Number(currentPieceLocation) - 8,
    Number(currentPieceLocation) - 1,
    Number(currentPieceLocation) + 8,
    Number(currentPieceLocation) + 1,
    Number(currentPieceLocation) - 9,
    Number(currentPieceLocation) - 7,
    Number(currentPieceLocation) + 7,
    Number(currentPieceLocation) + 9,

  ]
  console.log(possibleLocation)
  for (let i = 0; i < possibleLocation.length; i++) {
    let elem = document.getElementById(possibleLocation[i]) || null
    if (elem !== null) elem.style.backgroundColor = "red"

  }

}



getRookMoves(document.getElementById('p12'))
//getBishopMoves(document.getElementById('p12'))
//getQueenMoves(document.getElementById('p73'))
//getPawnMoves(document.getElementById("60"))


function reverseRowRankids() {
  let allRowElements = Array(document.querySelectorAll('.row div'))
  let allRowElementsRanks = []
  for (let i = 0; i < allRowElements.length; i++) {
    allRowElementsRanks[i] = allRowElements[i].id
  }
  allRowElementsRanks = allRowElementsRanks.reverse()
  for (let i = 0; i < allRowElements.length; i++) {
    allRowElements[i].id = 1
  }

}
// document.querySelectorAll('.row .square').id = '1'
// reverseRowRankids()

function completeReverseOfIds(div) {
  let allRowElements = Array(document.querySelectorAll('.row div'))

  for (let i = 0; i < allRowElements.length; i++) {
    allRowElements[i].id = 63 - allRowElements[i].id
  }
}

function reverseAllIds() {
  let allRowsToChange = Array(document.querySelectorAll('.row'))
  for (let i = 0; i < allRowsToChange.length; i++) {
    reverseRowRankids(allRowsToChange[i])
  }

  for (let i = 0; i < allRowsToChange.length; i++) {
    completeReverseOfIds(allRowsToChange[i])
  }
}

//reverseAllIds()

//Old drag and drop logic

function prevBoard() {
  squares.forEach((elem) => {

    let firstPiece = elem.addEventListener('dragstart', () => {
      let pieceInfo = elem.innerHTML

      // while (!squares.onclick) {
      //     elem.innerHTML = pieceInfo

      // }

      if (pieceInfo) {
        squares.forEach((element) => {
          element.addEventListener('dragover', (e) => {
            e.preventDefault()
            element.innerHTML = pieceInfo
            //elem.innerHTML = ""
          })
        })
      }
      return false

    })
  })
}

const DOMHelpers = (() => {
  let $message = document.getElementById('game-message')

  function render(positions) {
    positions.forEach((piece, index) => {
      document.getElementById(`cell-${index}`).innerHTML = piece
    })
  }

  function setMessage(msg) {
    $message.innerHTML = msg
  }

  return { render, setMessage }
})()

const GamePlay = (() => {
  let player1, player2
  let currentPlayer
  let isPlaying = false
  let board, showMessage

  function init({ board, showMessage}) {
    setBoard(board)
    setShowMessage(showMessage)
    const { playerOneName, playerTwoName } = getPlayersNames()
    player1 = Player(playerOneName, 'O')
    player2 = Player(playerTwoName, 'X')
    currentPlayer = player1
    showMessage(`${playerOneName}'s Turn`)
    isPlaying = true
  }

  function setBoard (boardInstance) {
    board = boardInstance
  }

  function setShowMessage (messageFunction) {
    showMessage = messageFunction
  }

  function getPlayersNames() {
    let playerOneName, playerTwoName

    while (playerOneName == null || playerOneName == "") {
      playerOneName = prompt("Enter player 1's name ", 'Player 1')
    }
    while (playerTwoName == null || playerTwoName == "") {
      playerTwoName = prompt("Enter player 2's name ", 'Player 2')
    }

    return { playerOneName, playerTwoName }
  }

  function play(index) {
    if (board.isPositionOcupied(index) || !isPlaying) return
    currentPlayer.makeMove(index)
    board.markPosition(index, currentPlayer.piece)
    const { win, tie } = checkGame(currentPlayer.piece)
    if (win || tie) {
      const msg = win ? `${currentPlayer.name} Won!!!` : `It's a Tie`
      showMessage(msg)
      isPlaying = false
    } else {
      togglePlayer()
    }
  }

  function checkGame () {
    const win = board.movesInWinningMoves(currentPlayer.moves)
    const tie = board.isFull()
    return { win, tie }
  }



  function togglePlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1
    showMessage(`${currentPlayer.name}'s turn`)
  }

  return { init, currentPlayer, togglePlayer, play }
})()

const Player = (name, piece) => {
  let moves = []

  function makeMove(index){
    moves.push(index)
  }

  return{
    name, piece, makeMove, moves
  }
}

const makeBoard = (render) => {

  let positions = ['-', '-', '-', '-', '-', '-', '-', '-', '-']

  let winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  function markPosition(index, piece) {
    positions[index] = piece
    render(positions)
  }

  function isFull(){
    return positions.every(p => p !== '-')
  }

  function movesInWinningMoves (moves){
    return winningMoves.some(group => group.every(item =>  moves.includes(item)))
  }


  function getPositions () {
    return positions
  }

  const isPositionOcupied = index => positions[index] != '-'

  render(positions)

  return { render, markPosition,
    isPositionOcupied, getPositions,
    isFull, movesInWinningMoves
  }
}

function startGame () {
  GamePlay.init({
    board: makeBoard(DOMHelpers.render),
    showMessage: DOMHelpers.setMessage
  })
}

startGame()


const GameBoard = (() => {
  positions = ['-', '-', '-', '-', '-', '-', '-', '-', '-']

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

  function render() {
    positions.forEach((piece, index) => {
      document.getElementById(`cell-${index}`).innerHTML = piece
    })
  }

  function reset() {
    positions = positions.map(pos => '-')
    render()
  }

  function markPosition(index, piece) {
    positions[index] = piece
    render()
  }

  function isFull(){
    positions.every((p) => ( p != '-' ))
  }

  function isEmptyPosition(index){
    positions[index] === '-'
  }

  function movesInWinningMoves(moves){
    winningMoves.some(group => group.every(item =>  moves.includes(item) ))
  }


  function getPositions () {
    return positions
  }

  const isPositionOcupied = index => positions[index] != '-'

  return { reset, markPosition, 
    isPositionOcupied, getPositions, 
    isFull, isEmptyPosition, movesInWinningMoves 
  }
})()


const GamePlay = (() => {
  let player1, player2
  let currentPlayer
  let $message = document.getElementById('game-message')
  let state = 'pause'

  function init() {
    GameBoard.reset()
    const { playerOneName, playerTwoName } = getPlayersNames()
    player1 = Player(playerOneName, 'O')
    player2 = Player(playerTwoName, 'X')
    currentPlayer = player1
    setMessage(`${playerOneName}'s Turn`)
    state = 'playing'
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

  function isInvalidMove(index) {
    return Boolean(GameBoard.isPositionOcupied(index) || state != 'playing')
  }

  function play(index) {
    if (isInvalidMove(index)) return
    GameBoard.markPosition(index, currentPlayer.piece)
    const { win, tie } = checkGame(currentPlayer.piece)
    if (win || tie) {
      const msg = win ? `${currentPlayer.name} Won!!!` : `It's a Tie`
      setMessage(msg)
      state = 'End'
    } else {
      togglePlayer()
    }
  }

  function checkGame (piece) {
    const win = isWin(piece)
    const tie = isTie()
    return { win, tie }
  }

  function isWin(piece) {
    const positions = GameBoard.getPositions()
    const boardMatrix = helpers.splitInChunks(positions, 3)
    const transposedMatrix = helpers.transpose(boardMatrix)
    return (
      boardMatrix.some(row => row.every(value => value === piece)) ||
      transposedMatrix.some(row => row.every(value => value === piece)) ||
      boardMatrix.map((row, i) => row[i]).every(value => value === piece) ||
      boardMatrix.map((row, i) => row[2 - i]).every(value => value === piece)
    )
  }

  function isTie () {
    const pieces = [player1.piece, player2.piece]
    return GameBoard.getPositions().every(pos => pieces.includes(pos))
  }

  function setMessage(msg) {
    $message.innerHTML = msg
  }

  function togglePlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1
    setMessage(`${currentPlayer.name}'s turn`)
  }

  return { init, currentPlayer, togglePlayer, play }
})()

const helpers = (() => {
  function splitInChunks(arr, chunkSize) {
    let splitable = Array.from(arr)
    const tempArr = []
    while (splitable.length > 0) {
      tempArr.push(splitable.splice(0, chunkSize))
    }
    return tempArr
  }

  function transpose (arr) {
    return arr[0].map((_, c) => arr.map(r => r[c]));
  }

  return { splitInChunks, transpose }
})()

const Player = (name, piece) => {
  let moves = []

  function makeMove(index){
    moves.push(index)
    GameBoard.markPosition(index, piece)
  }
  
  return{
    name, piece, makeMove, moves
  }
}


GamePlay.init()


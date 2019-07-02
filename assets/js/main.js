
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
    return positions.every(p => p !== '-')
  }

  function movesInWinningMoves (moves){
    return winningMoves.some(group => group.every(item =>  moves.includes(item)))
  }


  function getPositions () {
    return positions
  }

  const isPositionOcupied = index => positions[index] != '-'

  return { reset, markPosition,
    isPositionOcupied, getPositions,
    isFull, movesInWinningMoves
  }
})()


const GamePlay = (() => {
  let player1, player2
  let currentPlayer
  let $message = document.getElementById('game-message')
  let isPlaying = false

  function init() {
    GameBoard.reset()
    const { playerOneName, playerTwoName } = getPlayersNames()
    player1 = Player(playerOneName, 'O')
    player2 = Player(playerTwoName, 'X')
    currentPlayer = player1
    setMessage(`${playerOneName}'s Turn`)
    isPlaying = true
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
    if (GameBoard.isPositionOcupied(index) || !isPlaying) return
    currentPlayer.makeMove(index)
    const { win, tie } = checkGame(currentPlayer.piece)
    if (win || tie) {
      const msg = win ? `${currentPlayer.name} Won!!!` : `It's a Tie`
      setMessage(msg)
      isPlaying = false
    } else {
      togglePlayer()
    }
  }

  function checkGame () {
    const win = GameBoard.movesInWinningMoves(currentPlayer.moves)
    const tie = GameBoard.isFull()
    console.log(win, tie)
    return { win, tie }
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

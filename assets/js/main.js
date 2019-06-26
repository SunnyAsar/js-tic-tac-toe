document.addEventListener('DOMContentLoaded',() => {
  GamePlay.init()
})

const GameBoard = (() =>{
  positions = ['x','o','x','-','x','-','o','-','o']

  function render (){
    positions.forEach((piece, index)=>{
      document.getElementById(`cell-${index}`).innerHTML = piece
    })
  }

  function reset () {
    positions = positions.map(pos => '-')
  }

  function markPosition(index, piece){
    positions[index] = piece
  }

  const isPositionOcupied = index => positions[index] != '-'

  return{
    positions, render, reset, markPosition, isPositionOcupied
  }
})()


const GamePlay = (()=>{
  let player1, player2
  let currentPlayer
  let $message = document.getElementById('game-message')
  let state = 'playing'

  function init () {
    player1 = Player('Player 1', 'O')
    player2 = Player('Player 2', 'X')
    currentPlayer = player1
    setMessage('Player 1 turn')
    GameBoard.reset()
    GameBoard.render()
  }

  function isInvalidMove (index) {
    return  Boolean(GameBoard.isPositionOcupied(index) || state != 'playing' )
  }

  function play(index){
    if (isInvalidMove(index)) return
    GameBoard.markPosition(index,currentPlayer.piece)
    togglePlayer()
    GameBoard.render()
  }

  function setMessage (msg) {
    $message.innerHTML = msg
  }

  function togglePlayer(){
   currentPlayer = currentPlayer == player1 ? player2 : player1
   setMessage(`${currentPlayer.name} turn`)
  }

  return {
    init, currentPlayer,togglePlayer, play
  }
})()

const Player = (name, piece)=>{

  return{
    name, piece
  }
}

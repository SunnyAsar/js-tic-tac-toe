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

  return{
    positions, render, reset, markPosition
  }
})()


const GamePlay = (()=>{
  let player1, player2
  let currentPlayer 

  function init () {
    player1 = Player('Player 1', 'O')
    player2 = Player('Player 2', 'X')
    currentPlayer = player1

    GameBoard.reset()
    GameBoard.render()
  }

  function play(index){
    console.log(`cell ${index} was taped`)
    GameBoard.markPosition(index,currentPlayer.piece)
    GamePlay.togglePlayer()
    alert(`${currentPlayer["name"]} turn`)
    GameBoard.render()
  }


  function togglePlayer(){
   currentPlayer = currentPlayer == player1 ? player2 : player1
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


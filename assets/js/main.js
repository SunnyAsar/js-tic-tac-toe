document.addEventListener('DOMContentLoaded',() => {
  const player1 = Player('Player 1', 'O')
  const player2 = Player('Player 2', 'X')
  GamePlay.init(player1, player2)
})

const GameBoard = (() =>{
  positions = ['x','o','x','-','x','-','o','-','o']

  function render (){
    positions.forEach((piece, index)=>{
      document.getElementById(`cell-${index}`).innerHTML = piece
    })
  }

  function play(index){
    console.log(`cell ${index} was taped`)
  }

  function reset () {
    positions = positions.map(pos => '-')
  }

  return{
    positions, render, play, reset
  }
})()


const GamePlay = (()=>{
  let player1, player2
  function init (players1, player2) {
    GameBoard.reset()
    GameBoard.render()
  }

  return {
    init
  }
})()

const Player = (name, piece)=>{
  return{
    name, piece
  }
}
document.addEventListener('DOMContentLoaded',()=>{

GameBoard.render()
})


const GameBoard = (() =>{
  positions = ['x','o','x','-','x','-','o','-','o']

  function render (){
    positions.forEach((piece, index)=>{
      document.getElementById(`cell-${index}`).innerHTML = piece
    })
  }

  function play(index){
    console.log(` cell ${index} was taped`)
  }
  return{
    positions, render, play
  }
})()


const GamePlay = (()=>{

  return{

  }
})()

const player = (name, piece)=>{
  
  function play(piece){
    // pick position on board
  }

  return{
    name, piece, play
  }

}
import React, { useState } from "react";
import styled from 'styled-components';

import Modal from '../Modal/WinnerModal'

let winner = -1

function Board({ board }) {
  const [render, renderAction] = useState(false)
  const [modealAppear, showModal] = useState(false)

  const itemClickHandler = (e) => {
    let col = Number(e.target.dataset.col)
    let emptyTile = board.emptyTile(Number(col))
    if (emptyTile !== -1) {
      board.putMark(emptyTile, col , board.mark)
    }
    renderAction(!render)
    
    if (board.isMatch(emptyTile, col, board.mark)) {
      winner = board.mark
      showModal(!modealAppear)
    }

    if (board.isBoardFull()) showModal(!modealAppear)
    board.shiftMark()
  }

  const createGrid = () => {
    let grid = []
    
    for (let row = 0; row < board.board.length; row++) {
      for (let col = 0; col < board.board[0].length; col++) {
        grid.push(<GridItem
                    key={row + ' ' + col} 
                    data-row={row} 
                    data-col={col}
                    val={board.board[row][col]} 
                    onClick={itemClickHandler}/>)
      }
    }      
    return grid.reverse()
  }
    
  return (
    <>
      <Modal winner={winner}/>
      <GridContainer>
        {createGrid()}
      </GridContainer>
    </>
  )
}

export default Board

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  justify-items: center;

  position: absolute;
  top: 30%;
  left: 40%;
  transform: translate(-50%, -50%);

  width: 800px;

  margin: 100px;
  padding: 10px;

  background-color: yellow;
  -webkit-box-shadow: 6px 7px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 6px 7px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 6px 7px 5px 0px rgba(0,0,0,0.75);
`

const GridItem = styled.span`
  width: 70px;
  height: 70px;
  
  margin: 5px;

  background-color: ${({val}) => 
    (val === 1 && 'red') ||
    (val === 2 && 'blue') || 
    'white'
  };
  border-radius: 50%;
  -webkit-box-shadow: inset -8px 11px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: inset -8px 11px 5px 0px rgba(0,0,0,0.75);
  box-shadow: inset -8px 11px 5px 0px rgba(0,0,0,0.75)
`



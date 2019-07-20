import React from "react"
import styled from 'styled-components'

import Modal from '../Modal/WinnerModal'

import useBoardState from '../../useBoardState'
import useWinnerModalState from '../../useWinnerModalState'

function Board({ board }) {
  const { winner, updateWinner } = useWinnerModalState()
  const { boards, updateBoard } = useBoardState(board, updateWinner)

  const createGrid = () => {
    let grid = []
    let currentBoard = boards[boards.length - 1]

    for (let row = 0; row < currentBoard.board.length; row++) {
      for (let col = 0; col < currentBoard.board[0].length; col++) {
        grid.push(<GridItem
                      key={row + ' ' + col} 
                      data-row={row} 
                      data-col={col}
                      val={currentBoard.board[row][col]} 
                      onClick={updateBoard}
                    />)
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



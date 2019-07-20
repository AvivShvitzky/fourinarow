import { useState } from 'react';

export default (board, updateWinner) => {
  const [boards, updateBoards] = useState([board])
  
  return {
    boards,
    updateBoard: e => {
      const board = boards[boards.length - 1]
      let col = Number(e.target.dataset.col)
      let emptyTile = board.emptyTile(Number(col))

      if (emptyTile !== -1) {
        board.putMark(emptyTile, col, board.mark)
      }
      updateBoards([...boards, board])
      
      if (board.isMatch(emptyTile, col, board.mark)) {
        updateWinner(board.mark)
      }
    
      if (board.isBoardFull()) updateWinner(0)
      
      board.shiftMark()
    }
  }
}

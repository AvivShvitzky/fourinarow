import createMatrix from '../../utils/createMatrix'
import { ROWS, COLUMNS, EMPTY_TILE, WINNING_MATCH, PLAYER_ONE, PLAYER_TWO } from '../../consts/consts'

class Board {
  constructor() {
    this._board = createMatrix(ROWS, COLUMNS, EMPTY_TILE)
    this._mark = PLAYER_ONE
  }
  
  get board() {
    return this._board
  }
  
  set board(board) {
    this._board = board
  }

  get mark() {
    return this._mark
  }
  
  shiftMark() {
    this._mark === PLAYER_ONE ? this._mark = PLAYER_TWO : this._mark = PLAYER_ONE
  }

  isBoardFull() {
    for (let row of this._board) {
      if (row.indexOf(0) === -1 ) return true 
    }
    return false 
  }

  putMark(row, col) {
    this._board[row][col] = this._mark
  }

  isTileEmpty(row, col) {
    return this._board[row][col] === EMPTY_TILE ? true : false
  }

  emptyTile(col) {
    for (let row in this._board) {
      if (this.isTileEmpty(row, col)) 
      { return Number(row) }
    }
    return -1
  }

  isMatch(row, col) {
    return this.isMatchOneDirection(row, col, 0, 1) ||
    this.isMatchOneDirection(row, col, 1, 0) ||
    this.isMatchOneDirection(row, col, 1, 1) ||
    this.isMatchOneDirection(row, col, -1, 1)
  }

  isMatchOneDirection(row, col, rowToAdd, colToAdd) {
    let numOfMarks = 1
    numOfMarks = this.marksInDirection(row, col, rowToAdd, colToAdd, numOfMarks)
    if (numOfMarks === WINNING_MATCH) return true
    numOfMarks = this.marksInDirection(row, col, -rowToAdd, -colToAdd, numOfMarks)
    if (numOfMarks === WINNING_MATCH) return true

    return false
  }

  marksInDirection(_row, _col, rowToAdd, colToAdd, _numOfMarks) {
    let numOfMarks = _numOfMarks
    let row = _row
    let col = _col
    while (!this.overEdge(row, col, rowToAdd, colToAdd)) {
      if (this._board[row + rowToAdd][col + colToAdd] === this._mark) {
        if (++numOfMarks === WINNING_MATCH) return WINNING_MATCH
        row += rowToAdd
        col += colToAdd
      } else {
        return numOfMarks
      }
    }
    return numOfMarks
  }

  overEdge(row, col, rowToAdd, colToAdd) {

    // direction horizontal to right
    if (rowToAdd === 0 && colToAdd === 1
        &&
        col + colToAdd < this._board[row].length) 
       { return false }

    // direction horizontal to left
    if (rowToAdd === 0 && colToAdd === -1 
        && 
        col + colToAdd >= 0) 
       { return false }

    // direction vertical up and diagonal top-left to bottom right, and top-right to bottom left
    if (rowToAdd === 1
        &&
        row + rowToAdd < this._board.length) 
       { return false }

    // direction vertical down and diagonal bottom-left to top right, and bottom-right to top left
    if (rowToAdd === -1
        &&
        row + rowToAdd >= 0) 
       { return false }

    return true
  }

 }


export default Board

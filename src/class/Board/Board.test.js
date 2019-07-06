import Board from './Board'
import createMatrix from '../../utils/createMatrix'
import { ROWS, COLUMNS, EMPTY_TILE, WINNING_MATCH } from '../../consts/consts'

let board = new Board()
// playboard is used as one example for all and not to represent a real game-state
let playedBoard = new Board()
playedBoard.board[3] = [1, 0, 0, 1, 1, 1, 1]
playedBoard.board[2] = [0, 1, 1, 1, 1, 1, 0]
playedBoard.board[1] = [0, 1, 1, 1, 1, 1, 0]
playedBoard.board[0] = [1, 0, 0, 1, 0, 0, 1]

beforeEach(() => {
  board = new Board()
})

describe('Board ctor', () => {
  test('should initialize a 6 by 7 board', () => {
    const emptyBoard = createMatrix(ROWS, COLUMNS, EMPTY_TILE)
  
    expect(board.board).toEqual(emptyBoard)
  })
})

describe('Board isTileEmpty()', () => {
  test('should be empty', () => {
    board.isTileEmpty(0, 0)

    expect(board.isTileEmpty(0, 0)).toBeTruthy()
  })

  test('should not be empty', () => {
    board.board[0][0] = 1
    
    expect(board.isTileEmpty(0, 0)).toBeFalsy()
  })
})

describe('Board isBoardFull()', () => {
  
  test('should be full', () => {
    board.board = createMatrix(6, 7, 1)
    expect(board.isBoardFull()).toBeTruthy()
  })

  test('should not be full', () => {
    expect(board.isBoardFull()).toBeFalsy()
  })
  
})

describe('Board overEdge()', () => {
  
  test('should be over edge', () => {
    expect(board.overEdge(5, 6, 0, 1)).toBeTruthy()
  })

  test('should not be over edge', () => {
    expect(board.overEdge(0, 0, 0, 1)).toBeFalsy()
  })
  
})

describe('Board marksInDirection()', () => {

  test('should return 4 for horizontal match', () => {
    expect(playedBoard.marksInDirection(3, 3, 0, 1, 1, 1)).toEqual(WINNING_MATCH)
  })

  test('should return 4 for vertical match', () => {
    expect(playedBoard.marksInDirection(0, 3, 1, 0, 1, 1)).toEqual(WINNING_MATCH)
  })

  test('should return 4 for diagonal top-left match', () => {
    expect(playedBoard.marksInDirection(0, 0, 1, 1, 1, 1)).toEqual(WINNING_MATCH)
  })

  test('should return 4 for diagonal top-right match', () => {
    expect(playedBoard.marksInDirection(0, 6, 1, -1, 1, 1)).toEqual(WINNING_MATCH)
  })

  test('should return 4 for diagonal bottom-left match', () => {
    expect(playedBoard.marksInDirection(3, 0, -1, 1, 1, 1)).toEqual(WINNING_MATCH)
  })

  test('should return 4 for diagonal bottom-right match', () => {
    expect(playedBoard.marksInDirection(3, 6, -1, -1, 1, 1)).toEqual(WINNING_MATCH)
  })
  
})

describe('Board isMatchOneDirection()', () => {

  // true tests

  test('should be true for horizontal match', () => {
    expect(playedBoard.isMatchOneDirection(2, 3, 0, 1, 1)).toBeTruthy()
  })

  test('should be true for vertical match', () => {
    expect(playedBoard.isMatchOneDirection(2, 3, 1, 0, 1)).toBeTruthy()
  })

  test('should be true for diagonal top-left match', () => {
    expect(playedBoard.isMatchOneDirection(2, 2, 1, 1, 1)).toBeTruthy()
  })

  test('should be true for diagonal top-right match', () => {
    expect(playedBoard.isMatchOneDirection(1, 5, -1, 1, 1)).toBeTruthy()
  })

  test('should be true for diagonal bottom-left match', () => {
    expect(playedBoard.isMatchOneDirection(2, 1, -1, 1, 1)).toBeTruthy()
  })

  test('should be true for diagonal bottom-right match', () => {
    expect(playedBoard.isMatchOneDirection(2, 5, 1, 1, 1)).toBeTruthy()
  })

  // false tests

  test('should be false for horizontal match', () => {
    expect(playedBoard.isMatchOneDirection(0, 1, 0, 1, 1)).toBeFalsy()
  })

  test('should be false for vertical match', () => {
    expect(playedBoard.isMatchOneDirection(3, 0, 1, 0, 1)).toBeFalsy()
  })

  test('should be false for diagonal top-left match', () => {
    expect(playedBoard.isMatchOneDirection(2, 0, 1, 1, 1)).toBeFalsy()
  })

  test('should be false for diagonal top-right match', () => {
    expect(playedBoard.isMatchOneDirection(0, 4, -1, 1, 1)).toBeFalsy()
  })

  test('should be false for diagonal bottom-left match', () => {
    expect(playedBoard.isMatchOneDirection(3, 4, -1, 1, 1)).toBeFalsy()
  })

  test('should be false for diagonal bottom-right match', () => {
    expect(playedBoard.isMatchOneDirection(3, 2, 1, 1, 1)).toBeFalsy()
  })

})

describe('Board emptyTile()', () => {

  test('should return 1', () => {
    expect(playedBoard.emptyTile(0)).toEqual(1)
  })

  test('should return 0', () => {
    expect(playedBoard.emptyTile(1)).toEqual(0)
  })

  test('should return 4', () => {
    expect(playedBoard.emptyTile(3)).toEqual(WINNING_MATCH)
  })

})

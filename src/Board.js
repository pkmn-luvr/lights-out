import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

// FURTHER STUDY: Default properties for the board size and likelihood that a light on the initial board is turned on or off, plus added initialBoard state for testing 
function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25, initialBoard }) { 
  const [board, setBoard] = useState(initialBoard || createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = new Array(nrows).fill(0).map(() => new Array(ncols).fill(false));

    // Function to flip a cell and its adjacent cells
    function flipCell(y, x, board) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
        if (y > 0) board[y-1][x] = !board[y-1][x];
        if (y < nrows - 1) board[y+1][x] = !board[y+1][x];
        if (x > 0) board[y][x-1] = !board[y][x-1];
        if (x < ncols - 1) board[y][x+1] = !board[y][x+1];
      }
    }
  
    // Simulates random flips
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        if (Math.random() < chanceLightStartsOn) {
          flipCell(i, j, initialBoard);
        }
      }
    }
  
    return initialBoard;
  }

  function hasWon() {
    // Checks the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // makes a deep copy of the oldBoard, flips this cell and the cells around it, returns copy
      const boardCopy = oldBoard.map(row => [...row]);
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just shows a winning msg & renders nothing else
  if (hasWon()) {
    return <div>You Won!</div>;
  }

  let tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
          // Pass x & y prop - added for testing if clicking a cell flips the correct cells
          y={y} 
          x={x} 
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;

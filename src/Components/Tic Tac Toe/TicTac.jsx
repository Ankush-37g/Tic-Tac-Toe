import React, { useState } from 'react';
import './TicTac.css';

const TicTac = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true); // Toggle between X and O
  const [lock, setLock] = useState(false);     // Lock board when the game ends
  const [winner, setWinner] = useState(null);  // Track winner

  const handleClick = (index) => {
    if (lock || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O'; // Assigning X or O based on turn
    setBoard(newBoard);

    checkWinner(newBoard);

    setIsXTurn(!isXTurn); // Toggle turn
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a]);
        setLock(true); // Lock the board after a win
        return;
      }
    }

    // Check for a tie
    if (!board.includes(null)) {
      setWinner('Tie');
      setLock(true); // Lock the board after a tie
    }
  };

  // Corrected Reset Function
  const handleReset = () => {
    setBoard(Array(9).fill(null)); // Reset the board
    setIsXTurn(true);             // Reset turn to X
    setLock(false);               // Unlock the board
    setWinner(null);              // Reset winner state
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe Game In <span>React</span></h1>

      {winner && (
        <h2 className="winner">
          {winner === 'Tie' ? "It's a tie!" : `Winner: ${winner}`}
        </h2>
      )}

      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => handleClick(index)}
          >
            {value === 'X' && <p className="cross">X</p>}
            {value === 'O' && <p className = "circle">O</p>}
          </div>
        ))}
        
      </div>

      <button className="reset" onClick={handleReset}>
        Reset
      </button>
      
    </div>
  );
};

export default TicTac;




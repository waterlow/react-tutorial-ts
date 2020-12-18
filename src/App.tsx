import React, { useState, useMemo } from 'react';
import './App.css';
import Board from './board';
import { calculateWinner } from './calculate_winner'

type Squares = (null | 'X' | 'O')[]

const useHistory = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) as Squares}  ])
  const [xIsNext, setXIsNext] = useState(true)
  const current = history[history.length - 1];
  const status = useMemo(() => {
    const winner = calculateWinner(current.squares)
    return winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`
  }, [current.squares, xIsNext])

  const handleClick = (i: number) => {
    return () => {
      const squares = current.squares.slice()
      if (calculateWinner(squares) || squares[i]) return

      const newSquares = [...squares]
      newSquares[i] = xIsNext ? 'X' : 'O'
      setHistory(history.concat([{
        squares: newSquares,
      }]))
      setXIsNext(!xIsNext)
    }
  }

  const jumpTo = (step: number) => {
    setHistory(history.slice(0, step + 1))
    setXIsNext((step % 2) === 0)
  }

  return [status, history, handleClick, jumpTo] as const
}

const App: React.VFC =  () => {
  const [status, history, handleClick, jumpTo] = useHistory();
  const moves = history.map((_step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history[history.length - 1].squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useMemo } from 'react';
import './App.css';
import Board from './board';
import { calculateWinner } from './calculate_winner'

type Squares = (null | 'X' | 'O')[]

const useHistory = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) as Squares}  ])
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)
  const current = history[stepNumber];
  const status = useMemo(() => {
    const winner = calculateWinner(current.squares)
    return winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`
  }, [current.squares, xIsNext])

  const handleClick = (i: number) => {
    return () => {
      const squares = current.squares.slice()
      if (calculateWinner(squares) || squares[i]) return

      const newHistory = history.slice(0, stepNumber + 1)
      const newSquares = [...squares]
      newSquares[i] = xIsNext ? 'X' : 'O'
      setStepNumber(newHistory.length)
      setHistory(newHistory.concat([{
        squares: newSquares,
      }]))
      setXIsNext(!xIsNext)
    }
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  return [status, history, current, handleClick, jumpTo] as const
}

const App: React.VFC =  () => {
  const [status, history, current, handleClick, jumpTo] = useHistory();
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
        <Board squares={current.squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;

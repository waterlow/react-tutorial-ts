import React, { useState, useMemo } from 'react';
import './App.css';
import Board from './board';
import Moves from './moves';
import { calculateWinner } from './calculate_winner'

import { History } from './type'

const nextPlayer = (stepNumber: number) => stepNumber % 2 === 0 ? 'X' : 'O'

const useHistory = () => {
  const [history, setHistory] = useState<History>([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const handleClick = (i: number) => {
    return () => {
      const currentSquares = history[stepNumber].squares;
      if (calculateWinner(currentSquares) || currentSquares[i]) return

      const newHistory = history.slice(0, stepNumber + 1)
      const newSquares = [...currentSquares]
      newSquares[i] = nextPlayer(stepNumber)
      setStepNumber(newHistory.length)
      setHistory(newHistory.concat([{
        squares: newSquares,
        row: Math.floor(i / 3),
        col: i % 3,
      }]))
    }
  }

  return [history, handleClick, setStepNumber, stepNumber] as const
}

const App: React.VFC =  () => {
  const [history, handleClick, jumpTo, stepNumber] = useHistory();
  const currentSquares = history[stepNumber].squares;
  const status = useMemo(() => {
    const winPattern = calculateWinner(currentSquares);
    if (!winPattern) {
      return currentSquares.indexOf(null) === -1 ? 'Draw' : `Next player: ${nextPlayer(stepNumber)}`
    }

    return `Winner: ${currentSquares[winPattern[0]]}`
  }, [currentSquares, stepNumber])

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Moves history={history} jumpTo={jumpTo} stepNumber={stepNumber} />
      </div>
    </div>
  );
}

export default App;

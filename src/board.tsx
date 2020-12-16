import React, { useCallback, useState, useMemo } from 'react'
import Square from './square'

type Squares = (null | 'X' | 'O')[]

const WIN_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

const calculateWinner = (squares: Squares) => {
  const pattern = WIN_PATTERNS.find(([a, b, c]) =>
    squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  )
  return pattern && squares[pattern[0]]
}

const Board : React.FC = () => {
  const [squares, setSquares] = useState<Squares>(Array(9).fill(null) as Squares)
  const [xIsNext, setXIsNext] = useState(true)
  const status = useMemo(() => {
    const winner = calculateWinner(squares)
    return winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`
  }, [squares, xIsNext])
  const handleClick = useCallback((i) => {
    return () => {
      if (calculateWinner(squares) || squares[i]) return

      const newSquares = [...squares]
      newSquares[i] = xIsNext ? 'X' : 'O'
      setSquares(newSquares)
      setXIsNext(!xIsNext)
    }
  }, [squares, xIsNext])
  const renderSquare = useCallback((i) => {
    return <Square value={squares[i]} onClick={handleClick(i)} />
  }, [handleClick, squares])

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board

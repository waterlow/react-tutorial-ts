import React from 'react'
import Square from './square'
import { calculateWinner } from './calculate_winner'

type Props = {
  squares: (string | null)[]
  onClick: (i: number) => (() => void)
}

const Board : React.VFC<Props> = ({squares, onClick}) => {
  const winPattern = calculateWinner(squares)

  const renderSquare = (i: number) =>
    <Square key={i} value={squares[i]} onClick={onClick(i)} highlight={!!winPattern && winPattern.indexOf(i) !== -1} />

  return (
    <div>
      {[0, 1, 2].map(i =>
        <div className="board-row" key={i}>
          {[0, 1, 2].map(j => renderSquare(i * 3 + j))}
        </div>
      )}
    </div>
  )
}

export default Board

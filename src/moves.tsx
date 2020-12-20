import React, { useState } from 'react'
import { History } from './type'

type Props = {
  history: History
  jumpTo: (step: number) => void
  stepNumber: number
}

const Moves: React.VFC<Props> = ({history, jumpTo, stepNumber}) => {
  const [isReverse, setIsReverse] = useState(false)
  const moves = history.map((step, index) => {
    const desc = index === 0 ? 'Go to game start' : `Go to move #${index} (${step.col}, ${step.row})`;
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>
          {index === stepNumber ? <strong>{desc}</strong> : desc}
        </button>
      </li>
    );
  });

  if (isReverse) { moves.reverse() }

  return (<>
    <ol>{moves}</ol>
    <button onClick={() => { setIsReverse(!isReverse) }}>{isReverse ? '昇順にする' : '降順にする'}</button>
  </>);
}

export default Moves

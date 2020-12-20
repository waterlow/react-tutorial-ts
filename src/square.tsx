import React from 'react'

type Props = {
  value: string | null
  onClick: () => void
  highlight?: boolean
}

const Square: React.VFC<Props> = ({value, onClick, highlight}) => {
  return (
    <button className="square" onClick={onClick} style={highlight ? { color: 'red' } : undefined}>{value}</button>
  );
}

export default Square

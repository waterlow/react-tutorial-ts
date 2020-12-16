import React from 'react'

const Square: React.VFC<{value: 'O' | 'X' | null, onClick: () => void}> = ({value, onClick}) => {
  return (
    <button className="square" onClick={onClick}>{value}</button>
  );
}

export default Square

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

export const calculateWinner = (squares: any[]) => {
  const pattern = WIN_PATTERNS.find(([a, b, c]) =>
    squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  )
  return pattern && squares[pattern[0]]
}

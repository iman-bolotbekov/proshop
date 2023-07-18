import React from 'react'

interface CounterProps {
  increament: () => {}
  decreament: () => {}
  qty: number
  countInStock: number
}

const Counter: React.FC<CounterProps> = ({
  increament,
  decreament,
  qty,
  countInStock,
}) => {
  return (
    <div className="border rounded-lg">
      <button
        className="p-3 px-5"
        onClick={() => decreament()}
        disabled={qty === 1}
      >
        -
      </button>
      <span className="border-x p-3 px-5">{qty}</span>
      <button
        className="p-3 px-5"
        onClick={() => increament()}
        disabled={qty === countInStock}
      >
        +
      </button>
    </div>
  )
}

export default Counter

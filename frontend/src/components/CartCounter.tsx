import React from 'react'

interface CartCounterProps {
  increament: (product: number) => {}
  decreament: (product: number) => {}
  qty: number
  countInStock?: number
  product: number
}

const CartCounter: React.FC<CartCounterProps> = ({
  increament,
  decreament,
  qty,
  countInStock,
  product,
}) => {
  return (
    <div className="border rounded-lg h-12">
      <button className="p-3 px-4" onClick={() => decreament(product)}>
        -
      </button>
      <span className="border-x p-3 px-4">{qty}</span>
      <button
        className="p-3 px-4"
        onClick={() => increament(product)}
        disabled={qty === countInStock}
      >
        +
      </button>
    </div>
  )
}

export default CartCounter

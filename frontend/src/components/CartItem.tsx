import React from 'react'
import { ICartItem } from '../models/models'
import { useActions } from '../hooks/action'
import CartCounter from './CartCounter'

interface CartItemProps {
  cartItem: ICartItem
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { increaseCartQty, decreaseCartQty, removeFromCart } = useActions()
  return (
    <div className="lg:my-4 lg:pl-10">
      <div className="flex items-center flex-col space-y-6 lg:flex-row lg:space-x-16">
        <img
          src={`${cartItem.image}`}
          alt={`${cartItem.name}`}
          className="rounded-lg w-[26rem] lg:w-[6rem]"
        />
        <div className="w-32 title-1">{cartItem.name}</div>
        <div>${cartItem.price}</div>
        <div className="flex items-center flex-row space-x-16 lg:space-y-0">
          <CartCounter
            increament={increaseCartQty}
            decreament={decreaseCartQty}
            qty={cartItem.qty}
            countInStock={cartItem.countInStock}
            product={cartItem.product}
          />
          <i
            className="fas fa-trash hover:cursor-pointer"
            onClick={() => removeFromCart(cartItem.product)}
          ></i>
        </div>
      </div>
      <div className="border-b my-2"></div>
    </div>
  )
}

export default CartItem

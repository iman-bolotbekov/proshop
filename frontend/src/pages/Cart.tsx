import React from 'react'
import { useAppSelector } from '../hooks/redux'
import CartItem from '../components/CartItem'
import { ICartItem } from '../models/models'
import { Link, useNavigate } from 'react-router-dom'

const Cart: React.FC = () => {
  const { cartItems } = useAppSelector((state) => state.cart)
  const navigate = useNavigate()
  const subtotalPrice = cartItems
    .reduce((prev, item) => {
      return prev + +item.price * item.qty
    }, 0)
    .toFixed(2)
  const toShipping = () => {
    navigate(`/shipping`)
  }
  return (
    <>
      <h2 className="title py-4">SHOPPING CART</h2>
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3">
        {cartItems.length > 0 ? (
          <div className="md:col-span-2">
            <div className="hidden lg:grid grid-rows-1 grid-cols-9 px-10">
              <span className="col-span-4">Product</span>
              <span className="col-span-2">Price</span>
              <span className="">Qty</span>
            </div>
            {cartItems.map((cartItem: ICartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.product} />
            ))}
          </div>
        ) : (
          <div className="alert-info">
            <Link to={`..`} className="hover:underline">
              Your cart is empty Go Back
            </Link>
          </div>
        )}
        <div className="border border-gray-200 mx-6 my-10 lg:my-0">
          <div className="border-b border-b-gray-200 py-2 text-center title-2">
            SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            ITEMS
          </div>
          <div className="py-2 flex px-6 justify-between">
            <span>Subtotal:</span>
            <span>${subtotalPrice}</span>
          </div>
          <div className="border-t border-t-gray-200 py-2 px-6 flex justify-center">
            <button
              className={`button ${cartItems.length <= 0 && `disabled`} w-96`}
              disabled={cartItems.length <= 0}
              onClick={toShipping}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

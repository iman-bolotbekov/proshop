import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useAppSelector } from '../hooks/redux'
import OrderItem from '../components/OrderItem'
import { useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from '../store/api/order.api'
import { useActions } from '../hooks/action'

const PlaceOrder: React.FC = () => {
  const navigate = useNavigate()
  const [createOrder] = useCreateOrderMutation()
  const { clearCart, clearPaymentMethod } = useActions()
  const {
    cart: { shippingAddress, paymentMethod, cartItems },
    auth: { userInfo },
  } = useAppSelector((state) => state)

  const itemsPrice = +cartItems
    .reduce((acc, item) => acc + +item.price * item.qty, 0)
    .toFixed(2)
  const shippingPrice = +(Number(itemsPrice) > 100 ? 0 : 10).toFixed(2)
  const taxPrice = +Number(0.082 * Number(itemsPrice)).toFixed(2)
  const totalPrice = +(
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)

  const toOrderHandler = () => {
    createOrder({
      order: {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      },
      token: userInfo?.token!,
    })
      .unwrap()
      .then((response) => {
        clearCart()
        clearPaymentMethod()
        navigate(`/order/${response.id}`)
      })
      .catch((error) => {
        console.log('Error:', error)
      })
  }
  return (
    <div className="pt-10">
      <CheckoutSteps step1 step2 step3 />
      <div className="grid md:gap-6 grid-rows-1 grid-col-1 md:grid-cols-3 px-4">
        <div className="col-span-2">
          <h2 className="title-2 py-2">Shipping</h2>
          <p>
            <span className="font-medium">Shipping:</span>
            {` Moscow Street 49/41, Bishkek, 720011, Киргизия${
              (shippingAddress.postalCode,
              shippingAddress.country,
              shippingAddress.city,
              shippingAddress.address)
            }`}
          </p>
          <div className="line"></div>
          <h2 className="title-2 py-2">Payment Method</h2>
          <p>
            <span className="font-medium">Method:</span>
            {paymentMethod.paymentMethod}
          </p>
          <div className="line"></div>
          <h2 className="title">Order Items</h2>
          {cartItems.map((cartItem) => (
            <OrderItem orderItem={cartItem} key={cartItem.product} />
          ))}
        </div>
        <div className="py-10 md:p-0">
          <div className="border border-gray-200">
            <h2 className="title-2 px-20 pt-4">ORDER SUMMARY</h2>
            <div className="line"></div>
            <div className="flex justify-between px-8">
              <div>Items:</div>
              <div>${itemsPrice}</div>
            </div>
            <div className="line"></div>
            <div className="flex justify-between px-8">
              <div>Shipping:</div>
              <div>${shippingPrice}</div>
            </div>
            <div className="line"></div>
            <div className="flex justify-between px-8">
              <div>Tax:</div>
              <div>${taxPrice}</div>
            </div>
            <div className="line"></div>
            <div className="flex justify-between px-8">
              <div>Total:</div>
              <div>${totalPrice}</div>
            </div>
            <div className="line"></div>
            <div className="flex justify-center items-center pb-4 px-7">
              <button className="button w-full" onClick={toOrderHandler}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder

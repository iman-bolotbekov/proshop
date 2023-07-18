import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderQuery, usePayOrderMutation } from '../store/api/order.api'
import OrderItem from '../components/OrderItem'
import Spinner from '../components/UI/Spinner/Spinner'
import { toast } from 'react-toastify'

const Order: React.FC = () => {
  const params = useParams()
  const orderId = params.orderId ? parseInt(params.orderId, 10) : 0
  const { data: order, isLoading: orderIsLoading } = useGetOrderQuery(orderId)
  const [payOder] = usePayOrderMutation()
  const onPayOrder = (orderId: number) => {
    payOder(orderId)
      .unwrap()
      .then((_) => {
        toast.success('Payment success!')
      })
      .catch((error) => {
        toast.error(`Didn't paid, error is occured!`)
        console.log('Pay error:', error)
      })
  }
  return (
    <>
      {orderIsLoading ? (
        <Spinner />
      ) : (
        <div>
          <h2 className="title py-4">Order:</h2>
          <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3">
            <div className="px-10 lg:col-span-2">
              <h2 className="title-2">Shipping</h2>
              <p className={`pb-2`}>
                <span className="title-3">Name:</span> {order?.user.name}
              </p>
              <p className={`pb-2`}>
                <span className="title-3">Email:</span> {order?.user.email}
              </p>
              <p className={`pb-2`}>
                <span className="title-3">Shipping:</span>{' '}
                {order?.shippingAddress.postalCode},{' '}
                {order?.shippingAddress.country}, {order?.shippingAddress.city},{' '}
                {order?.shippingAddress.address}
              </p>
              {!order?.isDelivered ? (
                <div className="alert-warning">Not Delivered</div>
              ) : (
                <div className="alert-success">
                  Delivered on {order.deliveredAt?.substring(0, 10)}
                </div>
              )}
              <div className="line"></div>
              <h2 className="title-2 pb-2">Payment Method</h2>
              <p className="pb-2">
                <span className="title-3">Method:</span>
                {order?.paymentMethod}
              </p>
              {!order?.isPaid ? (
                <div className="alert-warning">Not Paid</div>
              ) : (
                <div className="alert-success">
                  Paid on {order.paidAt?.substring(0, 10)}
                </div>
              )}
              <div className="line"></div>
              <h2 className="title-2">Order Items</h2>
              {order?.orderItems.map((orderItem) => (
                <OrderItem orderItem={orderItem} key={orderItem.id} />
              ))}
            </div>
            <div>
              <div className="border border-gray-200 m-10 lg:m-0">
                <h2 className="title-2 px-20 pt-4">ORDER SUMMARY</h2>
                <div className="line"></div>
                <div className="flex justify-between px-8">
                  <div>Items:</div>
                  <div>
                    $
                    {order?.orderItems.reduce(
                      (prev, item) => prev + +item.price * item.qty,
                      0
                    )}
                  </div>
                </div>
                <div className="line"></div>
                <div className="flex justify-between px-8">
                  <div>Shipping:</div>
                  <div>${order?.shippingPrice}</div>
                </div>
                <div className="line"></div>
                <div className="flex justify-between px-8">
                  <div>Tax:</div>
                  <div>${order?.taxPrice}</div>
                </div>
                <div className="line"></div>
                <div className="flex justify-between px-8 pb-4">
                  <div>Total:</div>
                  <div>${order?.totalPrice}</div>
                </div>
                <div className="line"></div>
                {order?.id && (
                  <div className={`flex px-8 pb-4`}>
                    <button
                      className={`button w-full ${order?.isPaid && 'disabled'}`}
                      onClick={() => onPayOrder(order.id)}
                      disabled={order?.isPaid}
                    >
                      Pay
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Order

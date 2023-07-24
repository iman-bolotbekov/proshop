import React from 'react'
import { ICartItem } from '../models/models'

interface OrderItemProps {
  orderItem: ICartItem
}

const OrderItem: React.FC<OrderItemProps> = ({ orderItem }) => {
  return (
    <div className="lg:my-4 lg:pl-10">
      <div className="flex items-center flex-col space-y-6 lg:flex-row lg:space-x-16">
        <img
          src={`${orderItem.image}`}
          alt={`${orderItem.name}`}
          className="rounded-lg w-[26rem] lg:w-[3rem]"
        />
        <div className="">{orderItem.name}</div>
        <p>
          {orderItem.qty} X ${orderItem.price} = $
          {(+orderItem.price * orderItem.qty).toFixed(2)}
        </p>
        <div className="line"></div>
      </div>
    </div>
  )
}

export default OrderItem

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDone } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { useGetOrdersQuery } from '../store/api/order.api'
import { toast } from 'react-toastify'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Pagination from '../components/UI/Pagination/Pagination'

const AdminOrder: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data: ordersData } = useGetOrdersQuery({ page })
  return (
    <>
      <h1 className="title-2 py-4">Order</h1>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TransitionGroup component={null}>
              {ordersData?.results.map((order) => (
                <CSSTransition key={order.id} timeout={500} classNames="list">
                  <tr>
                    <td>
                      <span className="font-bold text-blue-500 hover:underline">
                        {order.id}
                      </span>
                    </td>
                    <td>{order.user.name}</td>
                    <td>
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        {order.createdAt.substring(0, 10)}
                      </span>
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        <MdOutlineDone className="text-green-500" size={30} />
                      ) : (
                        <RxCross2 className="text-red-500" size={30} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <MdOutlineDone className="text-green-500" size={30} />
                      ) : (
                        <RxCross2 className="text-red-500" size={30} />
                      )}
                    </td>

                    <td>
                      <Link to={`/order/${order.id}`} className="button-sm">
                        Detail
                      </Link>
                    </td>
                  </tr>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden px-10">
        {ordersData?.results.map((order) => (
          <div
            key={order.id}
            className="bg-white space-y-3 p-4 rounded-lg shadow"
          >
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <span className="text-blue-500 font-bold hover:underline">
                  {order.id}
                </span>
              </div>
              <div className="text-gray-500">
                {order.createdAt.substring(0, 10)}
              </div>
              <div className="space-x-3">
                {order.isDelivered && (
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                    Delivered
                  </span>
                )}
                {order.isPaid && (
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                    Paid
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-700">{order.user.name}</div>
            <div className="text-sm font-medium text-black">
              ${order.totalPrice}
            </div>
          </div>
        ))}
      </div>
      {ordersData && (
        <Pagination
          limit={4}
          onPageChange={setPage}
          total={ordersData.count}
          currentPage={page}
        />
      )}
    </>
  )
}

export default AdminOrder

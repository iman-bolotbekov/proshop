import React, { useState, useEffect } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import { updateProfileShema } from '../schemas'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../store/api/user.api'
import { IRegister } from '../models/models'
import { useGetMyOrdersQuery } from '../store/api/order.api'
import { useActions } from '../hooks/action'
import { Link } from 'react-router-dom'
import OrdersChart from '../components/OrdersChart'
import OrdersFilter from '../components/OrdersFilter'

const Profile: React.FC = () => {
  const { data: user } = useGetUserProfileQuery()
  const [year, setYear] = useState<string>('2023')
  const [updateUserProfile] = useUpdateUserProfileMutation()
  const { data: myOrders = [] } = useGetMyOrdersQuery()
  const { setUserInfo } = useActions()
  const onSubmitHandler = (
    values: IRegister,
    action: FormikHelpers<IRegister>
  ) => {
    updateUserProfile({
      name: values.name,
      email: values.email,
      password: values.password,
    })
      .unwrap()
      .then((response) => {
        console.log(response)
        setUserInfo(response)
      })
      .catch((error) => console.log('Update user profile error:', error))
    action.resetForm()
  }
  const signUpForm = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      rePassword: '',
    } as IRegister,
    onSubmit: onSubmitHandler,
    validationSchema: updateProfileShema,
  })
  const { values, handleChange, handleSubmit, errors, touched, setValues } =
    signUpForm

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name,
        email: user.email,
        password: values.password,
      })
    }
  }, [user, setValues])
  const filteredOrders = myOrders?.filter((order) => {
    const date = new Date(order.createdAt.substring(0, 10))
    return date.getFullYear().toString() === year
  })

  function filterByYear(year: string) {
    setYear(year)
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 py-4 px-8 lg:px-0">
      <div className="px-4">
        <h2 className="title-2">User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter nama"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error">
              {errors.name && touched.name && errors.name}
            </p>
          </div>
          <div className="input-box">
            <label htmlFor="">Email Address</label>
            <input
              type="text"
              className="input"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <p className="error">
              {errors.email && touched.email && errors.email}
            </p>
          </div>
          <div className="input-box">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <p className="error">
              {errors.password && touched.password && errors.password}
            </p>
          </div>
          <div className="input-box">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter confirm password"
              name="rePassword"
              value={values.rePassword}
              onChange={handleChange}
            />
            <p className="error">
              {' '}
              {errors.rePassword && touched.rePassword && errors.rePassword}
            </p>
          </div>
          <button className="button" type="submit">
            Sing Up
          </button>
        </form>
      </div>
      <div className="col-span-2 px-4 py-10">
        <h2 className="title-2 pb-4">My Orders</h2>
        <OrdersFilter filterByYear={filterByYear} selectedYear={year} />
        {myOrders?.length > 0 && <OrdersChart orders={filteredOrders} />}
        <div className="overflow-auto rounded-sm shadow-md hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Total
                </th>
                <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myOrders?.map((myOrder) => (
                <tr key={myOrder.id} className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <p className="font-bold text-blue-500 hover:underline">
                      {myOrder.id}
                    </p>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {myOrder.createdAt.substring(0, 10)}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {myOrder.isDelivered ? (
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        Delivered
                      </span>
                    ) : myOrder.isPaid ? (
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                        Shipped
                      </span>
                    ) : (
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        Delivered
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    ${myOrder.totalPrice}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <Link className="button-sm" to={`/order/${myOrder.id}`}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {myOrders?.map((myOrder) => (
            <div
              key={myOrder.id}
              className="bg-white space-y-3 p-4 rounded-lg shadow"
            >
              <div className="flex items-center space-x-2 text-sm">
                <div>
                  <p className="text-blue-500 font-bold hover:underline">
                    {myOrder.id}
                  </p>
                </div>
                <div className="text-gray-500">
                  {myOrder.createdAt.substring(0, 10)}
                </div>
                <div>
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                    Delivered
                  </span>
                </div>
              </div>
              <div className="text-sm font-medium text-black">
                ${myOrder.totalPrice}
              </div>
              <div className="text-sm text-gray-700">
                <Link className="button" to={`/order/${myOrder.id}`}>
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile

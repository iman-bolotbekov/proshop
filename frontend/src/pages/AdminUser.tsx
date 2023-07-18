import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDone } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { useDeleteUserMutation, useGetUsersQuery } from '../store/api/user.api'
import { toast } from 'react-toastify'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Pagination from '../components/UI/Pagination/Pagination'

const AdminUser = () => {
  const [page, setPage] = useState<number>(1)
  const { data: usersData } = useGetUsersQuery({ page })
  const [deleteUser] = useDeleteUserMutation()
  const onDeleteUserHandler = (userId: number) => {
    deleteUser(userId)
      .unwrap()
      .then((response) => {
        toast.success('User successfully deleted!')
      })
      .catch((error) => {
        toast.error("User didn't deleted, error is occured!")
        console.log('User delete error:', error)
      })
  }
  return (
    <>
      <h1 className="title-2 py-4">User</h1>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TransitionGroup component={null}>
              {usersData?.results.map((user) => (
                <CSSTransition key={user.id} timeout={500} classNames="list">
                  <tr>
                    <td>
                      <span className="font-bold text-blue-500 hover:underline">
                        {user.id}
                      </span>
                    </td>
                    <td>{user.name}</td>
                    <td>
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        {user.email}
                      </span>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <MdOutlineDone className="text-green-500" size={30} />
                      ) : (
                        <RxCross2 className="text-red-500" size={30} />
                      )}
                    </td>

                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Link
                        to={`/admin/user/${user.id}/edit`}
                        className=" p-2 px-4 shadow"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="bg-red-500 p-2 px-4"
                        onClick={() => onDeleteUserHandler(user.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden px-10">
        {usersData?.results.map((user) => (
          <div
            key={user.id}
            className="bg-white space-y-3 p-4 rounded-lg shadow"
          >
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <span className="text-blue-500 font-bold hover:underline">
                  {user.id}
                </span>
              </div>
              <div className="text-gray-500">{user.email}</div>
              <div>
                {user.isAdmin && (
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                    Admin
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-700">{user.name}</div>
            <div className="text-sm font-medium text-black">$200.00</div>
          </div>
        ))}
      </div>
      {usersData && (
        <Pagination
          limit={4}
          onPageChange={setPage}
          currentPage={page}
          total={usersData.count}
        />
      )}
    </>
  )
}

export default AdminUser

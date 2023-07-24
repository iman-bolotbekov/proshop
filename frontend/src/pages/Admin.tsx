import React from 'react'
import Card from '../components/UI/Card/Card'
import { BsFillBagFill } from 'react-icons/bs'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Admin: React.FC = () => {
  return (
    <div className="m-4 px-4">
      <h2 className="title p-4 pb-6">Admin Panel</h2>
      <div className="grid grid-rows-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link to={`/admin/product`}>
          <Card className="flex flex-row items-center justify-between px-10">
            <h2 className="title-2">Product</h2>
            <BsFillBagFill size={30} />
          </Card>
        </Link>

        <Link to={`/admin/order`}>
          <Card className="flex flex-row items-center justify-between px-10">
            <h2 className="title-2">Order</h2>
            <BsFillCartCheckFill size={30} />
          </Card>
        </Link>
        <Link to={`/admin/user`}>
          <Card className="flex flex-row items-center justify-between px-10">
            <h2 className="title-2">User</h2>
            <FaUserFriends size={30} />
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default Admin

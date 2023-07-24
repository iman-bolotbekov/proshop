import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../store/api/product.api'
import Pagination from '../components/UI/Pagination/Pagination'

const AdminProduct: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const navigate = useNavigate()
  const { data: products } = useGetProductsQuery({ page })
  const [deleteProduct] = useDeleteProductMutation()
  const onDeleteProductHandler = (productId: number) => {
    deleteProduct(productId)
      .unwrap()
      .then((response) => {
        navigate(`/admin/product`)
        toast.success(`Product successfully deleted!`)
      })
      .catch((error) => {
        toast.error(`Product didn't deleted, error occured!`)
        console.log('Product delete error:', error)
      })
  }
  return (
    <>
      <div className="flex flex-row justify-between items-center px-10">
        <h1 className="title-2 py-4">Product</h1>
        <Link to={`/admin/product/create/`} className="button">
          Create Product
        </Link>
      </div>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TransitionGroup component={null}>
              {products?.results?.map((product) => (
                <CSSTransition key={product.id} timeout={500} classNames="list">
                  <tr>
                    <td>
                      <span className="font-bold text-blue-500 hover:underline">
                        {product.id}
                      </span>
                    </td>
                    <td>{product.name}</td>
                    <td>
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        {product.price}
                      </span>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Link
                        to={`/admin/product/${product.id}/edit`}
                        className=" p-2 px-4 shadow"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="bg-red-500 p-2 px-4"
                        onClick={() => onDeleteProductHandler(product.id)}
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
        {products?.results?.map((product) => (
          <div className="bg-white space-y-3 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <span className="text-blue-500 font-bold hover:underline">
                  {product.id}
                </span>
              </div>
              <div className="text-gray-500">{product.category}</div>
              <div>
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  {product.brand}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">{product.name}</div>
            <div className="text-sm font-medium text-black">
              ${product.price}
            </div>
          </div>
        ))}
      </div>
      {products && (
        <Pagination
          limit={4}
          total={products.count}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </>
  )
}

export default AdminProduct

import React, { useState } from 'react'
import Carousel from '../components/UI/Carousel/Carousel'
import ProductItem from '../components/ProductItem'
import {
  useGetProductsQuery,
  useGetTopProductQuery,
} from '../store/api/product.api'
import { IProduct } from '../models/models'
import Pagination from '../components/UI/Pagination/Pagination'
import Spinner from '../components/UI/Spinner/Spinner'

const HomeScreen: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data: productsData, isLoading: productsDataIsLoading } =
    useGetProductsQuery({ page })
  const { data: topProducts, isLoading: topProductsIsLoading } =
    useGetTopProductQuery()

  return (
    <>
      {topProductsIsLoading ? (
        <Spinner />
      ) : (
        topProducts && <Carousel topProducts={topProducts} />
      )}
      <h1 className="title pb-4">Latest Products</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsData?.results.map((product: IProduct) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
      {productsDataIsLoading ? (
        <Spinner />
      ) : (
        productsData && (
          <Pagination
            currentPage={page}
            onPageChange={setPage}
            total={productsData?.count}
            limit={4}
          />
        )
      )}
    </>
  )
}

export default HomeScreen

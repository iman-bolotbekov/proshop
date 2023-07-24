import React from 'react'
import Card from './UI/Card/Card'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'
import { IProduct } from '../models/models'

interface ProductProps {
  product: IProduct
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card className="flex flex-col space-y-3 p-4">
      <Link to={`/product/${product.id}`}>
        <img src={product.image_url} alt={`${product.name}`} width={300} />
      </Link>
      <Link to={`/product/${product.id}`} className="underline">
        {product.name}
      </Link>
      <Ratings
        value={Math.ceil(product.rating / 2)}
        text={`${product.numReviews} reviews`}
        color={'#f8e825'}
      />
      <p className="text-xl text-gray-600 font-medium py-4">${product.price}</p>
    </Card>
  )
}

export default ProductItem

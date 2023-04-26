import React from "react"
import { Card } from "react-bootstrap"
import Ratings from "./Ratings"
import { Link } from "react-router-dom"

const Product = ({ product }) => {
  return (

    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`product/${product._id}`}>
          <div>
            <strong>{product.name}</strong>
          </div>
        </Link>
        <div>
          <div className="my-3">
            <Ratings
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </div>
        <h3>${product.price}</h3>
      </Card.Body>
    </Card>
  )
}

export default Product

import React, { useState } from 'react'
import {
  useGetProductQuery,
  useLeaveReviewMutation,
} from '../store/api/product.api'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Ratings from '../components/Ratings'
import { useActions } from '../hooks/action'
import { useAppSelector } from '../hooks/redux'
import Counter from '../components/Counter'
import Spinner from '../components/UI/Spinner/Spinner'
import Modal from '../components/UI/Modal/Modal'
import RatingStars from '../components/UI/Rating/RatingStars'
import { ILeaveReview } from '../models/models'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { leaveReviewShema } from '../schemas'

const ProductDetail: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [rating, setRating] = useState<number>(0)
  const params = useParams()
  const navigate = useNavigate()
  const { increamentQty, decreamentQty, addToCart, resetQty } = useActions()
  const { qty } = useAppSelector((state) => state.ui)
  const productId = params.productId ? parseInt(params.productId, 10) : 0
  const { data: product, isLoading: productIsLoading } =
    useGetProductQuery(productId)

  const [leaveReview] = useLeaveReviewMutation()
  const onAddToCartHandler = () => {
    addToCart({
      countInStock: product?.countInStock ?? 0,
      qty,
      product: product?.id ?? 0,
      price: product?.price ?? '',
      name: product?.name ?? '',
      image: product?.image_url ?? '',
    })
    resetQty()
    navigate(`/cart`)
  }
  const onConfirm = () => {
    setModal(!modal)
  }

  const onSubmit = (values: ILeaveReview) => {
    leaveReview({
      rating: rating,
      comment: values.comment,
      productId: productId,
    })
      .unwrap()
      .then((_) => {
        toast.success(`Thank you to leave reviews!`)
        setModal(false)
      })
      .catch((error) => {
        toast.error(`Didn't leaved reviews, error occured!`)
        console.log('Error:', error)
      })
  }
  const leaveReviewForm = useFormik({
    initialValues: { comment: '', rating },
    onSubmit,
    validationSchema: leaveReviewShema,
  })
  const { values, handleChange, handleSubmit } = leaveReviewForm
  return (
    <>
      {modal && (
        <Modal title="How would you rate this product?" onConfirm={onConfirm}>
          <form onSubmit={handleSubmit}>
            <RatingStars name="rating" value={rating} onChange={setRating} />
            <div className="input-box py-4 ">
              <textarea
                name="comment"
                className="h-20 placeholder:p-4 outline"
                placeholder="Type sometings..."
                value={values.comment}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="button float-right">Continue</button>
            <button
              className="button float-right mx-4"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
          </form>
        </Modal>
      )}
      {productIsLoading ? (
        <Spinner />
      ) : (
        <div className="py-10 px-4">
          <Link
            to={`..`}
            className="uppercase p-4 px-6 bg-white hover:bg-gray-200"
          >
            Go back
          </Link>
          <button
            className="uppercase p-4 px-6 bg-white hover:bg-gray-200"
            onClick={onConfirm}
          >
            Leave Rating
          </button>
          <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 my-6">
            <div>
              <img src={product?.image_url} alt={`${product?.name}`} />
            </div>
            <div className="px-4">
              <h2 className="title">{product?.name}</h2>
              <Ratings
                value={Math.ceil(product?.rating ?? 0 / 2)}
                text={`${product?.numReviews} reviews`}
              />
              <p className="text-xl text-gray-600 font-medium py-4">
                ${product?.price}
              </p>
              <p className="pb-4">{product?.description}</p>

              <div className="flex flex-row space-x-6 items-center">
                <button className="button" onClick={onAddToCartHandler}>
                  Add to Cart
                </button>

                {product?.countInStock && (
                  <Counter
                    increament={increamentQty}
                    decreament={decreamentQty}
                    qty={qty}
                    countInStock={product?.countInStock}
                  />
                )}
              </div>
            </div>
          </div>
          <h2 className="title py-4">REVIEWS</h2>
          {product?.reviews.length && product.reviews.length > 0 ? (
            product?.reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col space-y-1 shadow-md rounded-md p-4 mb-4"
              >
                <h2 className="font-bold text-lg">{review.name}</h2>
                <div className="flex flex-row space-x-3 items-center">
                  <span>
                    <Ratings value={Math.ceil(review.rating / 2)} />
                  </span>
                  <span className="font-mono">
                    {review.createdAt.substring(0, 10)}
                  </span>
                </div>
                <p className="font-serif">{review.comment}</p>
              </div>
            ))
          ) : (
            <h2>No reviews</h2>
          )}
        </div>
      )}
    </>
  )
}

export default ProductDetail

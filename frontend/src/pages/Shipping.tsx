import React from 'react'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { shippingShema } from '../schemas'
import { useFormik } from 'formik'
import { IShipping } from '../models/models'
import { useActions } from '../hooks/action'
import { useAppSelector } from '../hooks/redux'

const Shipping: React.FC = () => {
  const navigate = useNavigate()
  const { addToShippingAddress } = useActions()
  const { shippingAddress } = useAppSelector((state) => state.cart)

  const onSubmitHandler = (value: IShipping) => {
    addToShippingAddress({
      address: value.address,
      city: value.city,
      postalCode: value.postalCode,
      country: value.country,
    })
    navigate(`/payment`)
  }

  const shippingForm = useFormik({
    initialValues: {
      address: shippingAddress.address || '',
      city: shippingAddress.city || '',
      postalCode: shippingAddress.postalCode || '',
      country: shippingAddress.country || '',
    },
    onSubmit: onSubmitHandler,
    validationSchema: shippingShema,
  })
  const { values, handleChange, handleSubmit, errors, touched } = shippingForm
  return (
    <div className="form-box">
      <CheckoutSteps step1 />
      <h2 className="title">Shipping</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="">Address</label>
          <input
            type="text"
            className="input"
            placeholder="Enter address"
            name="address"
            value={values.address}
            onChange={handleChange}
          />
          <p className="error">
            {errors.address && touched.address && errors.address}
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="">City</label>
          <input
            type="text"
            className="input"
            placeholder="Enter city"
            name="city"
            value={values.city}
            onChange={handleChange}
          />
          <p className="error">{errors.city && touched.city && errors.city}</p>
        </div>
        <div className="input-box">
          <label htmlFor="">Postal Code</label>
          <input
            type="text"
            className="input"
            placeholder="Enter postal code"
            name="postalCode"
            value={values.postalCode}
            onChange={handleChange}
          />
          <p className="error">
            {errors.postalCode && touched.postalCode && errors.postalCode}
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="">Country</label>
          <input
            type="text"
            className="input"
            placeholder="Enter country"
            name="country"
            value={values.country}
            onChange={handleChange}
          />
          <p className="error">
            {errors.country && touched.country && errors.country}
          </p>
        </div>
        <button className="button" type="submit">
          Continue
        </button>
      </form>
    </div>
  )
}

export default Shipping

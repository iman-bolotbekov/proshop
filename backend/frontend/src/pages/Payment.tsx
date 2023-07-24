import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { IPaymentMethod } from '../models/models'
import { paymentValues } from '../utils/formValues'
import { paymentMethodShema } from '../schemas'
import { useActions } from '../hooks/action'

const Payment: React.FC = () => {
  const navigate = useNavigate()
  const { addToPaymentMethod } = useActions()

  const onSubmitHandler = (values: IPaymentMethod) => {
    addToPaymentMethod({ paymentMethod: values.paymentMethod })
    navigate(`/place-order`)
  }
  const paymentForm = useFormik({
    initialValues: paymentValues,
    onSubmit: onSubmitHandler,
    validationSchema: paymentMethodShema,
  })
  const { values, handleChange, handleSubmit, errors, touched } = paymentForm
  return (
    <div className="form-box">
      <CheckoutSteps step1 step2 />
      <h2 className="subtitle">Select Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row-reverse justify-end space-x-6 pb-2 relative">
          <label htmlFor="paymentMethod">PayPal or Credit Cart</label>
          <input
            type="radio"
            checked
            className=""
            name="paymentMethod"
            value={values.paymentMethod}
            onChange={handleChange}
          />
          <p className="error">
            {errors.paymentMethod &&
              touched.paymentMethod &&
              errors.paymentMethod}
          </p>
        </div>
        <button className="button" type="submit">
          Continue
        </button>
      </form>
    </div>
  )
}

export default Payment

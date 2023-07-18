import React from 'react'
import { Link } from 'react-router-dom'

interface CheckoutStepsProps {
  step1?: boolean
  step2?: boolean
  step3?: boolean
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  step1,
  step2,
  step3,
}) => {
  return (
    <div className="flex flex-row space-x-10 py-5 justify-center">
      <div>
        {step1 ? (
          <Link to={`/shipping`}>Shipping</Link>
        ) : (
          <div className="disabled">Shipping</div>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to={`/payment`}>Payment</Link>
        ) : (
          <div className="disabled">Payment</div>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to={`/place-order`}>Place Order</Link>
        ) : (
          <div className="disabled">Place Order</div>
        )}
      </div>
    </div>
  )
}

export default CheckoutSteps

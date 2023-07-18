import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center my-10">
      <ImSpinner2 className="animate-spin text-6xl" />
    </div>
  )
}

export default Spinner

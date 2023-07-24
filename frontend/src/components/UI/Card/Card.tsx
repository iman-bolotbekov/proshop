import React, { PropsWithChildren } from 'react'

interface CardProps
  extends PropsWithChildren<React.HTMLProps<HTMLDivElement>> {}

const Card: React.FC<CardProps> = (props) => {
  const { children, className, ...restProps } = props

  const cardClasses = `inline-block border border-gray-300 rounded-lg p-2 ${className}`

  return (
    <div className={cardClasses} {...restProps}>
      {children}
    </div>
  )
}

export default Card

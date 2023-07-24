import React, { ChangeEventHandler } from 'react'

type RatingProps = {
  value: number
  onChange: (value: number) => void
  name: string
}

const RatingStars: React.FC<RatingProps> = ({ value, onChange, name }) => {
  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = Number(e.target.value)
    onChange(newValue)
  }

  const isStarChecked = (starValue: number): boolean => {
    return value >= starValue
  }

  return (
    <div className="rating rating-lg">
      {[2, 4, 6, 8, 10].map((starValue) => (
        <input
          key={starValue}
          type="radio"
          name={name}
          className={`mask mask-star-2 ${
            isStarChecked(starValue) ? 'bg-orange-400' : 'bg-orange-200'
          }`}
          checked={isStarChecked(starValue)} // Use the utility function here
          value={starValue}
          onChange={handleRatingChange}
        />
      ))}
    </div>
  )
}

export default RatingStars

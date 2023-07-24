import React from 'react'

interface OrdersFilterProps {
  filterByYear: (year: string) => void
  selectedYear: string
}

const OrdersFilter: React.FC<OrdersFilterProps> = ({
  filterByYear,
  selectedYear,
}) => {
  const handleYearChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedYear = event.target.value
    filterByYear(selectedYear)
  }

  return (
    <div className="px-4">
      <div className="flex items-center justify-between my-4">
        <label className="font-bold mb-1">Filter by year</label>
        <select
          className="font-bold px-4 py-2 rounded-md"
          value={selectedYear}
          onChange={handleYearChangeHandler}
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>
    </div>
  )
}

export default OrdersFilter

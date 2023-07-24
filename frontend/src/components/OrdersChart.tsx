import React from 'react'

import Chart from './UI/Chart/Chart'
import { IOrderData } from '../models/models'

interface OrdersChartProps {
  orders: IOrderData[]
}

const OrdersChart: React.FC<OrdersChartProps> = ({ orders }) => {
  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ]
  if (orders) {
    const months = orders.map((order) => {
      let date = new Date(order.createdAt.substring(0, 10))
      return date.getMonth()
    })
    chartDataPoints.map((chart, index) => {
      if (months.includes(index)) {
        chart.value = index
      }
      return chart
    })
  }

  return <Chart dataPoints={chartDataPoints} />
}

export default OrdersChart

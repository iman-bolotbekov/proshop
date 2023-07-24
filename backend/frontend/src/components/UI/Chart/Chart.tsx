import React from 'react'
import ChartBar from './ChartBar'
import { IChartDataPoints } from '../../../models/models'

interface ChartProps {
  dataPoints: IChartDataPoints[]
}

const Chart: React.FC<ChartProps> = ({ dataPoints }) => {
  const dataPointValues = dataPoints.map((dataPoint) => dataPoint.value)
  const totalMaximum = Math.max(...dataPointValues)

  return (
    <div className="p-3 rounded-md bg-purple-100 text-center flex justify-around h-40 mb-10">
      {dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  )
}

export default Chart

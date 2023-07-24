import React from 'react'

interface ChartBarProps {
  maxValue: number
  value: number
  label: string
}

const ChartBar: React.FC<ChartBarProps> = ({ maxValue, value, label }) => {
  let barFillHeight = '0%'

  if (maxValue > 0) {
    barFillHeight = Math.round((value / maxValue) * 100) + '%'
  }

  return (
    <div className="h-full flex flex-col items-center">
      <div className="h-full w-4 border border-gray-700 rounded-lg bg-purple-200 overflow-hidden flex flex-col justify-end">
        <div
          className="bg-indigo-700 w-full transition-all duration-300 ease-out"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="font-bold text-xs text-center">{label}</div>
    </div>
  )
}

export default ChartBar

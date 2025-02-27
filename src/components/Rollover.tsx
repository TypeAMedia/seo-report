'use client'

interface RolloverProps {
  value: number
}

export function Rollover({ value }: RolloverProps) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const filledAmount = ((value - 100) / 100) * circumference
  const strokeDasharray = `${circumference} ${circumference}`

  return (
    <svg width='70' height='70' viewBox='0 0 70 70'>
      {/* Background circle */}
      <circle
        cx='35'
        cy='35'
        r={radius}
        fill='none'
        stroke='#F5F5F5'
        strokeWidth='8'
      />
      {/* Progress circle */}
      <circle
        cx='35'
        cy='35'
        r={radius}
        fill='none'
        stroke='#29CFA8'
        strokeWidth='8'
        strokeDasharray={strokeDasharray}
        strokeDashoffset={filledAmount}
        transform='rotate(180 35 35)'
        style={{
          transformOrigin: 'center',
          transform: 'rotate(-90deg)',
          transition: 'stroke-dasharray 0.3s ease',
        }}
      />
      {/* Score text */}
      <text
        x='35'
        y='35'
        textAnchor='middle'
        dominantBaseline='middle'
        className='font-rubik text-lg'
      >
        {value}
      </text>
    </svg>
  )
}

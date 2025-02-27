interface ProgressBarProps {
  value: number
  max: number
  color: string
}

export function ProgressBar({ value, max, color }: ProgressBarProps) {
  const percentage = (value / max) * 100
  return (
    <div className='relative w-[30%] h-2 bg-gray rounded-full overflow-hidden'>
      <div
        className='absolute left-0 top-0 h-full'
        style={{ width: `${percentage}%`, backgroundColor: color || 'green' }}
      >
      </div>
    </div>
  )
}

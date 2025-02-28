interface CircleProps {
  name: string
  color: string
  values: string
}

export default function Circles({
  name,
  color,
  values,
}: CircleProps) {
  return (
    <div>
      <div className='mb-4'>{name}</div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='162'
        height='162'
        viewBox='0 0 162 162'
        fill='none'
        className='mt-6'
      >
        <mask
          id='mask0_2007_667'
          style={{ maskType: 'alpha' }}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='162'
          height='162'
        >
          <path d='M0 0H81V81H162V162H0V0Z' fill={color} />
        </mask>
        <g>
          <circle
            cx='81'
            cy='81'
            r='77'
            stroke='#F5F5F5'
            strokeWidth='8'
          />
        </g>
        <g mask='url(#mask0_2007_667)'>
          <path
            d='M158 81C158 123.526 123.526 158 81 158C38.4741 158 4 123.526 4 81C4 38.4741 38.4741 4 81 4C104.259 4 125.107 14.308 139.232 30.6186C150.928 44.1245 158 61.7313 158 81Z'
            stroke={color}
            strokeWidth='8'
          />
        </g>
        <text
          x='80'
          y='90'
          fontSize='40px'
          textAnchor='middle'
          fill='white'
        >
          {values}
        </text>
      </svg>
    </div>
  )
}

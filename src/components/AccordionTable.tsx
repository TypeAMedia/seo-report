'use client'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { useState } from 'react'
import { Rollover } from './Rollover'
import * as d3 from 'd3'
import { ProgressBar } from './ProgressBar'

interface AccordionTableProps {
  data: {
    rank: number
    domain: string
    seo_score: number
    pages_added: number
    links_earned: number
    lcp: number
    cls: number
    fid: number
  }[]
}

export function AccordionTable({ data }: AccordionTableProps) {
  const [activeItems, setActiveItems] = useState<Record<number, boolean>>({})

  const toggleItem = (index: number) => {
    setActiveItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const formatNumber = d3.format(',')

  const maxValues = {
    pages_added: Math.max(...data.map((item) => Number(item.pages_added))),
    links_earned: Math.max(...data.map((item) => Number(item.links_earned))),
    lcp: (Math.max(...data.map((item) => Number(item.lcp))) / 1000).toFixed(2),
    cls: Math.max(...data.map((item) => Number(item.cls))),
    fid: (Math.max(...data.map((item) => Number(item.fid))) / 10).toFixed(2),
  }

  console.log(maxValues)
  return (
    <AccordionPrimitive.Root type='single' collapsible className='w-full'>
      {data.map((item, index) => (
        <AccordionPrimitive.Item
          key={index}
          value={`item-${index}`}
          className='bg-white mt-1 rounded-md p-6'
        >
          <AccordionPrimitive.Trigger className='flex w-full text-petrolGray items-center gap-20 pl-12 pr-5 py-4'>
            <span className='text-xl font-bold'>{item.rank}</span>
            <span className='font-medium flex-1 underline'>{item.domain}</span>
            <span className='text-center font-light'>
              <Rollover value={item.seo_score} />
            </span>
            <div
              onClick={() => toggleItem(index)}
              className={`px-3 py-1 font-rubik text-[16px] rounded-lg hover:opacity-90 cursor-pointer flex items-center gap-2 ${
                activeItems[index]
                  ? 'bg-green text-white'
                  : 'bg-white text-petrolGray border-2 border-[#D9D9D9]'
              }`}
            >
              {activeItems[index] ? 'Close details' : 'More details'}
              <svg
                width='31'
                height='31'
                viewBox='0 0 31 31'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={`transform ${
                  activeItems[index] ? 'rotate-180' : ''
                }`}
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M8.53981 14.2091L10.3659 12.3831L15.5317 17.5489L20.6988 12.3831L22.5249 14.2091L15.5316 21.2024L8.53981 14.2091Z'
                  fill={activeItems[index] ? 'white' : '#101827'}
                />
              </svg>
            </div>
          </AccordionPrimitive.Trigger>

          <AccordionPrimitive.Content className='p-4 text-petrolGray'>
            <div className='grid grid-cols-4 gap-4 font-light'>
              <div className='font-rubik text-start text-[14px]'>
                <div className='font-light'>Pages added</div>
                <div className='font-bold text-[23px]'>
                  {formatNumber(Number(item.pages_added))}
                </div>
                <ProgressBar
                  value={Number(item.pages_added)}
                  max={Number(maxValues.pages_added)}
                  color='#29CFA8'
                />
              </div>
              <div className='font-rubik text-start text-[14px]'>
                <div className='font-light'>Links earned</div>
                <div className='font-bold text-[23px]'>
                  {formatNumber(Number(item.links_earned))}
                </div>
                <ProgressBar
                  value={Number(item.links_earned)}
                  max={Number(maxValues.links_earned)}
                  color='#F9BF18'
                />
              </div>
              <div className='font-rubik text-start text-[14px]'>
                <div className='font-light'>LCP</div>
                <div className='font-bold text-[23px]'>
                  {Number(item.lcp / 1000).toFixed(2)}
                  <span className='text-[14px]'> secs</span>
                </div>
                <ProgressBar
                  value={Number(item.lcp / 1000)}
                  max={Number(maxValues.lcp)}
                  color='#E94F1D'
                />
              </div>
              <div className='font-rubik text-start text-[14px]'>
                <div className='font-light'>CLS</div>
                <div className='font-bold text-[23px]'>
                  {Number(item.cls).toFixed(2)}
                </div>
                <ProgressBar
                  value={Number(item.cls)}
                  max={Number(maxValues.cls)}
                  color='#E94F1D'
                />
              </div>
              <div className='font-rubik text-start text-[14px]'>
                <div className='font-light'>FID</div>
                <div className='font-bold text-[23px]'>
                  {Number(item.fid / 10).toFixed(2)}
                  <span className='text-[14px]'> ms</span>
                </div>
                <ProgressBar
                  value={parseFloat(Number(item.fid / 10).toFixed(2))}
                  max={Number(maxValues.fid)}
                  color='#29CFA8'
                />
              </div>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}

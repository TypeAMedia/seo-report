'use client'

import { categories } from '@/types/category'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const path = event.target.value
    if (path) {
      router.push(path)
    }
  }
  return (
    <>
      <h1 className='text-3xl font-bold mb-4 mt-8'>Select a Category</h1>
      <div className='relative w-full max-w-md'>
        <select
          onChange={handleCategoryChange}
          defaultValue=''
          className='w-full bg-background p-3 pr-10 border rounded-lg shadow-sm appearance-none'
        >
          <option value='' disabled>
            Choose a category
          </option>
          {categories.map((category) => (
            <option key={category.path} value={category.path}>
              {category.name}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4'>
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>
    </>
  )
}

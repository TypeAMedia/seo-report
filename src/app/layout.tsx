import type { Metadata } from 'next'
import './globals.css'
import { inter, rubik } from './fonts'

export const metadata: Metadata = {
  title: 'TypeAmedia SEO Tool',
  description: 'SEO Tool for TypeAmedia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${inter} ${rubik}`}>
      <body>
        <div className='bg-background md:p-4 p-0 min-h-screen'>
          <a href='/'>
            <img src='/logo.svg' alt='logo' className='w-10 md:w-auto' />
          </a>
          <div className='flex flex-col items-center justify-center p-0 md:p-4'>
            <img src='/centeredLogo.svg' className='w-24 md:w-auto' />
            <img className='mt-4 w-32 md:w-auto' src='/centeredType.svg' />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

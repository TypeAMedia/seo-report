import type { Metadata } from 'next'
import './globals.css'
import { inter, rubik } from './fonts'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'TypeAmedia SEO Tool',
  description: 'SEO Tool for TypeAmedia',
  icons: {
    icon: '/seo-report/favicon.ico',
  },
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
          <Link href='/'>
            <Image src='/seo-report/logo.svg' alt='logo' className='w-10 md:w-auto' width={40} height={40} />
          </Link>
          <div className='flex flex-col items-center justify-center p-0 md:p-4'>
            <Image src='/seo-report/centeredLogo.svg' priority alt='logo' className='w-24 md:w-auto' width={96} height={96} />
            <Image className='mt-4 w-32 md:w-auto' alt='typeamedia-logo' src='/seo-report/centeredType.svg' width={128} height={32} />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

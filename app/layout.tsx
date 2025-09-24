import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Kmong 템플릿 - 펜션/캠핑/카페',
  description: '펜션, 캠핑장, 카페를 위한 올인원 템플릿',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={notoSansKR.className}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
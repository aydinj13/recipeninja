import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Food Ninja',
  description: 'Get the best meal recipes!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <h1 className="pl-2">Recipes for Ninjas</h1>
        </nav>
        {children}
        </body>
    </html>
  )
}

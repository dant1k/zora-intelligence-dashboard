import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zora Intelligence Dashboard',
  description: 'Enhanced ZoraScan with official Zora API SDK',
  keywords: ['zora', 'blockchain', 'dashboard', 'nft', 'crypto'],
  authors: [{ name: 'Zora Intelligence Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zora Intelligence Dashboard',
  description: 'Enhanced ZoraScan with official Zora API SDK',
  keywords: ['zora', 'blockchain', 'dashboard', 'nft', 'crypto'],
  authors: [{ name: 'Zora Intelligence Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ 
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont',
        backgroundColor: '#000',
        color: '#fff',
        margin: 0,
        padding: '20px'
      }}>
        {children}
      </body>
    </html>
  )
}

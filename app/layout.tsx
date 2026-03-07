import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth/AuthContext'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NotesPitara - Share and Discover College Notes',
  description: 'A modern platform for college students to share, discover, and learn from notes across universities and programs.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/notespitara.jpg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/notespitara.jpg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/notespitara.jpg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/notespitara.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

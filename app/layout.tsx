import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth/AuthContext'
import { AppShell } from '@/components/providers/AppShell'
import { StoreProvider } from '@/components/providers/StoreProvider'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Notes Pitara – Find, Share & Organize Academic Notes',
    template: '%s | Notes Pitara',
  },
  description: 'Notes Pitara is a structured academic platform where students can find, share, and organize notes by university, program, semester, and subject.',
  keywords: ['student notes', 'academic notes', 'study material', 'university notes', 'semester notes', 'subject notes', 'exam preparation', 'notes sharing platform', 'India students'],
  authors: [{ name: 'Notes Pitara Team' }],
  creator: 'Notes Pitara',
  publisher: 'Notes Pitara',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/notespitara.jpg',
    shortcut: '/notespitara.jpg',
    apple: '/notespitara.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://notespitara.com',
    siteName: 'Notes Pitara',
    title: 'Notes Pitara – Structured Academic Notes Platform',
    description: 'Find, share, and organize academic notes easily. Built for students to access reliable study resources.',
    images: [
      {
        url: 'https://notespitara.com/notespitara.jpg',
        width: 1200,
        height: 630,
        alt: 'Notes Pitara – Structured Academic Notes Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes Pitara – Academic Notes Platform',
    description: 'Discover structured academic notes by subject, semester, and university.',
    images: ['https://notespitara.com/notespitara.jpg'],
  },
  alternates: {
    canonical: 'https://notespitara.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreProvider>
            <AuthProvider>
              <AppShell>{children}</AppShell>
              <Toaster />
            </AuthProvider>
          </StoreProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

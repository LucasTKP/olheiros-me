import "../../styles/globals.css"
import { Nunito, Staatliches, Megrim } from '@next/font/google'

const nunito = Nunito({
  display: 'swap',
  weight: ['400'],
  variable: '--font-nunito',
})

const staatliches = Staatliches({
  display: 'swap',
  weight: ['400'],
  variable: '--font-staatliches',
})

const megrim = Megrim({
  display: 'swap',
  weight: ['400'],
  variable: '--font-megrim',
})

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html className="bg-primary">
      <head />
      <body className={`text-white font-nunito ${nunito.variable} ${megrim.variable} ${staatliches.variable} font-sans`}>{children}</body>
    </html>
  )
}

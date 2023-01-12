import "../../styles/globals.css"
import { Nunito, Staatliches } from '@next/font/google'

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

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html>
      <head />
      <body className={`text-white font-nunito ${nunito.variable} ${staatliches.variable} font-sans`}>{children}</body>
    </html>
  )
}

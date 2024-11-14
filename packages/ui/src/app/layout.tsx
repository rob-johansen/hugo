import './globals.css';
import { Poppins } from 'next/font/google'
import type { Metadata } from 'next';
import type React from 'react'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  description: 'Pay-as-you-go car insurance. Only pay for days that you drive. Nothing more.',
  title: 'Hugo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased pt-[100px]`} id="root">
        {children}
      </body>
    </html>
  );
}

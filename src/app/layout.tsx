import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Lora } from 'next/font/google';
import './globals.css';
// AppLayout is removed from here and applied in (main)/layout.tsx
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Atelier Hub',
  description: 'A modern design school platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased`}>
        {children} {/* AppLayout is no longer wrapping children here */}
        <Toaster />
      </body>
    </html>
  );
}

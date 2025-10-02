// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anime Finder - AI Recommendations',
  description: 'Discover your next favorite anime with AI-powered recommendations',
  keywords: ['anime', 'recommendations', 'AI', 'machine learning'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        {/* The main tag holds all your page content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}

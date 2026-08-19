import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SearchForge — Intelligent Search Engine',
  description: 'Educational, high-performance search engine built from first principles in Java 21 & Spring Boot featuring custom inverted index, BM25, TF-IDF, and Trie autocomplete.',
  keywords: ['Java', 'Search Engine', 'Information Retrieval', 'Inverted Index', 'TF-IDF', 'BM25', 'Algorithms', 'Spring Boot', 'PostgreSQL', 'Redis', 'Next.js', 'System Design'],
  authors: [{ name: 'SearchForge Team' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'SearchForge — Intelligent Search Engine',
    description: 'Search faster. Understand better. Built from first principles using Information-Retrieval algorithms.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

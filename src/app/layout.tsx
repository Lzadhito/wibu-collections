import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ApolloWrapper } from '@/lib/apollo-provider';
import AnimeProvider from '@/context/AnimeContext';

import './index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wibu Collections',
  description: 'Create collection of your favorite animes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <AnimeProvider>{children}</AnimeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}

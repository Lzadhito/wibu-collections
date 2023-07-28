import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppBar, Container, IconButton, Toolbar } from '@mui/material';
import './index.css';

import { ApolloWrapper } from '@/lib/apollo-provider';
import AnimeProvider from '@/context/AnimeContext';
import { txtTitle } from './anime/locales';
import { StyledCollectionIcon, StyledLinkContainer } from './styles';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anime List Collection',
  description: 'Create collection of your favorite animes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <AnimeProvider>
            <AppBar position="static">
              <Toolbar>
                <StyledLinkContainer>
                  <Link href="/">{txtTitle}</Link>
                </StyledLinkContainer>
                <IconButton>
                  <StyledCollectionIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Container>{children}</Container>
          </AnimeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}

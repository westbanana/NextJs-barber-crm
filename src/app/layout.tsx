import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import '@/variables/size/style.css';
import '@/variables/colors/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import MainLayout from '@/components/MainLayout';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Main | NextJs',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AppRouterCacheProvider>
          <MainLayout>
            {children}
          </MainLayout>
          <ToastContainer stacked />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

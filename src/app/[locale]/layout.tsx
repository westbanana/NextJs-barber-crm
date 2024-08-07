import { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import '@variables/size/style.css';
import '@variables/colors/calendar.css';
import '@variables/colors/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Montserrat } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import { dir } from 'i18next';

import MainLayout from '@components/MainLayout';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Main | NextJs',
  description: 'Generated by create next app',
};

type Props = {
  children: ReactNode
  params: {
    locale: 'en' | 'ru' | 'uk'
  }
}
const RootLayout = ({
  children,
  params: { locale },
}: Props) => {
  const messages = useMessages();
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={`${montserrat.className}`}>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <MainLayout>
              {children}
            </MainLayout>
            <ToastContainer stacked />
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;

'use client';

import localFont from 'next/font/local';
import AuthSession from '../context/AuthSession';
import QueryClientProvider from '@/context/QueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/css/globals.css';
import ScrollToTop from '@/components/ScrollToTop';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

const iropke = localFont({
  src: '../assets/fonts/IropkeBatang.woff2',
  display: 'swap',
  weight: '400',
  variable: '--font-iropke',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.className} ${iropke.variable}`}>
        <ScrollToTop />
        <AuthSession>
          <QueryClientProvider>
            {children}
            <div id='portal-root' />
            <ToastContainer />
          </QueryClientProvider>
        </AuthSession>
      </body>
    </html>
  );
}

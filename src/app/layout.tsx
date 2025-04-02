import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: '에피그램',
  description:
    '에피그램은 감동적인 명언을 통해 사람들의 감정을 공유하고, 서로의 경험을 나누는 소통 플랫폼입니다.',
};

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

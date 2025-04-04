import { Metadata } from 'next';
import { ToastContainer, Slide } from 'react-toastify';
import localFont from 'next/font/local';
import ScrollToTop from '@/components/ScrollToTop';
import QueryClientProvider from '@/context/QueryProvider';
import AuthSession from '../context/AuthSession';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/css/globals.css';

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
            <ToastContainer
              toastStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'fit-content',
                backgroundColor: 'var(--color-black-700)',
                color: 'var(--color-blue-100)',
                borderRadius: '12px',
                padding: '10px 28px',
                minHeight: 'unset',
                minWidth: 'unset',
                marginBottom: '60px',
              }}
              toastClassName='text-md lg:text-lg'
              position='bottom-center'
              autoClose={2000}
              closeButton={false}
              hideProgressBar
              newestOnTop={false}
              pauseOnFocusLoss
              draggable
              closeOnClick={true}
              pauseOnHover
              transition={Slide}
              limit={3}
            />
          </QueryClientProvider>
        </AuthSession>
      </body>
    </html>
  );
}

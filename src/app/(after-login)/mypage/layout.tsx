import { PropsWithChildren } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지 | 에피그램',
};

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

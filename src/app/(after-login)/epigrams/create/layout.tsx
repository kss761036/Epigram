import { PropsWithChildren } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '작성하기 | 에피그램',
};

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

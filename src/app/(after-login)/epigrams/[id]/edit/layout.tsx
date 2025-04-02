import { PropsWithChildren } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '수정하기 | 에피그램',
};

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

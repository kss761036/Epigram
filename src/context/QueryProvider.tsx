'use client';

import { PropsWithChildren } from 'react';
import { QueryClientProvider as Provider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/utils/getQueryClient';

export default function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <Provider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </Provider>
  );
}

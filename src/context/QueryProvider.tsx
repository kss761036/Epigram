'use client';

import { getQueryClient } from '@/utils/getQueryClient';
import { QueryClientProvider as Provider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export default function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  return <Provider client={queryClient}>{children}</Provider>;
}

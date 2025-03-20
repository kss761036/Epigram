'use client';
import ErrorFallback from '@/components/ErrorFallback';

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const meesage = error.message || '알 수 없는 문제가 발생했어요.';

  return <ErrorFallback title='문제가 발생했어요' content={meesage} />;
}

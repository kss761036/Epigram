import ErrorFallback from '@/components/ErrorFallback';

export default function NotFoundPage() {
  return (
    <ErrorFallback title='페이지를 찾을 수 없습니다' content='잘못된 주소로 접속하셨습니다.' />
  );
}
